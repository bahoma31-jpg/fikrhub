export interface BrainstormingTemplate {
    id: string;
    nameAr: string;
    nameEn: string;
    description: string;
    technique: string;
    prompts: string[];
    isPro: boolean;
}

export const templates: BrainstormingTemplate[] = [
    {
        id: 't1',
        nameAr: 'تطوير منتج جديد',
        nameEn: 'New Product Development',
        description: 'قالب كلاسيكي لتوليد أفكار مبدئية لمنتج أو خدمة جديدة.',
        technique: 'classic',
        prompts: [
            'ما هي المشكلة الأساسية التي نريد حلها؟',
            'من هم جمهورنا المستهدف؟',
            'كيف يمكننا تقديم قيمة فريدة تميزنا عن المنافسين؟'
        ],
        isPro: false,
    },
    {
        id: 't2',
        nameAr: 'تحسين ميزة قائمة',
        nameEn: 'Feature Enhancement',
        description: 'التركيز على ميزة حالية في منتجك وتوليد أفكار لتطويرها باستخدام تقنية SCAMPER.',
        technique: 'scamper',
        prompts: [
            'كيف يمكننا تبسيط استخدام هذه الميزة؟ (Eliminate/Minimize)',
            'ما الذي يمكن دمجه مع هذه الميزة لزيادة قيمتها؟ (Combine)',
            'هل يمكن استخدام هذه الميزة لغرض آخر تماماً؟ (Put to another use)'
        ],
        isPro: false,
    },
    {
        id: 't3',
        nameAr: 'حل مشكلة مستعصية (تقنية العكس)',
        nameEn: 'Solving Stubborn Problem (Reverse)',
        description: 'تحليل أسباب الفشل من خلال هندسة المشكلة العكسية للتفكير خارج الصندوق.',
        technique: 'reverse',
        prompts: [
            'كيف يمكننا جعل هذه المشكلة أسوأ بكثير؟',
            'ما هي الخطوات المضمونة لفشل مشروعنا؟',
            'بعد معرفة أسباب الفشل، كيف يمكننا عكسها للوصول للحل؟'
        ],
        isPro: false,
    },
    {
        id: 't4',
        nameAr: 'التخطيط الاستراتيجي السنوي',
        nameEn: 'Annual Strategic Planning',
        description: 'استخدام القبعات الست لتحليل استراتيجية الشركة وتحديد الأولويات للسنة القادمة.',
        technique: 'six_hats',
        prompts: [
            'القبعة البيضاء: ما هي الأرقام والبيانات المتاحة لدينا للعام الماضي؟',
            'القبعة الصفراء: ما هي أكبر الفرص الإيجابية للعام القادم؟',
            'القبعة السوداء: ما هي المخاطر والتحديات التي يجب أن نستعد لها؟'
        ],
        isPro: true,
    },
    {
        id: 't5',
        nameAr: 'إطلاق حملة تسويقية',
        nameEn: 'Marketing Campaign Launch',
        description: 'خطوات لكتابة مفاهيم إبداعية لحملة تسويقية وجذب انتباه الجمهور المستهدف.',
        technique: 'brainwriting',
        prompts: [
            'ما هي الرسالة المحورية للحملة في جملة واحدة؟',
            'اكتب 3 عناوين جذابة للحملة.',
            'ما هي المنصات الأنسب للترويج ولماذا؟'
        ],
        isPro: false,
    },
    {
        id: 't6',
        nameAr: 'تطوير خطة أزمات',
        nameEn: 'Crisis Management Planning',
        description: 'تطبيق تحليل SWOT لتقييم جاهزية المؤسسة للأزمات المحتملة وتحليل نقاط القوة والضعف.',
        technique: 'swot',
        prompts: [
            'نقاط الضعف (Weaknesses): ما الذي ينقصنا لتجاوز الأزمة بشكل أفضل؟',
            'التهديدات (Threats): ما هي أسوأ السيناريوهات الممكنة؟',
            'نقاط القوة (Strengths): ما هي الموارد التي نعتمد عليها في الأوقات الصعبة؟'
        ],
        isPro: true,
    },
    {
        id: 't7',
        nameAr: 'تحسين تجربة العملاء (CX)',
        nameEn: 'Customer Experience (CX) Improvement',
        description: 'توليد أفكار حول كيفية تحويل تجربة العميل من عادية إلى استثنائية.',
        technique: 'classic',
        prompts: [
            'ما هي أكثر الشكاوى شيوعًا بين عملائنا؟',
            'كيف يمكننا مفاجأة العميل بشكل إيجابي في أول تعامل له معنا؟',
            'كيف نجعل عملية الدعم الفني أكثر سلاسة؟'
        ],
        isPro: false,
    },
    {
        id: 't8',
        nameAr: 'ابتكار نموذج ربح جديد',
        nameEn: 'New Revenue Model Innovation',
        description: 'استكشاف بدائل وطرق جديدة لتحقيق الدخل أو خفض التكاليف باستخدام SCAMPER.',
        technique: 'scamper',
        prompts: [
            'هل يمكننا تقديم المنتج كاشتراك شهري بدلاً من الدفع لمرة واحدة؟ (Modify/Adapt)',
            'ما الذي يمكن الاستغناء عنه لتقليل التكلفة بنسبة 30%؟ (Eliminate)',
            'هل يمكننا تحويل منتجنا الأساسي إلى خدمة مجانية والربح من خدمات مساعدة؟ (Reverse/Rearrange)'
        ],
        isPro: true,
    },
    {
        id: 't9',
        nameAr: 'تخطيط فعالية أو مؤتمر',
        nameEn: 'Event or Conference Planning',
        description: 'تجميع أفكار لتنظيم حدث ناجح سواء كان حضوريًا أو عبر الإنترنت.',
        technique: 'brainwriting',
        prompts: [
            'ما هو الموضوع الرئيسي (Theme) للفعالية؟',
            'من هم المتحدثون الذين نتمنى استضافتهم؟',
            'كيف نجعل الفعالية تفاعلية وتجنب الملل للحضور؟'
        ],
        isPro: true,
    },
    {
        id: 't10',
        nameAr: 'تحليل المنافسين',
        nameEn: 'Competitor Analysis',
        description: 'دراسة وتحليل أداء المنافسين وتحديد الفجوات باستخدام تحليل SWOT الموجه.',
        technique: 'swot',
        prompts: [
            'ما هي نقاط القوة التي يتميز بها المنافسون ونفتقر إليها؟',
            'أين تكمن الفرص المتاحة (الفجوات) في السوق التي لم يستغلها المنافسون؟',
            'ما التهديدات التي يشكلها دخول منافسين جدد؟'
        ],
        isPro: true,
    }
];
