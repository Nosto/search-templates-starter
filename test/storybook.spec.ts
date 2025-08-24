import { describe, it, expect } from "vitest"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Function to recursively find all .stories.tsx files
function findStorybookFiles(dir: string): string[] {
  const files: string[] = []
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...findStorybookFiles(fullPath))
    } else if (item.endsWith(".stories.tsx")) {
      files.push(fullPath)
    }
  }

  return files
}

// Function to verify story file structure
function verifyStoryFileStructure(filePath: string): { valid: boolean; errors: string[] } {
  const content = fs.readFileSync(filePath, "utf-8")
  const errors: string[] = []

  // Check for basic story structure
  if (!content.includes("export default")) {
    errors.push("Missing default export")
  }

  if (!content.includes("title:")) {
    errors.push("Missing title property")
  }

  // Check for at least one story export
  const hasStoryExport = /export const \w+/.test(content)
  if (!hasStoryExport) {
    errors.push("No story exports found")
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

describe("Storybook stories", () => {
  const srcDir = path.join(__dirname, "..", "src")
  const storyFiles = findStorybookFiles(srcDir)

  it("finds Storybook story files", () => {
    expect(storyFiles.length).toBeGreaterThan(0)
    expect(storyFiles.some(file => file.includes(".stories.tsx"))).toBe(true)
  })

  it("verifies all story files have correct structure", () => {
    let totalFiles = 0
    let validFiles = 0
    const invalidFiles: Array<{ file: string; errors: string[] }> = []

    storyFiles.forEach(storyFile => {
      totalFiles++
      const relativePath = path.relative(srcDir, storyFile)
      const verification = verifyStoryFileStructure(storyFile)

      if (verification.valid) {
        validFiles++
      } else {
        invalidFiles.push({
          file: relativePath,
          errors: verification.errors
        })
      }
    })

    expect(totalFiles).toBeGreaterThan(0)
    expect(validFiles).toBe(totalFiles)

    if (invalidFiles.length > 0) {
      console.error("Invalid story files found:", invalidFiles)
    }
  })

  it("has component stories in the expected locations", () => {
    const expectedComponents = [
      "components/Autocomplete/Autocomplete.stories.tsx",
      "components/Search/Search.stories.tsx",
      "components/Product/Product.stories.tsx",
      "components/Products/Products.stories.tsx",
      "components/Sidebar/Sidebar.stories.tsx",
      "elements/Icon/Icon.stories.tsx",
      "elements/Button/Button.stories.tsx"
    ]

    expectedComponents.forEach(expectedPath => {
      const fullPath = path.join(srcDir, expectedPath)
      expect(fs.existsSync(fullPath), `Story file should exist: ${expectedPath}`).toBe(true)
    })
  })

  it("ensures stories use actual components not mock components", () => {
    storyFiles.forEach(storyFile => {
      const content = fs.readFileSync(storyFile, "utf-8")
      const relativePath = path.relative(srcDir, storyFile)

      // Check that stories import actual components
      const hasComponentImport = /import.*from ['"]\.\/.+['"]/.test(content)
      expect(hasComponentImport, `${relativePath} should import actual component`).toBe(true)

      // Check that stories don't have mock view components
      const hasMockComponent = /MockedView|MockView|Mock.*Component/.test(content)
      expect(hasMockComponent, `${relativePath} should not contain mock components`).toBe(false)
    })
  })
})
