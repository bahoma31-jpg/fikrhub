"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export function StatsCard({ title, value, icon: Icon, description, trend }: StatsCardProps) {
    return (
        <Card className="border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className="bg-primary/10 p-2 rounded-full">
                    <Icon className="h-4 w-4 text-primary" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-mono">{value}</div>

                {(description || trend) && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                        {trend && (
                            <span className={`font-medium ${trend.isPositive ? 'text-emerald-500' : 'text-destructive'}`}>
                                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                            </span>
                        )}
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
