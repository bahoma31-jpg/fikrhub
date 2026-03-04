"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const verses = [
    {
        text: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
        reference: "سورة طه (114)"
    },
    {
        text: "يَرْفَعِ اللَّـهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ",
        reference: "سورة المجادلة (11)"
    },
    {
        text: "وَعَلَّمَكَ مَا لَمْ تَكُن تَعْلَمُ ۚ وَكَانَ فَضْلُ اللَّـهِ عَلَيْكَ عَظِيمًا",
        reference: "سورة النساء (113)"
    },
    {
        text: "فَاسْأَلُوا أَهْلَ الذِّكْرِ إِن كُنتُمْ لَا تَعْلَمُونَ",
        reference: "سورة النحل (43)"
    }
];

export function VerseBanner() {
    const [index, setIndex] = useState(0);

    // Rotate verse every 24 hours ideally, but for display we do it once on load
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * verses.length);
        setIndex(randomIndex);
    }, []);

    const verse = verses[index];

    return (
        <Card className="bg-primary/5 border-primary/20 overflow-hidden relative group">
            <div className="absolute -left-6 -top-6 bg-primary/10 rounded-full w-24 h-24 blur-xl group-hover:bg-primary/20 transition-all"></div>

            <div className="p-4 flex flex-col md:flex-row items-center gap-4 relative z-10">
                <div className="bg-background rounded-full p-3 border border-primary/20 shadow-sm shrink-0">
                    <BookOpen className="w-6 h-6 text-primary" />
                </div>

                <div className="flex-1 text-center md:text-right">
                    <p className="text-lg md:text-xl font-bold font-cairo leading-relaxed text-foreground">
                        {verse.text}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 font-medium">
                        — {verse.reference}
                    </p>
                </div>
            </div>
        </Card>
    );
}
