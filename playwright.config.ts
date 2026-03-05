import { defineConfig, devices } from '@playwright/test';

/**
 * إعداد Playwright للاختبارات E2E
 * التوثيق: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // مجلد الاختبارات
  testDir: './tests',

  // تشغيل موازي للملفات
  fullyParallel: true,

  // إيقاف CI عند أول فشل
  forbidOnly: !!process.env.CI,

  // عدد محاولات إعادة التشغيل عند الفشل
  retries: process.env.CI ? 2 : 0,

  // عدد العمليات الموازية
  workers: process.env.CI ? 1 : undefined,

  // تقرير HTML تفاعلي
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],

  use: {
    // عنوان التطبيق
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',

    // لقطة شاشة عند الفشل
    screenshot: 'only-on-failure',

    // تسجيل الفيديو عند الفشل
    video: 'retain-on-failure',

    // trace عند الفشل
    trace: 'retain-on-failure',

    // مهلة العملية
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  // مهلة الاختبار الواحد
  timeout: 60000,

  projects: [
    // مشروع الإعداد: تسجيل الدخول مرة واحدة
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // اختبارات Chromium (الأساسي)
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // استخدام الـ session المحفوظة
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // اختبارات Mobile (RTL + عربي)
    {
      name: 'mobile-rtl',
      use: {
        ...devices['Pixel 7'],
        locale: 'ar-DZ',
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // اختبارات بدون auth (صفحات عامة)
    {
      name: 'public',
      testMatch: /.*\.public\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // تشغيل dev server تلقائياً أثناء الاختبارات
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  // مجلد output
  outputDir: 'test-results/',
});
