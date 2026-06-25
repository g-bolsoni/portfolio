"use client";

import { useMessages, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function RotatingText() {
    const messages = useMessages() as { Home: { messages: string[] } };
    const phrases = messages.Home.messages;

    const [text, setText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const target = phrases[phraseIndex];

        const timeout = setTimeout(() => {
            if (!deleting) {
                setText(target.slice(0, charIndex + 1));
                setCharIndex((c) => c + 1);

                if (charIndex + 1 === target.length) {
                    setTimeout(() => setDeleting(true), 1800);
                }
            } else {
                setText(target.slice(0, charIndex - 1));
                setCharIndex((c) => c - 1);

                if (charIndex - 1 === 0) {
                    setDeleting(false);
                    setPhraseIndex((p) => (p + 1) % phrases.length);
                }
            }
        }, deleting ? 45 : 75);

        return () => clearTimeout(timeout);
    }, [charIndex, deleting, phraseIndex, phrases]);

    return (
        <p className="text-[#8257E5] font-medium text-lg h-7">
            {text}
            <span className="animate-pulse">|</span>
        </p>
    );
}