import { useState, useEffect, useRef } from "preact/hooks"
import { nostojs } from "@nosto/nosto-js"
import styles from "./NostoCampaign.module.css"

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

        // Get the Nosto API instance
        const api = await new Promise(nostojs)

        // Create a recommendation request for the placement
        const request = api
          .createRecommendationRequest({ includeTagging: true })
          .disableCampaignInjection()
          .setElements([placement])
          .setResponseMode("HTML")

        // Fetch the placement result
        const { recommendations } = await request.load()

        if (recommendations && recommendations[placement] && containerRef.current) {
          const campaign = recommendations[placement]

          // Handle different campaign result types
          if (typeof campaign === "string") {
            // Direct HTML string injection
            containerRef.current.innerHTML = campaign
          } else if (campaign && typeof campaign === "object" && "html" in campaign) {
            // AttributedCampaignResult - use the placements API
            await api.placements.injectCampaigns({ [placement]: campaign }, { [placement]: containerRef.current })
          } else {
            // For JSONResult or other types, handle as HTML if possible
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
      <div className={styles.container} data-nosto-error>
        <div className={styles.error}>{error}</div>
      </div>
    )
  }

  return (
    <div className={styles.container} data-nosto-placement={placement} data-loading={loading}>
      {loading && <div className={styles.loading}>Loading campaign...</div>}
      <div ref={containerRef} className={styles.content} />
    </div>
  )
}
