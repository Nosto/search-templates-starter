import styles from "./Icon.module.css"

interface Props {
  name?: string
  className?: string
  flip?: "x" | "y"
}

export default function Icon({ name, className, flip }: Props = {}) {
  const iconClass = name ? styles[`icon-${name}`] : ""
  const iconFlip = flip ? styles[`flip-${flip}`] : ""
  return <i className={`${styles.icon} ${iconClass} ${iconFlip} ${className ?? ""}`}></i>
}
