import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface TechniqueCardProps {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    tags: string[];
    onSelect: (id: string) => void;
    isSelected?: boolean;
}

export function TechniqueCard({
    id,
    title,
    description,
    icon: Icon,
    tags,
    onSelect,
    isSelected = false
}: TechniqueCardProps) {
    return (
        <Card
            className={`relative overflow-hidden transition-all duration-200 hover:border-primary/50 cursor-pointer ${isSelected ? 'border-primary ring-1 ring-primary' : 'border-border'
                }`}
            onClick={() => onSelect(id)}
        >
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                    {isSelected && (
                        <Badge variant="default" className="bg-primary text-primary-foreground">
                            محدد
                        </Badge>
                    )}
                </div>
                <CardTitle className="text-xl mt-4 font-cairo">{title}</CardTitle>
            </CardHeader>

            <CardContent>
                <CardDescription className="line-clamp-3 text-sm flex-grow font-tajawal">
                    {description}
                </CardDescription>

                <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="pt-2">
                <Button
                    variant={isSelected ? "default" : "outline"}
                    className="w-full"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(id);
                    }}
                >
                    {isSelected ? 'تم الاختيار' : 'اختيار التقنية'}
                </Button>
            </CardFooter>
        </Card>
    );
}
