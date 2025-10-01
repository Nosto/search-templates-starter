import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./test/e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 1,
  use: {
    baseURL: "http://localhost:8000",
    trace: "on-first-retry",
    actionTimeout: 10000,
    navigationTimeout: 30000,
    // Add screenshot on failure for debugging
    screenshot: "only-on-failure",
    // Add video recording for debugging flaky tests
    video: "retain-on-failure"
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"]
        // Remove executablePath to use Playwright's managed browser
        // which should be more stable than system browser
      }
    }
  ],

  webServer: {
    command: "npm run dev:mocked",
    url: "http://localhost:8000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    // Wait for the server to be ready with more retries
    port: 8000
  },

  // Global test timeout increased for stability
  timeout: 60 * 1000,

  // Better reporting for debugging
  reporter: [["html"], ["list"]]
})
