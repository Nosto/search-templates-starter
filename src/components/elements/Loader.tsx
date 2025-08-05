import styles from "./Loader.module.css"

export default function Loader({ className }: { className?: string } = {}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.loader} />
    </div>
  )
}
