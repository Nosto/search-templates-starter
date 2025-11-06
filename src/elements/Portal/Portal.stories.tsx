import type { Meta, StoryObj } from "@storybook/preact-vite"
import { useEffect } from "preact/hooks"

import Portal from "./Portal"

const meta: Meta<typeof Portal> = {
  title: "Elements/Portal",
  component: Portal,
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof Portal>

function PortalDemo({ replace }: { replace?: boolean }) {
  useEffect(() => {
    const targetElement = document.createElement("div")
    targetElement.id = "portal-demo-target"
    targetElement.style.cssText = `
      padding: 20px;
      margin: 20px 0;
      border: 2px dashed #007acc;
      border-radius: 8px;
      background-color: #f0f8ff;
    `
    targetElement.innerHTML = replace
      ? "<p style='color: #666; margin: 0;'>[Existing content will be replaced]</p>"
      : "<p style='color: #666; margin: 0;'>[Existing content - Portal will append below]</p>"

    document.body.appendChild(targetElement)

    return () => {
      targetElement.remove()
    }
  }, [replace])

  return (
    <div>
      <div style={{ padding: "20px", background: "#fff3cd", borderRadius: "8px", marginBottom: "20px" }}>
        <h3 style={{ margin: "0 0 10px 0" }}>Portal Source (Component Location)</h3>
        <p style={{ margin: 0 }}>This content is rendered here in the component tree.</p>
      </div>
      <Portal target="#portal-demo-target" replace={replace}>
        <div
          style={{
            padding: "15px",
            background: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "4px",
            color: "#155724"
          }}
        >
          <strong>Portal Content</strong>
          <p style={{ margin: "5px 0 0 0" }}>
            This content is rendered in the target element (blue dashed border box below).
          </p>
        </div>
      </Portal>
      <div style={{ padding: "20px", background: "#e7f3ff", borderRadius: "8px", marginTop: "20px" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
          <strong>Target Element Location:</strong> Look for the blue dashed border box with the portal content
          {replace ? " (existing content replaced)" : " (appended after existing content)"}.
        </p>
      </div>
    </div>
  )
}

export const AppendMode: Story = {
  render: () => <PortalDemo replace={false} />
}

export const ReplaceMode: Story = {
  render: () => <PortalDemo replace={true} />
}

export const DefaultBehavior: Story = {
  render: () => <PortalDemo />
}
