import type { Meta, StoryObj } from "@storybook/preact-vite"
import { h } from "preact"
import { useEffect } from "preact/hooks"
import { StoryFn } from "@storybook/preact-vite"
import Portal from "./Portal"

/**
 * Decorator that creates a target element for the Portal to render into
 */
function withPortalTarget(story: StoryFn) {
  return h(() => {
    useEffect(() => {
      const targetElement = document.createElement("div")
      targetElement.id = "portal-target"
      targetElement.style.cssText = `
        padding: 20px;
        margin: 20px 0;
        border: 2px dashed #007acc;
        border-radius: 8px;
        background-color: #f0f8ff;
        min-height: 60px;
      `
      document.body.appendChild(targetElement)

      return () => {
        targetElement.remove()
      }
    }, [])

    return h("div", {}, [
      h(
        "div",
        {
          style: {
            padding: "20px",
            background: "#fff3cd",
            borderRadius: "8px",
            marginBottom: "20px"
          }
        },
        [
          h("h3", { style: { margin: "0 0 10px 0" } }, "Portal Source (Component Location)"),
          h(
            "p",
            { style: { margin: 0 } },
            "The Portal component renders its children into the target element (blue dashed border box below) instead of here."
          )
        ]
      ),
      h(story, {}),
      h(
        "div",
        {
          style: {
            padding: "20px",
            background: "#e7f3ff",
            borderRadius: "8px",
            marginTop: "20px"
          }
        },
        [
          h(
            "p",
            {
              style: { margin: 0, fontSize: "14px", color: "#666" }
            },
            "⬆️ The content above appears in the blue dashed border box via the Portal, not in this location."
          )
        ]
      )
    ])
  }, {})
}

/**
 * Decorator that adds existing content to the portal target
 */
function withExistingContent(story: StoryFn) {
  return h(() => {
    useEffect(() => {
      const targetElement = document.getElementById("portal-target")
      if (targetElement) {
        targetElement.innerHTML = "<p style='color: #666; margin: 0 0 10px 0;'>[Existing content in target element]</p>"
      }
    }, [])

    return h(story, {})
  }, {})
}

const meta: Meta<typeof Portal> = {
  title: "Elements/Portal",
  component: Portal,
  tags: ["autodocs"],
  decorators: [withPortalTarget],
  argTypes: {
    target: {
      control: "text",
      description: "CSS selector for the target element"
    },
    replace: {
      control: "boolean",
      description: "If true, clears target element's existing content before rendering"
    },
    children: {
      control: false,
      description: "Content to render in the portal"
    }
  }
}

export default meta
type Story = StoryObj<typeof Portal>

export const Default: Story = {
  args: {
    target: "#portal-target",
    children: h(
      "div",
      {
        style: {
          padding: "15px",
          background: "#d4edda",
          border: "1px solid #c3e6cb",
          borderRadius: "4px",
          color: "#155724"
        }
      },
      [
        h("strong", {}, "Portal Content"),
        h("p", { style: { margin: "5px 0 0 0" } }, "This content is rendered in the target element via createPortal.")
      ]
    )
  }
}

export const AppendMode: Story = {
  args: {
    target: "#portal-target",
    replace: false,
    children: h(
      "div",
      {
        style: {
          padding: "15px",
          background: "#d4edda",
          border: "1px solid #c3e6cb",
          borderRadius: "4px",
          color: "#155724"
        }
      },
      [
        h("strong", {}, "New Portal Content"),
        h("p", { style: { margin: "5px 0 0 0" } }, "This is appended after existing content (default behavior).")
      ]
    )
  },
  decorators: [withExistingContent]
}

export const ReplaceMode: Story = {
  args: {
    target: "#portal-target",
    replace: true,
    children: h(
      "div",
      {
        style: {
          padding: "15px",
          background: "#ffeaa7",
          border: "1px solid #fdcb6e",
          borderRadius: "4px",
          color: "#6c5ce7"
        }
      },
      [
        h("strong", {}, "Replacement Content"),
        h("p", { style: { margin: "5px 0 0 0" } }, "This replaces any existing content in the target element.")
      ]
    )
  },
  decorators: [withExistingContent]
}
