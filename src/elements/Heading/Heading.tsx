import { ComponentChildren } from "preact"
import style from "./Heading.module.css"

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type HeadingProps = {
  as?: HeadingLevel
  children: ComponentChildren
}

/**
 * A flexible heading component that can render as any HTML heading level (h1-h6).
 * Provides consistent styling across different heading levels while maintaining semantic HTML structure.
 *
 * @param as - The heading level to render as (h1, h2, h3, h4, h5, or h6). Defaults to h3 for balanced hierarchy
 * @param children - The text or content to display within the heading
 * @returns A heading element at the specified level with consistent styling
 */
export default function Heading({ as = "h3", children }: HeadingProps) {
  const Tag = as
  return <Tag className={style.heading}>{children}</Tag>
}
