import { test as setup, expect } from '@playwright/test';
import path from 'path';

// مسار حفظ session المصادقة
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

/**
 * إعداد: تسجيل دخول مرة واحدة ثم حفظ الـ session
 * يُشغَّل قبل جميع الاختبارات التي تحتاج auth
 */
setup('authenticate', async ({ page }) => {
  await page.goto('/auth/login');

  // ملء نموذج الدخول
  await page.fill('[name="email"]', process.env.TEST_EMAIL || 'test@fikrhub.com');
  await page.fill('[name="password"]', process.env.TEST_PASSWORD || 'TestPass123!');

  await page.click('button[type="submit"]');

  // انتظر الانتقال للـ dashboard
  await page.waitForURL('/dashboard', { timeout: 15000 });
  await expect(page).toHaveURL('/dashboard');

  // حفظ الـ session
  await page.context().storageState({ path: authFile });
});
