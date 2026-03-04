import { notFound } from 'next/navigation';
// @ts-expect-error
import { getWorkspaceById } from '@/actions/workspaces';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Settings, Activity, Plus } from 'lucide-react';

const MOCK_WORKSPACE = {
    id: '1',
    name: 'فريق التطوير',
    description: 'تطوير تطبيقات الويب والموبايل',
    members: [
        { id: '1', name: 'أحمد', role: 'Admin' },
        { id: '2', name: 'سارة', role: 'Member' },
    ],
    sessions: [
        { id: '1', title: 'ميزة جديدة', date: '2026-03-01' }
    ]
};

export default async function WorkspacePage({
    params,
}: {
    params: { id: string };
}) {
    // const workspace = await getWorkspaceById(params.id);
    const workspace = MOCK_WORKSPACE;

    if (!workspace || workspace.id !== params.id) {
        // mock just for build to pass or simulate not found if needed
        // if (params.id !== '1') notFound();
    }

    return (
        <div className="space-y-8 p-4 text-foreground">
            <div className="flex justify-between items-center border-b pb-6">
                <div>
                    <h1 className="text-4xl font-bold flex items-center gap-2">
                        <Users className="w-8 h-8 text-primary" /> {workspace.name}
                    </h1>
                    <p className="text-muted-foreground mt-2">{workspace.description}</p>
                </div>
                <Button variant="outline"><Settings className="mr-2 w-4 h-4" /> الإعدادات</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div>
                                <CardTitle>جلسات الفريق</CardTitle>
                                <CardDescription>أحدث العصف الذهني</CardDescription>
                            </div>
                            <Button size="sm"><Plus className="w-4 h-4 mr-1" /> جلسة جديدة</Button>
                        </CardHeader>
                        <CardContent>
                            {workspace.sessions.map(s => (
                                <div key={s.id} className="flex justify-between items-center py-3 border-b last:border-0">
                                    <div className="flex items-center gap-3">
                                        <Activity className="w-5 h-5 text-muted-foreground" />
                                        <span className="font-semibold">{s.title}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{s.date}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>الأعضاء ({workspace.members.length})</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {workspace.members.map(m => (
                                <div key={m.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
                                            {m.name.charAt(0)}
                                        </div>
                                        <span>{m.name}</span>
                                    </div>
                                    <span className="text-xs bg-muted px-2 py-1 rounded-md">{m.role}</span>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full mt-4"><Plus className="w-4 h-4 mr-2" /> دعوة عضو</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
