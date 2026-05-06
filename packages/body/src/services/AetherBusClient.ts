import { PhysicsParams, isPhysicsParams } from '../types/intent';

export class AetherBusClient {
    private ws: WebSocket;
    private messageHandler: ((payload: PhysicsParams) => void) | null = null;

    constructor(url: string) {
        this.ws = new WebSocket(url);

        this.ws.onopen = () => {
            console.log('Connected to AetherBus');
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.jsonrpc !== "2.0") return;

                // Strip prefix if present (e.g., tools/ui:shader_intent -> ui:shader_intent)
                const method = data.method?.startsWith("tools/")
                    ? data.method.substring(6)
                    : data.method;

                if (method === "ui:shader_intent" && data.params?.arguments) {
                    const physics = data.params.arguments;

                    if (isPhysicsParams(physics)) {
                        if (this.messageHandler) {
                            this.messageHandler(physics);
                        }
                    } else {
                        console.warn('Received invalid PhysicsParams:', physics);
                    }
                }
            } catch (e) {
                console.error('Failed to process AetherBus message:', e);
            }
        };

        this.ws.onclose = () => {
            console.log('Disconnected from AetherBus');
        };
    }

    public onMessage(handler: (payload: PhysicsParams) => void) {
        this.messageHandler = handler;
    }

    public send(message: string) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        }
    }

    public close() {
        this.ws.close();
    }
}
