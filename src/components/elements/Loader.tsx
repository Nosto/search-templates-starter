export default function Loader({ className }: { className?: string } = {}) {
  return (
    <div className={`ns-loader-wrapper ns-d-flex ns-justify-content-center ns-align-items-center ${className}`}>
      <div className="ns-loader" />
    </div>
  )
}
