import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useVoiceAssistant = (onResult) => {
    const [isListening, setIsListening] = useState(false);
    const { i18n } = useTranslation();

    const numberMap = {
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
        'ஒன்று': 1, 'இரண்டு': 2, 'மூன்று': 3, 'நான்கு': 4, 'ஐந்து': 5, 'ஆறு': 6, 'ஏழு': 7, 'எட்டு': 8, 'ஒன்பது': 9, 'பத்து': 10
    };

    const startListening = useCallback((fieldName) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = i18n.language === 'ta' ? 'ta-IN' : 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log(`Recognized: ${transcript}`);

            // Try numeric extraction
            const numberMatch = transcript.match(/\d+/);
            if (numberMatch && onResult) {
                onResult(fieldName, numberMatch[0]);
                return;
            }

            // Try word extraction
            for (const [word, val] of Object.entries(numberMap)) {
                if (transcript.includes(word)) {
                    onResult(fieldName, val);
                    return;
                }
            }

            // Fallback to full text for non-numeric fields if needed
            if (onResult) onResult(fieldName, transcript);
        };

        recognition.start();
    }, [i18n.language, onResult]);

    return { isListening, startListening };
};

export default useVoiceAssistant;
