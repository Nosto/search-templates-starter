import { ComponentChildren } from "preact"
import { styles } from "./styles"

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type HeadingProps = {
  as?: HeadingLevel
  children: ComponentChildren
}

export default function Heading({ as = "h3", children }: HeadingProps) {
  const Tag = as
  return <Tag className={styles.heading}>{children}</Tag>
}
