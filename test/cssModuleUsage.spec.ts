import { describe, it, expect } from "vitest"
import { readFileSync, readdirSync, statSync } from "fs"
import { join, dirname } from "path"

function findAllCssModuleFiles(dir: string, basePath: string) {
  const files: string[] = []
  const items = readdirSync(dir)

  for (const item of items) {
    const fullPath = join(dir, item)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...findAllCssModuleFiles(fullPath, basePath))
    } else if (item.endsWith(".module.css")) {
      files.push(fullPath.replace(basePath + "/", ""))
    }
  }

  return files
}

function extractClassNames(cssContent: string) {
  // Match all .className occurrences in selectors, including compound, pseudo, etc.
  const classRegex = /\.([a-zA-Z_][a-zA-Z0-9_-]*)/g
  const classes: Set<string> = new Set()
  let match

  while ((match = classRegex.exec(cssContent)) !== null) {
    classes.add(match[1])
  }

  return Array.from(classes)
}

function findTsxFilesImportingCssModule(cssModulePath: string, srcPath: string) {
  const cssDir = dirname(join(srcPath, cssModulePath))
  const cssFileName = cssModulePath.split("/").pop()
  const tsxFiles: string[] = []

  try {
    const items = readdirSync(cssDir)
    for (const item of items) {
      if (item.endsWith(".tsx")) {
        const tsxPath = join(cssDir, item)
        try {
          const tsxContent = readFileSync(tsxPath, "utf-8")
          if (tsxContent.includes(`from "./${cssFileName}"`)) {
            tsxFiles.push(tsxPath)
          }
        } catch {
          // Skip files that can't be read
        }
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }

  return tsxFiles
}

function checkClassUsageInTsx(tsxContent: string, className: string) {
  return tsxContent.includes(`styles.${className}`) || tsxContent.includes(`style.${className}`)
}

function extractReferencedClassNames(tsxContent: string) {
  const classes: Set<string> = new Set()

  // Match styles.className patterns
  const staticRegex = /styles\.([a-zA-Z_][a-zA-Z0-9_-]*)/g
  let match
  while ((match = staticRegex.exec(tsxContent)) !== null) {
    classes.add(match[1])
  }

  // Match styles[variable] patterns - extract from JSX
  const dynamicRegex = /styles\[([^\]]+)\]/g
  while ((match = dynamicRegex.exec(tsxContent)) !== null) {
    const variable = match[1].replace(/['"]/g, "")

    // If it's a string literal, add it directly
    if (/^['"]/.test(match[1])) {
      classes.add(variable)
    } else {
      // For variables like `name` in styles[name], try to find their possible values
      // Look for type definitions or string literals that might be the values
      const variablePattern = new RegExp(`${variable}.*?[=:].*?["']([^"']+)["']`, "g")
      let valueMatch
      while ((valueMatch = variablePattern.exec(tsxContent)) !== null) {
        classes.add(valueMatch[1])
      }
    }
  }

  return Array.from(classes)
}

const srcPath = join(process.cwd(), "src")
const cssModuleFiles = findAllCssModuleFiles(srcPath, process.cwd()).filter(file => !file.includes("Icon.module.css"))

describe("CSS Module Class Usage", () => {
  cssModuleFiles.forEach(cssModulePath => {
    it(`should use all classes from ${cssModulePath}`, () => {
      const fullCssPath = join(process.cwd(), cssModulePath)
      const cssContent = readFileSync(fullCssPath, "utf-8")
      const classNames = extractClassNames(cssContent)

      const tsxFiles = findTsxFilesImportingCssModule(cssModulePath, process.cwd())
      expect(tsxFiles.length).toBeGreaterThan(0)

      let combinedTsxContent = ""
      for (const tsxPath of tsxFiles) {
        combinedTsxContent += readFileSync(tsxPath, "utf-8") + "\n"
      }

      const unusedClasses = classNames.filter(className => !checkClassUsageInTsx(combinedTsxContent, className))

      if (unusedClasses.length > 0) {
        const message = `Unused CSS classes in ${cssModulePath}: ${unusedClasses.join(", ")}`
        expect(unusedClasses, message).toEqual([])
      }

      // Also check that all referenced classes exist in CSS module
      const referencedClasses = extractReferencedClassNames(combinedTsxContent)
      const missingClasses = referencedClasses.filter(className => !classNames.includes(className))

      if (missingClasses.length > 0) {
        const message = `Referenced CSS classes not found in ${cssModulePath}: ${missingClasses.join(", ")}`
        expect(missingClasses, message).toEqual([])
      }
    })
  })
})
