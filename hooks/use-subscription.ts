import { useState, useEffect } from 'react';

export interface SubscriptionPlan {
    id: 'free' | 'pro' | 'enterprise';
    name: string;
    features: string[];
    maxSessions: number;
}

export function useSubscription() {
    const [subscription, setSubscription] = useState<SubscriptionPlan | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSubscription = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // API Call to get subscription data
            // const res = await fetch('/api/billing/plan');
            // const { data } = await res.json();

            const mockData: SubscriptionPlan = {
                id: 'free',
                name: 'الخطة المجانية',
                features: ['جلسات محدودة', 'أفكار أساسية', 'وكيل ذكاء اصطناعي واحد'],
                maxSessions: 5,
            };

            setSubscription(mockData);
        } catch (err: any) {
            setError(err?.message || "فشل تحميل خطة الاشتراك");
        } finally {
            setIsLoading(false);
        }
    };

    const checkFeatureAccess = (feature: string) => {
        return subscription?.features.includes(feature) || false;
    };

    useEffect(() => {
        fetchSubscription();
    }, []);

    return {
        data: subscription,
        isLoading,
        error,
        actions: {
            fetchSubscription,
            checkFeatureAccess,
        }
    };
}
