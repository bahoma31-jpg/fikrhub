import { Idea } from '@/stores/ideas-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultsSummaryProps {
    ideas: Idea[];
    onFinish?: () => void;
    onExport?: () => void;
}

export function ResultsSummary({ ideas, onFinish, onExport }: ResultsSummaryProps) {
    const sortedIdeas = [...ideas].sort((a, b) => b.votes - a.votes);
    const topIdeas = sortedIdeas.slice(0, 3);
    const totalVotes = ideas.reduce((acc, idea) => acc + idea.votes, 0);

    return (
        <Card className="border-border shadow-md bg-card w-full mb-6">
            <CardHeader className="border-b border-border/50 pb-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        نتائج الجلسة
                    </CardTitle>
                    <div className="flex gap-2">
                        {onExport && (
                            <Button variant="outline" size="sm" onClick={onExport} className="gap-2">
                                <FileText className="w-4 h-4" /> تصدير
                            </Button>
                        )}
                        {onFinish && (
                            <Button onClick={onFinish} size="sm" className="gap-2">
                                <CheckCircle2 className="w-4 h-4" /> إنهاء فعلي
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-primary/5 rounded-lg p-4 text-center border border-primary/10">
                        <p className="text-muted-foreground text-sm font-semibold">إجمالي الأفكار</p>
                        <p className="text-2xl font-bold text-primary">{ideas.length}</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4 text-center border border-primary/10">
                        <p className="text-muted-foreground text-sm font-semibold">إجمالي الأصوات</p>
                        <p className="text-2xl font-bold text-primary">{totalVotes}</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4 text-center border border-primary/10 md:col-span-2">
                        <p className="text-muted-foreground text-sm font-semibold">أعلى فكرة تصويتاً</p>
                        <p className="text-lg font-bold text-primary truncate px-2 mt-1">
                            {topIdeas[0]?.content || "لا يوجد بعد"}
                        </p>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-4 text-card-foreground">أفضل 3 أفكار</h4>
                    <div className="space-y-3">
                        {topIdeas.map((idea, index) => (
                            <div key={idea.id} className="flex gap-4 p-3 bg-muted/30 rounded-lg border border-border items-start justify-between">
                                <div className="flex gap-3 max-w-[85%]">
                                    <Badge className="h-6 w-6 rounded-full flex items-center justify-center p-0 shrink-0 bg-primary/20 text-primary border-primary/30">
                                        {index + 1}
                                    </Badge>
                                    <p className="text-sm font-medium">{idea.content}</p>
                                </div>
                                <Badge variant="secondary" className="shrink-0 bg-background border-border">
                                    {idea.votes} أصوات
                                </Badge>
                            </div>
                        ))}

                        {topIdeas.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4 bg-muted/10 rounded-lg">لم يتم طرح أي أفكار خلال هذه الجلسة.</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
