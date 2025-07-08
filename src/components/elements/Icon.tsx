export default function Icon({ name, className }: { name?: string; className?: string } = {}) {
  return <i className={`ns-icon ns-icon${name ? `-${name}` : ""} ${className ?? ""}`}></i>
}
