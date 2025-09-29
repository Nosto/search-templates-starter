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
  const classRegex = /\.([a-zA-Z_][a-zA-Z0-9_-]*)\s*{/g
  const classes: string[] = []
  let match

  while ((match = classRegex.exec(cssContent)) !== null) {
    classes.push(match[1])
  }

  return classes
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

const srcPath = join(process.cwd(), "src")
const cssModuleFiles = findAllCssModuleFiles(srcPath, process.cwd())

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
    })
  })
})
