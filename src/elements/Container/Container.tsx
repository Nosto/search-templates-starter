import { JSX } from "preact/jsx-runtime"
import styles from "./Container.module.css"
import { cl } from "@nosto/search-js/utils"

type PaddingOption = "05" | "1" | "2" | "3" | "4" | "5" | "10" | "16"

type Props = {
  padding?: PaddingOption
} & JSX.IntrinsicElements["div"]

export default function Container({ className, padding, children, style, ...props }: Props) {
  const inlineStyle: JSX.CSSProperties = {}

  if (padding) {
    inlineStyle.padding = `var(--ns-space-${padding})`
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
