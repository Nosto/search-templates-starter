import { useState, useEffect, useRef } from "preact/hooks"
import { nostojs } from "@nosto/nosto-js"
import type { AttributedCampaignResult } from "@nosto/nosto-js/client"

type Props = {
  placement: string
}

function useCampaign(placement: string) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [campaignData, setCampaignData] = useState<string | AttributedCampaignResult | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!placement || placement.trim() === "") {
      setError("Placement prop is required")
      setIsLoading(false)
      return
    }

    const loadCampaign = async () => {
      try {
        setError(null)
        setIsLoading(true)

        const api = await new Promise(nostojs)

        const request = api
          .createRecommendationRequest({ includeTagging: true })
          .setElements([placement])
          .setResponseMode("HTML")

        const { recommendations } = await request.load()

        if (recommendations && recommendations[placement]) {
          const campaign = recommendations[placement]
          setCampaignData(campaign as string | AttributedCampaignResult)
        }
      } catch (err) {
        console.error("Failed to load Nosto campaign:", err)
        setError("Failed to load campaign")
      } finally {
        setIsLoading(false)
      }
    }

    loadCampaign()
  }, [placement])

  useEffect(() => {
    if (campaignData && containerRef.current) {
      const injectCampaign = async () => {
        try {
          const api = await new Promise(nostojs)
          await api.placements.injectCampaigns({ [placement]: campaignData }, { [placement]: containerRef.current! })
        } catch (err) {
          console.error("Failed to inject campaign:", err)
        }
      }
      injectCampaign()
    }
  }, [campaignData, placement])

  return { error, isLoading, containerRef, hasCampaign: !!campaignData }
}

export default function Campaign({ placement }: Props) {
  const { error, isLoading, containerRef, hasCampaign } = useCampaign(placement)

  if (error) {
    return error
  }

  if (isLoading) {
    return null
  }

  if (!hasCampaign) {
    return null
  }

  return <div ref={containerRef} />
}
