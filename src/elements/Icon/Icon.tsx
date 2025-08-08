import cl from "@/utils/cl"
import styles from "./Icon.module.css"

type Props = {
  name?: string
  className?: string
  flip?: "x" | "y"
}

export default function Icon({ name, className, flip }: Props = {}) {
  const iconClass = name ? styles[`icon-${name}`] : ""
  const iconFlip = flip ? styles[`flip-${flip}`] : ""
  return <i className={cl(styles.icon, iconClass, iconFlip, className)}></i>
}
