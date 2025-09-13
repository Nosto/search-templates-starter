import { JSX } from "preact/jsx-runtime"
import { cl } from "@nosto/search-js/utils"

type GridProps = {
  columns?: number | "auto-fit" | "auto-fill"
  gap?: "small" | "medium" | "large" | string
  alignItems?: "start" | "center" | "end" | "stretch"
  justifyItems?: "start" | "center" | "end" | "stretch"
} & JSX.IntrinsicElements["div"]

export default function Grid({
  className,
  children,
  columns = "auto-fit",
  gap = "medium",
  alignItems,
  justifyItems,
  style,
  ...props
}: GridProps) {
  const getGapValue = (gap: string): string => {
    const gapMap = {
      small: "0.5rem", // --ns-space-1 equivalent
      medium: "1rem", // --ns-space-2 equivalent
      large: "2rem" // --ns-space-4 equivalent
    }
    return gapMap[gap as keyof typeof gapMap] || gap
  }

  const customStyles: Record<string, string | undefined> = {
    display: "grid",
    gridTemplateColumns:
      typeof columns === "number" ? `repeat(${columns}, 1fr)` : `repeat(${columns}, minmax(200px, 1fr))`,
    gap: getGapValue(gap),
    alignItems,
    justifyItems
  }

  const gridStyle = Object.assign({}, style, customStyles)

  return (
    <div className={cl(className)} style={gridStyle} {...props}>
      {children}
    </div>
  )
}
