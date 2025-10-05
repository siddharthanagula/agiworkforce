import { useEffect, useRef, useState } from 'react';
import { Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ElevenLabsVoice() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Web Speech Recognition API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setTranscript(transcript);

        // When user stops speaking (final result)
        if (event.results[event.results.length - 1].isFinal) {
          handleVoiceQuery(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setResponse('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleVoiceQuery = async (query: string) => {
    setIsProcessing(true);

    try {
      // Simple response for demo (in production, this would call your AI backend)
      const responseText = `You asked: "${query}". I'm here to help you learn more about AGI Workforce! We offer specialized AI employees for just $1/month each.`;
      setResponse(responseText);

      // Try ElevenLabs TTS if API key is available
      if (import.meta.env.VITE_ELEVENLABS_API_KEY) {
        await speakWithElevenLabs(responseText);
      } else {
        // Fallback to Web Speech Synthesis API
        speakWithWebAPI(responseText);
      }
    } catch (error) {
      console.error('Error processing voice query:', error);
      setResponse('Sorry, I encountered an error processing your request.');
    } finally {
      setIsProcessing(false);
    }
  };

  const speakWithElevenLabs = async (text: string) => {
    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY || '',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          }),
        }
      );

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.play();
        }
      } else {
        // Fallback to Web Speech API if ElevenLabs fails
        speakWithWebAPI(text);
      }
    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      // Fallback to Web Speech API
      speakWithWebAPI(text);
    }
  };

  const speakWithWebAPI = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-card rounded-2xl border-2 border-border">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Voice Assistant</h3>
        <p className="text-sm text-muted-foreground">
          {isListening ? 'Listening... speak now' : 'Click the microphone to start'}
        </p>
      </div>

      <Button
        onClick={toggleListening}
        disabled={isProcessing}
        className={`rounded-full h-32 w-32 ${
          isListening ? 'bg-destructive hover:bg-destructive/90' : ''
        }`}
        size="lg"
      >
        {isListening ? (
          <Square className="h-16 w-16" />
        ) : (
          <Mic className="h-16 w-16" />
        )}
      </Button>

      {transcript && (
        <div className="w-full max-w-md p-4 bg-secondary rounded-lg">
          <p className="text-sm font-medium mb-1">You said:</p>
          <p className="text-foreground">{transcript}</p>
        </div>
      )}

      {response && (
        <div className="w-full max-w-md p-4 bg-accent rounded-lg">
          <p className="text-sm font-medium mb-1">Response:</p>
          <p className="text-accent-foreground">{response}</p>
        </div>
      )}

      {isProcessing && (
        <div className="text-sm text-muted-foreground">Processing your request...</div>
      )}

      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
