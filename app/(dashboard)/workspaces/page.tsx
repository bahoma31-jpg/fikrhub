import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';
// @ts-expect-error
import { auth } from '@/lib/auth';
// @ts-expect-error
import { getUserWorkspaces } from '@/actions/workspaces';

// Mock data
const MOCK_WORKSPACES = [
    { id: '1', name: 'فريق التطوير', description: 'تطوير تطبيقات الويب والموبايل', membersCount: 5 },
    { id: '2', name: 'التسويق', description: 'حملات تسويقية وابتكار إعلانات', membersCount: 3 },
];

export default async function WorkspacesPage() {
    const user = { user: { id: '1' } };
    const workspaces = MOCK_WORKSPACES;

    return (
        <div className="space-y-8 p-4 text-foreground">
            <div className="flex justify-between items-center pb-6 border-b">
                <h1 className="text-4xl font-bold font-cairo">فرق العمل</h1>
                <Button>
                    <Plus className="mr-2 w-5 h-5" /> إنشاء فريق جديد
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaces.map((w) => (
                    <Card key={w.id} className="hover:border-primary/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-cairo">
                                <Users className="w-5 h-5 text-primary" />
                                {w.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="font-tajawal">{w.description}</CardDescription>
                            <div className="mt-4 text-sm font-medium text-muted-foreground flex items-center font-tajawal">
                                <Users className="w-4 h-4 mr-2" />
                                {w.membersCount} أعضاء
                            </div>
                        </CardContent>
                        <CardFooter className="pt-2">
                            <Button variant="outline" className="w-full" asChild>
                                <Link href={\`/workspaces/\${w.id}\`}>
                                دخول الفريق <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </CardFooter>
          </Card>
        ))}
        </div>
    </div >
  );
}
