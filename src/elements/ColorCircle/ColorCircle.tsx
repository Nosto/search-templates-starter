import styles from "./ColorCircle.module.css"
import { cl } from "@nosto/search-js/utils"

type Props = {
  color: string
  className?: string
}

export default function ColorCircle({ color, className }: Props) {
  return (
    <span
      className={cl(styles.colorCircle, className)}
      style={{ backgroundColor: color }}
      aria-label={`Color: ${color}`}
    />
  )
}
