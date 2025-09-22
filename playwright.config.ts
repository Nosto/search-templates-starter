import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./test/e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: "http://localhost:8000",
    trace: "on-first-retry",
    actionTimeout: 5000,
    navigationTimeout: 10000
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ],

  webServer: {
    command: "npm run dev:mocked",
    url: "http://localhost:8000",
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000
  }
})
