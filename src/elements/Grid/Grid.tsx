import { JSX } from "preact/jsx-runtime"
import styles from "./Grid.module.css"
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
  const customStyles: Record<string, string | undefined> = {
    "--ns-grid-columns":
      typeof columns === "number" ? `repeat(${columns}, 1fr)` : `repeat(${columns}, minmax(200px, 1fr))`,
    "--ns-grid-gap":
      typeof gap === "string" && ["small", "medium", "large"].includes(gap) ? `var(--ns-grid-gap-${gap})` : gap,
    "--ns-grid-align-items": alignItems,
    "--ns-grid-justify-items": justifyItems
  }

  const gridStyle = Object.assign({}, style, customStyles)

  return (
    <div className={cl(styles.grid, className)} style={gridStyle} {...props}>
      {children}
    </div>
  )
}
