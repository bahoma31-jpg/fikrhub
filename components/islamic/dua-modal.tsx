"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HeartHandshake } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const duas = [
    "اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً.",
    "اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً.",
    "رب اشرح لي صدري ويسر لي أمري واحلل عقدة من لساني يفقهوا قولي.",
    "اللهم افتح لي أبواب حكمتك، وانشر عليّ رحمتك، وامنن عليّ بالحفظ والفهم."
];

export function DuaModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10" title="أدعية للبركة">
                    <HeartHandshake className="h-5 w-5" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-card border-primary/30">
                <DialogHeader>
                    <DialogTitle className="text-center font-cairo text-2xl text-primary flex justify-center items-center gap-2">
                        <HeartHandshake className="h-6 w-6" />
                        أدعية البركة والتيسير
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-[300px] mt-4 pr-4">
                    <div className="space-y-4">
                        {duas.map((dua, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl bg-muted/50 border border-border/50 text-center hover:bg-muted transition-colors font-tajawal text-lg leading-relaxed text-foreground relative"
                            >
                                <span className="absolute right-2 top-2 text-muted-foreground/30 text-4xl">"</span>
                                {dua}
                                <span className="absolute left-2 bottom-2 text-muted-foreground/30 text-4xl leading-none">"</span>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
