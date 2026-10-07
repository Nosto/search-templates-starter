import { defineConfig, devices } from "@playwright/test"

const port = 8100
const baseURL = `http://localhost:${port}`

export default defineConfig({
  testDir: "./test/e2e",
  fullyParallel: false,
  retries: 3,
  use: {
    baseURL,
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
    command: `npm run dev:mocked -- --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000
  }
})
