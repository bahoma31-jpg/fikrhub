import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUserById, getUserByEmail, createUser, updateUser, getUserStats } from "@/services/user.service";
import { db } from "@/db";

// محاكاة قاعدة البيانات
vi.mock("@/db", () => ({
    db: {
        select: vi.fn(),
        from: vi.fn(),
        where: vi.fn(),
        limit: vi.fn(),
        insert: vi.fn(),
        values: vi.fn(),
        returning: vi.fn(),
        update: vi.fn(),
        set: vi.fn(),
        leftJoin: vi.fn(),
    },
}));

describe("User Service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("يجب أن يسترجع مستخدم بالمعرف (Happy Path)", async () => {
        const mockUser = { id: "1", email: "test@example.com", name: "User" };
        // Setup mock chain for db.select().from().where().limit()
        const limitMock = vi.fn().mockResolvedValue([mockUser]);
        const whereMock = vi.fn().mockReturnValue({ limit: limitMock });
        const fromMock = vi.fn().mockReturnValue({ where: whereMock });
        (db.select as any).mockReturnValue({ from: fromMock });

        const result = await getUserById("1");
        expect(result).toEqual(mockUser);
    });

    it("يجب أن يرجع null إذا لم يجد مستخدم بالمعرف (Edge Case)", async () => {
        const limitMock = vi.fn().mockResolvedValue([]);
        const whereMock = vi.fn().mockReturnValue({ limit: limitMock });
        const fromMock = vi.fn().mockReturnValue({ where: whereMock });
        (db.select as any).mockReturnValue({ from: fromMock });

        const result = await getUserById("2");
        expect(result).toBeNull();
    });

    it("يجب أن يعالج خطأ استرجاع مستخدم بالمعرف (Error Handling)", async () => {
        const fromMock = vi.fn().mockImplementation(() => { throw new Error("DB Error"); });
        (db.select as any).mockReturnValue({ from: fromMock });

        await expect(getUserById("3")).rejects.toThrow("فشل جلب المستخدم بواسطة المعرف");
    });

    it("يجب أن يسترجع مستخدم بالبريد الإلكتروني", async () => {
        const mockUser = { id: "1", email: "test@example.com" };
        const limitMock = vi.fn().mockResolvedValue([mockUser]);
        const whereMock = vi.fn().mockReturnValue({ limit: limitMock });
        const fromMock = vi.fn().mockReturnValue({ where: whereMock });
        (db.select as any).mockReturnValue({ from: fromMock });

        const result = await getUserByEmail("test@example.com");
        expect(result).toEqual(mockUser);
    });

    it("يجب أن ينشئ مستخدم جديد", async () => {
        const mockCreatedUser = { id: "1", email: "new@example.com" };
        const returningMock = vi.fn().mockResolvedValue([mockCreatedUser]);
        const valuesMock = vi.fn().mockReturnValue({ returning: returningMock });
        (db.insert as any).mockReturnValue({ values: valuesMock });

        const result = await createUser({ email: "new@example.com", name: "New", password: "password" });
        expect(result).toEqual(mockCreatedUser);
    });

    it("يجب أن يحدّث مستخدم موجود", async () => {
        const mockUpdatedUser = { id: "1", name: "Updated" };
        const returningMock = vi.fn().mockResolvedValue([mockUpdatedUser]);
        const whereMock = vi.fn().mockReturnValue({ returning: returningMock });
        const setMock = vi.fn().mockReturnValue({ where: whereMock });
        (db.update as any).mockReturnValue({ set: setMock });

        const result = await updateUser("1", { name: "Updated" });
        expect(result).toEqual(mockUpdatedUser);
    });

    it("يجب أن يرمي خطأ عند تحديث مستخدم غير موجود", async () => {
        const returningMock = vi.fn().mockResolvedValue([]);
        const whereMock = vi.fn().mockReturnValue({ returning: returningMock });
        const setMock = vi.fn().mockReturnValue({ where: whereMock });
        (db.update as any).mockReturnValue({ set: setMock });

        await expect(updateUser("1", { name: "Updated" })).rejects.toThrow("فشل تحديث بيانات المستخدم");
    });

    it("يجب أن يجلب إحصائيات المستخدم", async () => {
        const mockResult = { users: { id: "1" }, user_stats: { totalSessions: 5 } };
        const limitMock = vi.fn().mockResolvedValue([mockResult]);
        const whereMock = vi.fn().mockReturnValue({ limit: limitMock });
        const leftJoinMock = vi.fn().mockReturnValue({ where: whereMock });
        const fromMock = vi.fn().mockReturnValue({ leftJoin: leftJoinMock });
        (db.select as any).mockReturnValue({ from: fromMock });

        const result = await getUserStats("1");
        expect(result).toEqual({ id: "1", stats: { totalSessions: 5 } });
    });

    it("يجب أن يرجع null إذا لم يجد الإحصائيات", async () => {
        const limitMock = vi.fn().mockResolvedValue([]);
        const whereMock = vi.fn().mockReturnValue({ limit: limitMock });
        const leftJoinMock = vi.fn().mockReturnValue({ where: whereMock });
        const fromMock = vi.fn().mockReturnValue({ leftJoin: leftJoinMock });
        (db.select as any).mockReturnValue({ from: fromMock });

        const result = await getUserStats("2");
        expect(result).toBeNull();
    });
});
