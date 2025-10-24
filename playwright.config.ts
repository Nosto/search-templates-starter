import { defineConfig, devices } from "@playwright/test"

// Check if we're in a sandboxed environment where browsers can't be installed
const isInSandbox = process.env.CI || process.env.SANDBOX_MODE || !process.stdout.isTTY

export default defineConfig({
  testDir: "./test/e2e",
  fullyParallel: false,
  retries: isInSandbox ? 0 : 3, // Don't retry in sandbox environments
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
