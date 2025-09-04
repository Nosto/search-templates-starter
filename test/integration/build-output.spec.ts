import { describe, it, expect, beforeAll } from "vitest"
import { execSync } from "child_process"
import { readdirSync, readFileSync, statSync, existsSync } from "fs"
import { resolve } from "path"

const projectRoot = resolve(import.meta.dirname, "../..")
const distDir = resolve(projectRoot, "dist")

describe("build output integration", () => {
  beforeAll(() => {
    // Clean and rebuild to ensure fresh output
    try {
      execSync("npm run build", {
        cwd: projectRoot,
        stdio: "inherit",
        timeout: 120000 // 120 second timeout for CI/slow environments
      })
    } catch (error) {
      throw new Error(`Build failed: ${error}`)
    }
  }, 150000) // 150 second timeout for beforeAll hook

  it("produces exactly 3 files in dist directory", () => {
    expect(existsSync(distDir)).toBe(true)

    const files = readdirSync(distDir)
    expect(files).toHaveLength(3)

    // Sort for consistent comparison
    const sortedFiles = files.sort()
    expect(sortedFiles).toEqual(["index.css", "index.js", "index.js.map"])
  })

  it("generates index.js as IIFE wrapped JavaScript", () => {
    const jsFile = resolve(distDir, "index.js")
    expect(existsSync(jsFile)).toBe(true)

    const content = readFileSync(jsFile, "utf-8")

    // Check that it's IIFE wrapped
    expect(content).toMatch(/^\s*\(function\s*\(/)

    // Check for "use strict" which should be present in the IIFE
    expect(content).toContain('"use strict"')

    // Check that it ends properly (may have source map comment)
    expect(content).toMatch(/\}\)\(\);(?:\s*\/\/# sourceMappingURL=.*)?$/m)

    // Verify it has reasonable size (should be minified)
    const stats = statSync(jsFile)
    expect(stats.size).toBeGreaterThan(10000) // At least 10KB
    expect(stats.size).toBeLessThan(200000) // Less than 200KB
  })

  it("generates valid source map", () => {
    const mapFile = resolve(distDir, "index.js.map")
    expect(existsSync(mapFile)).toBe(true)

    const content = readFileSync(mapFile, "utf-8")
    const sourceMap = JSON.parse(content)

    // Basic source map structure validation
    expect(sourceMap).toHaveProperty("version")
    expect(sourceMap).toHaveProperty("sources")
    expect(sourceMap).toHaveProperty("mappings")
    expect(sourceMap.version).toBe(3)
    expect(Array.isArray(sourceMap.sources)).toBe(true)
    expect(sourceMap.sources.length).toBeGreaterThan(0)
  })

  it("generates CSS bundle with proper name", () => {
    const cssFile = resolve(distDir, "index.css")
    expect(existsSync(cssFile)).toBe(true)

    const content = readFileSync(cssFile, "utf-8")

    // Should contain some CSS content
    expect(content.length).toBeGreaterThan(100)

    // Should contain some expected CSS patterns (this is a basic sanity check)
    expect(content).toMatch(/[.#][a-zA-Z-_][a-zA-Z0-9-_]*\s*{/)

    // Verify reasonable file size
    const stats = statSync(cssFile)
    expect(stats.size).toBeGreaterThan(1000) // At least 1KB
    expect(stats.size).toBeLessThan(100000) // Less than 100KB
  })

  it("does not generate Vue-style hashed assets", () => {
    const files = readdirSync(distDir)

    // Should not have any files with hash patterns like "native-BcCsFkZ3.js"
    const hashedAssets = files.filter(file => file.match(/^[a-zA-Z]+-[a-zA-Z0-9]{8,}\.(js|css)$/))

    expect(hashedAssets).toHaveLength(0)
  })

  it("does not generate HTML file", () => {
    const htmlFile = resolve(distDir, "index.html")
    expect(existsSync(htmlFile)).toBe(false)
  })

  it("does not generate assets subdirectory", () => {
    const assetsDir = resolve(distDir, "assets")
    expect(existsSync(assetsDir)).toBe(false)
  })

  it("JavaScript bundle contains expected content structure", () => {
    const jsFile = resolve(distDir, "index.js")
    const content = readFileSync(jsFile, "utf-8")

    // Should contain some recognizable patterns from the library
    expect(content).toContain("use strict")
    expect(content.length).toBeGreaterThan(1000) // Should have substantial content
  })
})
