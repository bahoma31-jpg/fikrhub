// ملف: tests/hooks/use-auth.test.tsx — اختبارات هوك المصادقة
import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import React from "react";
import { useAuth } from "@/hooks/use-auth";

// محاكاة next-auth/react
const mockUseSession = vi.fn();
vi.mock("next-auth/react", () => ({
    useSession: () => mockUseSession(),
    SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe("useAuth Hook", () => {
    it("يجب أن يُرجع isLoading = true عندما تكون الجلسة قيد التحميل", () => {
        mockUseSession.mockReturnValue({
            data: null,
            status: "loading",
        });

        const { result } = renderHook(() => useAuth());
        expect(result.current.isLoading).toBe(true);
        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBeNull();
    });

    it("يجب أن يُرجع بيانات المستخدم عندما تكون الجلسة نشطة", () => {
        const mockUser = {
            id: "user-123",
            name: "محمد",
            email: "test@example.com",
            role: "user",
            subscriptionTier: "free",
        };

        mockUseSession.mockReturnValue({
            data: { user: mockUser },
            status: "authenticated",
        });

        const { result } = renderHook(() => useAuth());
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user).toEqual(mockUser);
    });

    it("يجب أن يُرجع isAuthenticated = false عندما لا توجد جلسة", () => {
        mockUseSession.mockReturnValue({
            data: null,
            status: "unauthenticated",
        });

        const { result } = renderHook(() => useAuth());
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBeNull();
    });
});
