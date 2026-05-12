import { ComponentChildren } from "preact"

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type HeadingProps = {
  as?: HeadingLevel
  children: ComponentChildren
}

export default function Heading({ as = "h3", children }: HeadingProps) {
  const Tag = as
  return (
    <Tag className={"my-[var(--ns-space-2)] ml-0 mr-[var(--ns-space-1)] font-bold text-[var(--ns-color-black)]"}>
      {children}
    </Tag>
  )
}
