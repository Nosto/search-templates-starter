import { JSX } from "preact/jsx-runtime"
import { useEffect, useRef } from "preact/hooks"
import "@nosto/web-components"
import cl from "@/utils/cl"
import styles from "./Campaign.module.css"

type CampaignProps = {
  placement?: string
  useTemplate?: boolean
  api?: string
  className?: string
  children?: JSX.Element | JSX.Element[]
} & Omit<JSX.IntrinsicElements["div"], "className">

/**
 * Campaign component wrapper for the nosto-campaign custom element.
 * Provides type-safe integration with Nosto's campaign rendering and product recommendation display.
 */
export default function Campaign({ placement, useTemplate, api, className, children, ...props }: CampaignProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current) return

    // Create the custom element
    const campaignElement = document.createElement("nosto-campaign")

    // Set attributes
    if (placement) {
      campaignElement.setAttribute("placement", placement)
    }
    if (useTemplate !== undefined) {
      campaignElement.setAttribute("use-template", useTemplate.toString())
    }
    if (api) {
      campaignElement.setAttribute("api", api)
    }

    // Apply className to the custom element
    if (className) {
      campaignElement.className = cl(styles.campaign, className)
    } else {
      campaignElement.className = styles.campaign
    }

    // Clear wrapper and append the custom element
    const wrapper = wrapperRef.current
    wrapper.innerHTML = ""
    wrapper.appendChild(campaignElement)

    // Note: Children are not handled in this implementation
    // Custom element content should be handled by the element itself or through templates

    return () => {
      if (wrapper) {
        wrapper.innerHTML = ""
      }
    }
  }, [placement, useTemplate, api, className, children])

  return (
    <div ref={wrapperRef} {...props}>
      {/* The custom element will be inserted here */}
    </div>
  )
}
