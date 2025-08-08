import styles from "./Loader.module.css"

type Props = {
  className?: string
}

export default function Loader({ className }: Props = {}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.loader} />
    </div>
  )
}
