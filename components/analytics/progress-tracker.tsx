"use client";

import { Card, CardContent } from '@/components/ui/card';

interface ProgressStep {
    label: string;
    status: 'completed' | 'current' | 'upcoming';
}

interface ProgressTrackerProps {
    steps: ProgressStep[];
}

export function ProgressTracker({ steps }: ProgressTrackerProps) {
    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
                <nav aria-label="Progress">
                    <ol role="list" className="flex items-center">
                        {steps.map((step, stepIdx) => (
                            <li key={step.label} className={`relative pr-8 sm:pr-20 ${stepIdx !== steps.length - 1 ? 'w-full' : ''}`}>
                                {step.status === 'completed' ? (
                                    <>
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="h-0.5 w-full bg-primary" />
                                        </div>
                                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                                            <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                            </svg>
                                            <span className="sr-only">{step.label}</span>
                                        </div>
                                    </>
                                ) : step.status === 'current' ? (
                                    <>
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="h-0.5 w-full bg-border" />
                                        </div>
                                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background" aria-current="step">
                                            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                                            <span className="sr-only">{step.label}</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="h-0.5 w-full bg-border" />
                                        </div>
                                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background group-hover:border-border">
                                            <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-border" />
                                            <span className="sr-only">{step.label}</span>
                                        </div>
                                    </>
                                )}

                                <span className="absolute -bottom-6 right-0 translate-x-1/2 text-xs font-medium w-max hidden sm:block">
                                    {step.label}
                                </span>
                            </li>
                        ))}
                    </ol>
                </nav>
            </CardContent>
        </Card>
    );
}
