import styles from "./Icon.module.css"

export default function Icon({ name, className, flip }: { name?: string; className?: string; flip?: "x" | "y" } = {}) {
  const iconClass = name ? styles[`icon-${name}`] : ""
  const iconFlip = flip ? styles[`flip-${flip}`] : ""
  return <i className={`${styles.icon} ${iconClass} ${iconFlip} ${className ?? ""}`} aria-hidden="true"></i>
}
