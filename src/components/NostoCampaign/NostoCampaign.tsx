import { useState, useEffect, useRef } from "preact/hooks"
import { nostojs } from "@nosto/nosto-js"

type Props = {
  placement: string
}

export default function NostoCampaign({ placement }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!placement || placement.trim() === "") {
      setError("Placement prop is required")
      return
    }

    const loadCampaign = async () => {
      try {
        setLoading(true)
        setError(null)

        const api = await new Promise(nostojs)

        const request = api
          .createRecommendationRequest({ includeTagging: true })
          .disableCampaignInjection()
          .setElements([placement])
          .setResponseMode("HTML")

        const { recommendations } = await request.load()

        if (recommendations && recommendations[placement] && containerRef.current) {
          const campaign = recommendations[placement]

          if (typeof campaign === "string") {
            containerRef.current.innerHTML = campaign
          } else if (campaign && typeof campaign === "object" && "html" in campaign) {
            containerRef.current.innerHTML = campaign.html
          } else {
            if (campaign && typeof campaign === "object" && "result" in campaign && campaign.result) {
              containerRef.current.innerHTML = JSON.stringify(campaign.result)
            }
          }
        }
      } catch (err) {
        console.error("Failed to load Nosto campaign:", err)
        setError("Failed to load campaign")
      } finally {
        setLoading(false)
      }
    }

    loadCampaign()
  }, [placement])

  if (error) {
    return (
      <div data-nosto-error>
        <div>{error}</div>
      </div>
    )
  }

  return (
    <div data-nosto-placement={placement} data-loading={loading}>
      {loading && <div>Loading campaign...</div>}
      <div ref={containerRef} />
    </div>
  )
}
