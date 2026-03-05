import { notFound } from 'next/navigation';
// @ts-expect-error
import { auth } from '@/lib/auth';
// @ts-expect-error
import { getSessionById } from '@/actions/sessions';

import { SessionHeader } from '@/components/session/session-header';
import { SessionTimer } from '@/components/session/session-timer';
import { IdeaInput } from '@/components/session/idea-input';
import { IdeaList } from '@/components/session/idea-list';

// Mock data
const MOCK_SESSION = {
    id: '1',
    title: 'تطوير التطبيق',
    techniqueId: 'classic',
    status: 'active',
    workspace: { members: ['1'] },
    userId: '1'
};

export async function generateMetadata({ params }: { params: { id: string } }) {
    // const session = await getSessionById(params.id);
    const session = MOCK_SESSION;
    return {
        title: session ?\`جلسة: \${session.title}\` : 'جلسة غير موجودة',
  };
}

export default async function SessionPage({
  params,
}: {
  params: { id: string };
}) {
  // const user = await auth();
  // const session = await getSessionById(params.id);
  const user = { user: { id: '1' } };
  const session = MOCK_SESSION;

  if (!session) notFound();

  // ✅ التحقق من الصلاحية
  if (session.userId !== user!.user.id && !session.workspace?.members.includes(user!.user.id)) {
    return (
      <div className="text-center py-16">
        <p className="text-destructive font-tajawal">ليس لديك صلاحية لعرض هذه الجلسة</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center">
         <SessionHeader 
            session={{id: session.id, title: session.title, techniqueId: session.techniqueId, status: session.status as any}} 
            participants={[]} 
         />
         <SessionTimer 
            sessionId={session.id} 
            durationLimit={(45 * 60)} 
            onTimeUp={() => {}} 
         />
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
        {/* Input Area */}
        <div className="md:col-span-1 border rounded-lg p-4 bg-muted/20 overflow-y-auto">
          <h3 className="font-bold mb-4 text-foreground font-cairo">أضف فكرتك</h3>
          <IdeaInput sessionId={session.id!} />
        </div>

        {/* Ideas Output Area */}
        <div className="md:col-span-2 border rounded-lg p-4 bg-card overflow-y-auto">
          <h3 className="font-bold mb-4 text-foreground font-cairo">الأفكار المطروحة</h3>
          <IdeaList sessionId={session.id!} />
        </div>
      </div>
    </div>
  );
}
