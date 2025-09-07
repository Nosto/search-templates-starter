import style from "./SectionHeader.module.css"

interface SectionHeaderProps {
  children: string
}

export default function SectionHeader({ children }: SectionHeaderProps) {
  return <div className={style.sectionHeader}>{children}</div>
}
