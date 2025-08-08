import styles from "./Loader.module.css"

interface Props {
  className?: string
}

export default function Loader({ className }: Props = {}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.loader} />
    </div>
  )
}
