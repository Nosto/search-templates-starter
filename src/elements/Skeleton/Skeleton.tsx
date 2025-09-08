import { cl } from "@nosto/search-js/utils"
import styles from "./Skeleton.module.css"

type Props = {
  width?: string | number
  height?: string | number
  className?: string
}

export default function Skeleton({ width, height, className }: Props = {}) {
  const style = {
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && { height: typeof height === "number" ? `${height}px` : height })
  }

  return (
    <div className={cl(styles.container, className)} style={style}>
      <div className={styles.image} />
      <div className={styles.content}>
        <div className={styles.lineFull} />
        <div className={styles.linePartial} />
      </div>
    </div>
  )
}
