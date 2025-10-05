import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { AIEmployeeType } from './gemini';

// Global type declaration for ElevenLabs
declare global {
  interface Window {
    elevenLabs?: {
      Activity?: any;
    };
  }
}

// Initialize ElevenLabs API
const API_KEY = (import.meta as any).env?.VITE_ELEVENLABS_API_KEY || '';

let client: ElevenLabsClient | null = null;

// Initialize global objects to prevent undefined errors
if (typeof window !== 'undefined') {
  // Ensure global objects exist with comprehensive initialization
  if (!window.elevenLabs) {
    window.elevenLabs = {};
  }
  if (!window.elevenLabs.Activity) {
    window.elevenLabs.Activity = {};
  }
  
  // Additional safeguards for Activity property
  if (!window.elevenLabs.Activity) {
    window.elevenLabs.Activity = {
      initialized: true,
      timestamp: Date.now()
    };
  }
  
  // Ensure the Activity object is always available
  Object.defineProperty(window.elevenLabs, 'Activity', {
    value: window.elevenLabs.Activity || {},
    writable: true,
    configurable: true,
    enumerable: true
  });
}

// Initialize the ElevenLabs client
export function initializeElevenLabs() {
  if (!API_KEY) {
    console.warn('ElevenLabs API key not configured');
    return false;
  }

  try {
    client = new ElevenLabsClient({
      apiKey: API_KEY,
    });
    return true;
  } catch (error) {
    console.error('Failed to initialize ElevenLabs:', error);
    return false;
  }
}

// Check if ElevenLabs is configured
export function isElevenLabsConfigured(): boolean {
  return !!API_KEY && API_KEY.length > 0;
}

// Voice profiles for each AI employee type
// Using your custom voice for all employees
const YOUR_VOICE_ID = 'hPQBUABPqf1zOKhptJHm';

export const VOICE_PROFILES: Record<AIEmployeeType, {
  voiceId: string;
  name: string;
  description: string;
}> = {
  [AIEmployeeType.DEVELOPER]: {
    voiceId: YOUR_VOICE_ID,
    name: 'Alex',
    description: 'Professional, technical, and articulate voice for developer tasks',
  },
  [AIEmployeeType.DESIGNER]: {
    voiceId: YOUR_VOICE_ID,
    name: 'Aria',
    description: 'Creative, friendly, and enthusiastic voice for design discussions',
  },
  [AIEmployeeType.MARKETER]: {
    voiceId: YOUR_VOICE_ID,
    name: 'Morgan',
    description: 'Confident, persuasive, and energetic voice for marketing',
  },
  [AIEmployeeType.WRITER]: {
    voiceId: YOUR_VOICE_ID,
    name: 'Jordan',
    description: 'Warm, expressive, and storytelling voice for writing',
  },
  [AIEmployeeType.ANALYST]: {
    voiceId: YOUR_VOICE_ID,
    name: 'Riley',
    description: 'Analytical, precise, and data-focused voice',
  },
  [AIEmployeeType.SUPPORT]: {
    voiceId: YOUR_VOICE_ID,
    name: 'Casey',
    description: 'Friendly, empathetic, and helpful voice for customer support',
  },
};

// Text-to-speech function using browser-compatible API
export async function textToSpeech(
  text: string,
  employeeType: AIEmployeeType = AIEmployeeType.SUPPORT,
  options: {
    stability?: number;
    similarityBoost?: number;
    style?: number;
    useSpeakerBoost?: boolean;
  } = {}
): Promise<Blob | null> {
  if (!client) {
    if (!initializeElevenLabs()) {
      console.warn('ElevenLabs is not configured. Skipping text-to-speech.');
      return null;
    }
  }

  try {
    const voiceProfile = VOICE_PROFILES[employeeType];

    const {
      stability = 0.5,
      similarityBoost = 0.75,
      style = 0,
      useSpeakerBoost = true,
    } = options;

    const audio = await client!.textToSpeech.convert(voiceProfile.voiceId, {
      text,
      modelId: 'eleven_multilingual_v2',
      voiceSettings: {
        stability,
        similarityBoost: similarityBoost,
        style,
        useSpeakerBoost: useSpeakerBoost,
      },
    });

    // Convert ReadableStream to Blob for browser playback
    const chunks: Uint8Array[] = [];
    const reader = audio.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const audioBlob = new Blob(chunks as BlobPart[], { type: 'audio/mpeg' });
    return audioBlob;
  } catch (error) {
    console.error('Error in text-to-speech:', error);
    return null;
  }
}

// Play audio from blob
export function playAudio(audioBlob: Blob): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };

      audio.onerror = (error) => {
        URL.revokeObjectURL(audioUrl);
        reject(error);
      };

      audio.play().catch(reject);
    } catch (error) {
      reject(error);
    }
  });
}

// Generate and play audio in one step
export async function speakText(
  text: string,
  employeeType: AIEmployeeType = AIEmployeeType.SUPPORT,
  options?: {
    stability?: number;
    similarityBoost?: number;
    style?: number;
    useSpeakerBoost?: boolean;
  }
): Promise<boolean> {
  try {
    const audioBlob = await textToSpeech(text, employeeType, options);

    if (!audioBlob) {
      console.warn('No audio blob generated');
      return false;
    }

    await playAudio(audioBlob);
    return true;
  } catch (error) {
    console.error('Error speaking text:', error);
    return false;
  }
}

// Get available voices
export async function getAvailableVoices() {
  if (!client) {
    if (!initializeElevenLabs()) {
      throw new Error('ElevenLabs is not configured');
    }
  }

  try {
    const voices = await client!.voices.getAll();
    return voices;
  } catch (error) {
    console.error('Error fetching voices:', error);
    throw new Error('Failed to fetch voices');
  }
}

// Stream audio for real-time playback
export async function* streamTextToSpeech(
  text: string,
  employeeType: AIEmployeeType = AIEmployeeType.SUPPORT
): AsyncGenerator<Uint8Array, void, unknown> {
  if (!client) {
    if (!initializeElevenLabs()) {
      throw new Error('ElevenLabs is not configured');
    }
  }

  const voiceProfile = VOICE_PROFILES[employeeType];

  try {
    const audioStream = await client!.textToSpeech.convert(voiceProfile.voiceId, {
      text,
      modelId: 'eleven_multilingual_v2',
      voiceSettings: {
        stability: 0.5,
        similarityBoost: 0.75,
      },
    });

    const reader = audioStream.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield value;
    }
  } catch (error) {
    console.error('Error streaming audio:', error);
    throw new Error('Failed to stream audio');
  }
}

// Generate voice preview
export async function generateVoicePreview(
  employeeType: AIEmployeeType
): Promise<Blob | null> {
  const voiceProfile = VOICE_PROFILES[employeeType];
  const previewText = `Hi, I'm ${voiceProfile.name}, your ${employeeType} assistant. ${voiceProfile.description}`;

  return textToSpeech(previewText, employeeType);
}

export default {
  initializeElevenLabs,
  isElevenLabsConfigured,
  textToSpeech,
  playAudio,
  speakText,
  getAvailableVoices,
  streamTextToSpeech,
  generateVoicePreview,
  VOICE_PROFILES,
};
