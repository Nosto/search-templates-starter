import { useState, useEffect, useRef } from "preact/hooks"
import { nostojs } from "@nosto/nosto-js"
import type { AttributedCampaignResult } from "@nosto/nosto-js/client"

type Props = {
  placement: string
}

export default function NostoCampaign({ placement }: Props) {
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!placement || placement.trim() === "") {
      setError("Placement prop is required")
      return
    }

    const loadCampaign = async () => {
      try {
        setError(null)

        const api = await new Promise(nostojs)

        const request = api
          .createRecommendationRequest({ includeTagging: true })
          .setElements([placement])
          .setResponseMode("HTML")

        const { recommendations } = await request.load()

        if (recommendations && recommendations[placement] && containerRef.current) {
          const campaign = recommendations[placement]

          await api.placements.injectCampaigns(
            { [placement]: campaign as string | AttributedCampaignResult },
            { [placement]: containerRef.current }
          )
        }
      } catch (err) {
        console.error("Failed to load Nosto campaign:", err)
        setError("Failed to load campaign")
      }
    }

    loadCampaign()
  }, [placement])

  if (error) {
    return error
  }

  return <div ref={containerRef} />
}
