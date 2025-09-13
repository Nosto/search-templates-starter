import { JSX } from "preact/jsx-runtime"
import styles from "./Container.module.css"
import { cl } from "@nosto/search-js/utils"

type PaddingOption = "05" | "1" | "2" | "3" | "4" | "5" | "10" | "16"

type Props = {
  padding?: PaddingOption
} & JSX.IntrinsicElements["div"]

const paddingMap: Record<PaddingOption, string> = {
  "05": "var(--ns-space-05)",
  "1": "var(--ns-space-1)",
  "2": "var(--ns-space-2)",
  "3": "var(--ns-space-3)",
  "4": "var(--ns-space-4)",
  "5": "var(--ns-space-5)",
  "10": "var(--ns-space-10)",
  "16": "var(--ns-space-16)"
}

export default function Container({ className, padding, children, style, ...props }: Props) {
  const inlineStyle: JSX.CSSProperties = {}

  if (padding) {
    inlineStyle.padding = paddingMap[padding]
  }

  if (style) {
    Object.assign(inlineStyle, style)
  }

  return (
    <div className={cl(styles.container, className)} style={inlineStyle} {...props}>
      {children}
    </div>
  )
}
