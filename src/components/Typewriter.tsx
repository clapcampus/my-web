import { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
}

export default function Typewriter({ text, speed = 100, delay = 0 }: TypewriterProps) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    // Effect for handling the start delay
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsStarted(true);
        }, delay);

        return () => clearTimeout(timeout);
    }, [delay]);

    // Effect for typing logic
    useEffect(() => {
        if (!isStarted) return;

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, isStarted, text, speed]);

    return (
        <span className="font-mono border-r-2 border-indigo-500 pr-1 animate-pulse">
            {displayText}
        </span>
    );
}
