import iconStyle from "../../styles/elements/icon.module.css"

export default function Icon({ name, className }: { name?: string; className?: string } = {}) {
  const iconClass = name ? iconStyle[`icon-${name}`] : ""
  return <i className={`${iconStyle.icon} ${iconClass} ${className ?? ""}`}></i>
}
