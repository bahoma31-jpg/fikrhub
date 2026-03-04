"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function NiyyahReminder() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show only once per session or day (for simplicity, just short delay here)
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full mb-6"
                >
                    <Card className="bg-primary/90 text-primary-foreground border-none overflow-hidden shadow-lg shadow-primary/20">
                        <CardContent className="p-4 flex gap-4 items-center">
                            <div className="bg-background/20 p-3 rounded-full shrink-0">
                                <Compass className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg mb-1 font-cairo">تجديد النية</h3>
                                <p className="text-sm text-primary-foreground/90 font-tajawal">
                                    "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى".. اجعل عملك هذا خالصاً ومفيداً للأمة.
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsVisible(false)}
                                className="text-primary-foreground hover:bg-background/20 rounded-full"
                                aria-label="إغلاق التذكير"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
