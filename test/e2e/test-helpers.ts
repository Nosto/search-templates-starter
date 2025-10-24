import { test } from "@playwright/test"

/**
 * Check if Playwright browsers are available
 * Returns true if browsers are installed, false otherwise
 */
export function areBrowsersAvailable(): boolean {
  // In sandbox environments, browsers are typically not available
  if (process.env.CI || process.env.SANDBOX_MODE) {
    return false
  }
  
  // Try to check if chromium is available by looking for the executable
  try {
    const fs = require('fs')
    const path = require('path')
    const os = require('os')
    
    // Common Playwright browser paths
    const homedir = os.homedir()
    const playwrightCache = path.join(homedir, '.cache', 'ms-playwright')
    
    if (fs.existsSync(playwrightCache)) {
      const dirs = fs.readdirSync(playwrightCache)
      return dirs.some((dir: string) => dir.startsWith('chromium'))
    }
    
    return false
  } catch (error) {
    return false
  }
}

/**
 * Skip test if browsers are not available
 */
export function skipIfNoBrowsers() {
  test.skip(!areBrowsersAvailable(), 'Skipping E2E test - Playwright browsers not installed. Run `npx playwright install` to enable E2E tests.')
}