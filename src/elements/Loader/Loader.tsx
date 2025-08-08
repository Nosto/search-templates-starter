import styles from "./Loader.module.css"

interface LoaderProps {
  className?: string
}

export default function Loader({ className }: LoaderProps = {}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.loader} />
    </div>
  )
}
