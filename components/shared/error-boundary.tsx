"use client";

import { Component, ReactNode, ErrorInfo } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center p-8 text-center bg-destructive/10 rounded-lg border border-destructive/20 m-4">
                    <h2 className="text-xl font-bold text-destructive mb-2">عذرًا، حدث خطأ غير متوقع</h2>
                    <p className="text-muted-foreground mb-4">{this.state.error?.message}</p>
                    <Button onClick={() => this.setState({ hasError: false })} variant="outline">
                        حاول مرة أخرى
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
