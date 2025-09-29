import { describe, it, expect } from "vitest"
import { readFileSync, readdirSync, statSync } from "fs"
import { join, dirname } from "path"

describe("CSS Module Class Usage", () => {
  // Helper function to find all .module.css files recursively
  function findCssModuleFiles(dir: string): string[] {
    const cssModuleFiles: string[] = []

    function traverse(currentDir: string) {
      const items = readdirSync(currentDir)

      for (const item of items) {
        const fullPath = join(currentDir, item)
        const stat = statSync(fullPath)

        if (stat.isDirectory()) {
          traverse(fullPath)
        } else if (item.endsWith(".module.css")) {
          cssModuleFiles.push(fullPath)
        }
      }
    }

    traverse(dir)
    return cssModuleFiles
  }

  // Helper function to extract CSS class names from a CSS module file
  function extractCssClasses(cssContent: string): Set<string> {
    const classes = new Set<string>()
    // Match CSS class selectors (.className)
    const classRegex = /\.([a-zA-Z_-][a-zA-Z0-9_-]*)\s*\{/g
    let match

    while ((match = classRegex.exec(cssContent)) !== null) {
      classes.add(match[1])
    }

    return classes
  }

  // Helper function to find TSX files that import a CSS module
  function findImportingTsxFiles(cssModulePath: string): string[] {
    const cssModuleDir = dirname(cssModulePath)
    const cssModuleBasename = cssModulePath.split("/").pop()?.replace(".module.css", "")

    if (!cssModuleBasename) return []

    const tsxFiles: string[] = []

    // Look for TSX files in the same directory
    try {
      const items = readdirSync(cssModuleDir)
      for (const item of items) {
        if (item.endsWith(".tsx") && !item.endsWith(".stories.tsx")) {
          const fullPath = join(cssModuleDir, item)
          const content = readFileSync(fullPath, "utf-8")

          // Check if this TSX file imports the CSS module
          const importRegex = new RegExp(`import\\s+.*\\s+from\\s+['"]\\.\\/${cssModuleBasename}\\.module\\.css['"]`)
          if (importRegex.test(content)) {
            tsxFiles.push(fullPath)
          }
        }
      }
    } catch {
      // Directory might not exist or be accessible
    }

    return tsxFiles
  }

  // Helper function to check if CSS classes are used in TSX content
  function findUsedClasses(tsxContent: string, cssClasses: Set<string>): Set<string> {
    const usedClasses = new Set<string>()

    for (const className of cssClasses) {
      // Check for various usage patterns:
      // 1. style.className or styles.className (most common)
      // 2. style[className] or styles[className] (dynamic access)
      // 3. style["className"] or styles["className"] (string access)
      // 4. template literals with styles
      const usagePatterns = [
        new RegExp(`styles?\\.${className}\\b`, "g"),
        new RegExp(`styles?\\[["']${className}["']\\]`, "g"),
        new RegExp(`styles?\\[${className}\\]`, "g"),
        new RegExp(`\\$\\{.*styles?\\.${className}.*\\}`, "g"), // template literals
        new RegExp(`\\$\\{.*styles?\\[["']${className}["']\\].*\\}`, "g") // template literals with brackets
      ]

      for (const pattern of usagePatterns) {
        if (pattern.test(tsxContent)) {
          usedClasses.add(className)
          break
        }
      }
    }

    return usedClasses
  }

  it("should verify all CSS module classes are used", () => {
    const srcDir = join(process.cwd(), "src")
    const cssModuleFiles = findCssModuleFiles(srcDir)

    expect(cssModuleFiles.length).toBeGreaterThan(0)

    const unusedClasses: Array<{ file: string; classes: string[] }> = []

    for (const cssModuleFile of cssModuleFiles) {
      const relativeFile = cssModuleFile.replace(process.cwd() + "/", "")

      // Read and parse CSS file
      const cssContent = readFileSync(cssModuleFile, "utf-8")
      const cssClasses = extractCssClasses(cssContent)

      if (cssClasses.size === 0) {
        continue // Skip files with no classes
      }

      // Find importing TSX files
      const importingTsxFiles = findImportingTsxFiles(cssModuleFile)

      if (importingTsxFiles.length === 0) {
        // No TSX files import this CSS module - all classes are unused
        unusedClasses.push({
          file: relativeFile,
          classes: Array.from(cssClasses)
        })
        continue
      }

      // Check usage in all importing TSX files
      const allUsedClasses = new Set<string>()

      for (const tsxFile of importingTsxFiles) {
        const tsxContent = readFileSync(tsxFile, "utf-8")
        const usedInThisFile = findUsedClasses(tsxContent, cssClasses)

        for (const className of usedInThisFile) {
          allUsedClasses.add(className)
        }
      }

      // Find unused classes
      const unused = Array.from(cssClasses).filter(className => !allUsedClasses.has(className))

      if (unused.length > 0) {
        unusedClasses.push({
          file: relativeFile,
          classes: unused
        })
      }
    }

    // Report results
    if (unusedClasses.length > 0) {
      const errorMessage = unusedClasses.map(item => `${item.file}: ${item.classes.join(", ")}`).join("\n")

      throw new Error(`Found unused CSS classes:\n${errorMessage}`)
    }
  })
})
