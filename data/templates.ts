// ملف: data/templates.ts — بيانات القوالب الجاهزة للتقنيات التسع
/**
 * @file templates.ts
 * @description تعريف القوالب الهيكلية لكل تقنية من تقنيات العصف الذهني التسع.
 */

export interface TemplateData {
    id: string;
    name: string;
    techniqueType: string;
    description: string;
    defaultDuration: number;
    structure: {
        steps: {
            title: string;
            description_ar: string;
            questions: string[];
        }[];
    };
}

export const TEMPLATES_DATA: TemplateData[] = [
    {
        id: "tpl_classic",
        name: "قالب العصف الذهني التقليدي",
        techniqueType: "classic",
        description: "الأسلوب الكلاسيكي لتوليد أكبر كم من الأفكار دون قيود.",
        defaultDuration: 30,
        structure: {
            steps: [
                { title: "تعريف المشكلة", description_ar: "تحديد ما نحاول حله بوضوح.", questions: ["ما هو التحدي الرئيسي؟", "من هو الجمهور المستهدف؟"] },
                { title: "توليد الأفكار", description_ar: "مرحلة الكم قبل الكيف.", questions: ["اطرح أي فكرة تخطر ببالك.", "كيف يمكن حل هذا بأبسط طريقة؟"] },
                { title: "التنقية", description_ar: "فلترة الأفكار الواعدة.", questions: ["ما هي أفضل 3 أفكار؟"] }
            ]
        }
    },
    {
        id: "tpl_brainwriting",
        name: "قالب الكتابة الذهنية 6-3-5",
        techniqueType: "brainwriting",
        description: "توليد الأفكار بصمت ثم البناء على أفكار الآخرين.",
        defaultDuration: 45,
        structure: {
            steps: [
                { title: "الجولة الأولى", description_ar: "كل مشارك يكتب 3 أفكار.", questions: ["اكتب أفكارك الأولى بوضوح."] },
                { title: "التدوير والبناء", description_ar: "أضف على أفكار زميلك.", questions: ["كيف يمكنك تحسين هذه الفكرة؟", "ما الذي ينقص هذا الحل؟"] }
            ]
        }
    },
    {
        id: "tpl_reverse",
        name: "قالب العصف الذهني العكسي",
        techniqueType: "reverse",
        description: "البحث عن مسببات الفشل لتحويلها إلى عوامل نجاح.",
        defaultDuration: 40,
        structure: {
            steps: [
                { title: "كيف نفشل؟", description_ar: "تحديد طرق تدمير المشروع.", questions: ["كيف نجعل المستخدم يكره خدمتنا؟", "ما الذي سيؤدي لإفلاسنا؟"] },
                { title: "قلب الموازين", description_ar: "تحويل المسببات إلى حلول.", questions: ["كيف نمنع كل سبب من أسباب الفشل المذكورة؟"] }
            ]
        }
    },
    {
        id: "tpl_starbursting",
        name: "قالب الانفجار النجمي (Starbursting)",
        techniqueType: "starbursting",
        description: "التركيز على طرح الأسئلة الشاملة حول الفكرة.",
        defaultDuration: 45,
        structure: {
            steps: [
                { title: "الأسئلة الستة", description_ar: "طرح أسئلة تبدأ بـ: من، ماذا، متى، أين، لماذا، كيف.", questions: ["من سيستخدمها؟", "لماذا يحتاجونها الآن؟", "كيف سنصل إليهم؟"] }
            ]
        }
    },
    {
        id: "tpl_stepladder",
        name: "قالب تقنية السلم (Stepladder)",
        techniqueType: "stepladder",
        description: "إدخال المشاركين واحداً تلو الآخر لتجنب التفكير الجماعي المنحاز.",
        defaultDuration: 50,
        structure: {
            steps: [
                { title: "النواة (شخصين)", description_ar: "بدء النقاش بين فردين فقط.", questions: ["ما هي رؤيتكما الأساسية؟"] },
                { title: "التوسع التدريجي", description_ar: "دخول عضو جديد وعرض فكرته قبل سماع الآخرين.", questions: ["ما هي فكرتك المستقلة؟"] }
            ]
        }
    },
    {
        id: "tpl_sixhats",
        name: "قالب القبعات الست",
        techniqueType: "sixhats",
        description: "تحليل الفكرة من 6 زوايا مختلفة ومنظمة.",
        defaultDuration: 90,
        structure: {
            steps: [
                { title: "القبعة البيضاء", description_ar: "الحقائق والأرقام.", questions: ["ما هي المعلومات المتوفرة لدينا؟"] },
                { title: "القبعة الحمراء", description_ar: "المشاعر والحدس.", questions: ["ما هو شعورك تجاه هذه الفكرة؟"] },
                { title: "القبعة السوداء", description_ar: "المخاطر والحذر.", questions: ["ما الذي قد لا ينجح؟"] },
                { title: "القبعة الصفراء", description_ar: "الفوائد والتفاؤل.", questions: ["لماذا هذه الفكرة رائعة؟"] },
                { title: "القبعة الخضراء", description_ar: "الإبداع والبدائل.", questions: ["كيف نطورها بطريقة غير تقليدية؟"] },
                { title: "القبعة الزرقاء", description_ar: "التحكم والتنظيم.", questions: ["ما هي الخطوة القادمة؟"] }
            ]
        }
    },
    {
        id: "tpl_scamper",
        name: "قالب تقنية SCAMPER",
        techniqueType: "scamper",
        description: "تطوير فكرة موجودة عبر 7 استراتيجيات.",
        defaultDuration: 60,
        structure: {
            steps: [
                { title: "استبدل (Substitute)", description_ar: "تغيير جزء من الفكرة.", questions: ["ماذا لو استبدلنا المادة/الجمهور/العملية؟"] },
                { title: "ادمج (Combine)", description_ar: "دمجها مع فكرة أخرى.", questions: ["هل يمكن دمج خدمتين في واحدة؟"] },
                { title: "تكيف (Adapt)", description_ar: "استعارة حل من سياق آخر.", questions: ["كيف تم حل هذا في مجال مختلف؟"] }
            ]
        }
    },
    {
        id: "tpl_worstidea",
        name: "قالب أسوأ فكرة ممكنة",
        techniqueType: "worstidea",
        description: "طرح أسوأ الأفكار لكسر الخوف والوصول لإبداع غير متوقع.",
        defaultDuration: 30,
        structure: {
            steps: [
                { title: "مرحلة السخافة", description_ar: "طرح أفكار سيئة جداً عمداً.", questions: ["ما هي أكثر فكرة مضحكة أو مستحيلة؟"] },
                { title: "البحث عن الجوهرة", description_ar: "استخراج شيء مفيد من الفكرة السيئة.", questions: ["ما هو الجزء الصغير الذي يمكن تحويله لشيء عبقري؟"] }
            ]
        }
    },
    {
        id: "tpl_electronic",
        name: "قالب العصف الذهني الإلكتروني",
        techniqueType: "electronic",
        description: "تفاعل لحظي مجهول الهوية وسريع.",
        defaultDuration: 20,
        structure: {
            steps: [
                { title: "المدخلات السريعة", description_ar: "كتابة سريعة ومجهولة.", questions: ["اكتب أول ما يخطر ببالك الآن."] }
            ]
        }
    }
];
