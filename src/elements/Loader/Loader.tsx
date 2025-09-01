import { cl } from "@nosto/search-js/utils"
import styles from "./Loader.module.css"

type Props = {
  className?: string
}

export default function Loader({ className }: Props = {}) {
  return (
    <div className={cl(styles.wrapper, className)}>
      <div className={styles.loader} />
    </div>
  )
}
