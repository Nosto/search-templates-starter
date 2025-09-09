import style from "./SectionHeader.module.css"

type SectionHeaderProps = {
  children: string
}

export default function SectionHeader({ children }: SectionHeaderProps) {
  return <div className={style.sectionHeader}>{children}</div>
}
