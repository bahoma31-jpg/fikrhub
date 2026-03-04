"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string;
    ideas: number;
}

interface SessionChartProps {
    data: ChartData[];
    title?: string;
}

export function SessionChart({ data, title = "معدل توليد الأفكار" }: SessionChartProps) {
    return (
        <Card className="border-border w-full py-2">
            <CardHeader>
                <CardTitle className="text-lg font-cairo">{title}</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        className="ltr"
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))' }}
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                borderColor: 'hsl(var(--border))',
                                borderRadius: '8px',
                                color: 'hsl(var(--card-foreground))',
                                textAlign: 'right',
                                direction: 'rtl'
                            }}
                        />
                        <Bar
                            dataKey="ideas"
                            fill="hsl(var(--primary))"
                            radius={[4, 4, 0, 0]}
                            name="عدد الأفكار"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
