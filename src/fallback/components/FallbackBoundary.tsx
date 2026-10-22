import { ComponentChildren } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"
import { FallbackDetails, onFallback } from "@/config"

type Props = {
  pageType: FallbackDetails["pageType"]
  children: ComponentChildren
}

/**
 * Error boundary that falls back to native content when the template fails to render
 */
export default function FallbackBoundary({ pageType, children }: Props) {
  const [error] = useErrorBoundary()

  useEffect(() => {
    if (error) {
      onFallback({ reason: error, pageType })
    }
  }, [error, pageType])

  return error ? null : <>{children}</>
}
