import { describe, it, expect } from "vitest"
import { readFileSync, readdirSync, statSync } from "fs"
import { join } from "path"

/**
 * Test suite to validate that all CSS variable usage in CSS files
 * references variables that are defined in src/variable.css
 */
describe("CSS Variable Validation", () => {
  /**
   * Extract CSS variable definitions from src/variable.css
   * Returns a Set of variable names (without the -- prefix)
   */
  function getDefinedCssVariables(): Set<string> {
    const variableCssPath = join(process.cwd(), "src/variable.css")
    const content = readFileSync(variableCssPath, "utf-8")

    // Match CSS custom properties: --variable-name:
    const variablePattern = /--([a-zA-Z0-9-]+)\s*:/g
    const variables = new Set<string>()

    let match
    while ((match = variablePattern.exec(content)) !== null) {
      variables.add(match[1])
    }

    return variables
  }

  /**
   * Extract CSS variable usage from a CSS file content
   * Returns an array of variable names (without the -- prefix)
   */
  function getCssVariableUsage(content: string): string[] {
    // Match var(--variable-name) usage
    const usagePattern = /var\(--([a-zA-Z0-9-]+)\)/g
    const usedVariables: string[] = []

    let match
    while ((match = usagePattern.exec(content)) !== null) {
      usedVariables.push(match[1])
    }

    return usedVariables
  }

  /**
   * Recursively find all CSS files in a directory
   */
  function findCssFiles(dir: string): string[] {
    const files: string[] = []

    function traverse(currentDir: string) {
      const items = readdirSync(currentDir)

      for (const item of items) {
        const fullPath = join(currentDir, item)
        const stat = statSync(fullPath)

        if (stat.isDirectory()) {
          traverse(fullPath)
        } else if (item.endsWith(".css")) {
          files.push(fullPath)
        }
      }
    }

    traverse(dir)
    return files
  }

  it("should only reference CSS variables that are defined in src/variable.css", () => {
    const definedVariables = getDefinedCssVariables()
    const srcDir = join(process.cwd(), "src")
    const cssFiles = findCssFiles(srcDir)

    // Exclude the variable.css file itself from validation
    const cssFilesToValidate = cssFiles.filter(file => !file.endsWith("variable.css"))

    const undefinedVariables: Array<{ file: string; variable: string; line?: number }> = []

    for (const cssFile of cssFilesToValidate) {
      const content = readFileSync(cssFile, "utf-8")
      const usedVariables = getCssVariableUsage(content)

      for (const variable of usedVariables) {
        if (!definedVariables.has(variable)) {
          // Find line number for better error reporting
          const lines = content.split("\n")
          let lineNumber: number | undefined

          for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(`var(--${variable})`)) {
              lineNumber = i + 1
              break
            }
          }

          undefinedVariables.push({
            file: cssFile.replace(process.cwd(), ""),
            variable,
            line: lineNumber
          })
        }
      }
    }

    if (undefinedVariables.length > 0) {
      const errorMessage = [
        "Found undefined CSS variable references:",
        ...undefinedVariables.map(
          ({ file, variable, line }) => `  ${file}${line ? `:${line}` : ""} - var(--${variable})`
        ),
        "",
        "Available variables in src/variable.css:",
        ...Array.from(definedVariables)
          .sort()
          .map(v => `  --${v}`)
      ].join("\n")

      throw new Error(errorMessage)
    }

    // If we get here, all variables are properly defined
    expect(undefinedVariables).toHaveLength(0)
  })

  it("should have CSS variable definitions in src/variable.css", () => {
    const definedVariables = getDefinedCssVariables()

    // Ensure we actually found some variables
    expect(definedVariables.size).toBeGreaterThan(0)

    // Check that we have some expected core variables
    expect(definedVariables.has("ns-color-primary")).toBe(true)
    expect(definedVariables.has("ns-font-size-4")).toBe(true)
    expect(definedVariables.has("ns-space-4")).toBe(true)
  })

  it("should find CSS files that use variables", () => {
    const srcDir = join(process.cwd(), "src")
    const cssFiles = findCssFiles(srcDir)

    // Exclude variable.css from this count
    const cssFilesToValidate = cssFiles.filter(file => !file.endsWith("variable.css"))

    // Ensure we found some CSS files to validate
    expect(cssFilesToValidate.length).toBeGreaterThan(0)

    // Check that at least some files use CSS variables
    let totalVariableUsage = 0
    for (const cssFile of cssFilesToValidate) {
      const content = readFileSync(cssFile, "utf-8")
      const usedVariables = getCssVariableUsage(content)
      totalVariableUsage += usedVariables.length
    }

    expect(totalVariableUsage).toBeGreaterThan(0)
  })
})
