export interface NeuralShaderParams {
  color_base: string;
  vibe_intensity: number;
  ripple_pattern: string;
}

export interface PhysicsParams {
  intent_vector: number[]; // Mock vector for now
  vibe_score: number;
  emotional_tone: string;
  neural_shader_params: NeuralShaderParams;
  triggered_ritual: 'startup' | 'resonance' | 'uposatha' | 'parajika' | 'normal';
  timestamp: string;
}

export function isNeuralShaderParams(obj: any): obj is NeuralShaderParams {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.color_base === 'string' &&
    typeof obj.vibe_intensity === 'number' &&
    typeof obj.ripple_pattern === 'string'
  );
}

export function isPhysicsParams(obj: any): obj is PhysicsParams {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Array.isArray(obj.intent_vector) &&
    typeof obj.vibe_score === 'number' &&
    typeof obj.emotional_tone === 'string' &&
    isNeuralShaderParams(obj.neural_shader_params) &&
    ['startup', 'resonance', 'uposatha', 'parajika', 'normal'].includes(obj.triggered_ritual) &&
    typeof obj.timestamp === 'string'
  );
}

export interface GemOfWisdom {
  id: string;
  pattern: string; // acoustic_vector
  resolved_intent: string;
  usage_count: number;
  last_synced: string;
  ritual_tags: string[];
  temporal_jitter: number;
}
