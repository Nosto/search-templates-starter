import type { Meta, StoryObj } from "@storybook/preact"
import { RovingFocusGroup, RovingFocusItem } from "./index"

const meta: Meta<typeof RovingFocusGroup> = {
  title: "Components/RovingFocus",
  component: RovingFocusGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
RovingFocus provides keyboard navigation support for a group of focusable items.
Use arrow keys to navigate between items. Supports horizontal, vertical, and both orientations.

**Usage:**
- Wrap focusable items with RovingFocusGroup
- Use RovingFocusItem for each focusable element
- Navigate with arrow keys (direction depends on orientation)
- Click or use Enter/Space to activate items
        `
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof RovingFocusGroup>

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    loop: true,
    children: (
      <>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          Item 1
        </RovingFocusItem>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          Item 2
        </RovingFocusItem>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          Item 3
        </RovingFocusItem>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          Item 4
        </RovingFocusItem>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Use Left/Right arrow keys to navigate horizontally between items."
      }
    }
  }
}

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    loop: true,
    children: (
      <>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "block",
            width: "120px"
          }}
        >
          Item 1
        </RovingFocusItem>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "block",
            width: "120px"
          }}
        >
          Item 2
        </RovingFocusItem>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "block",
            width: "120px"
          }}
        >
          Item 3
        </RovingFocusItem>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "block",
            width: "120px"
          }}
        >
          Item 4
        </RovingFocusItem>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Use Up/Down arrow keys to navigate vertically between items."
      }
    }
  }
}

export const Both: Story = {
  args: {
    orientation: "both",
    loop: true,
    children: (
      <>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          Item 1
        </RovingFocusItem>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          Item 2
        </RovingFocusItem>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          Item 3
        </RovingFocusItem>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          Item 4
        </RovingFocusItem>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Use any arrow key (Up/Down/Left/Right) to navigate between items."
      }
    }
  }
}

export const NoLoop: Story = {
  args: {
    orientation: "horizontal",
    loop: false,
    children: (
      <>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          First
        </RovingFocusItem>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          Middle
        </RovingFocusItem>
        <RovingFocusItem
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "inline-block"
          }}
        >
          Last
        </RovingFocusItem>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "When loop is false, navigation stops at the first and last items instead of wrapping around."
      }
    }
  }
}

export const WithClickHandlers: Story = {
  args: {
    orientation: "horizontal",
    loop: true,
    children: (
      <>
        <RovingFocusItem
          onClick={() => alert("Button 1 clicked!")}
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #007bff",
            borderRadius: "4px",
            display: "inline-block",
            backgroundColor: "#e7f3ff"
          }}
        >
          Click me!
        </RovingFocusItem>
        <RovingFocusItem
          onClick={() => alert("Button 2 clicked!")}
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #28a745",
            borderRadius: "4px",
            display: "inline-block",
            backgroundColor: "#e8f5e8"
          }}
        >
          Or me!
        </RovingFocusItem>
        <RovingFocusItem
          onClick={() => alert("Button 3 clicked!")}
          style={{
            padding: "8px 16px",
            margin: "4px",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            display: "inline-block",
            backgroundColor: "#fff8e1"
          }}
        >
          Or even me!
        </RovingFocusItem>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Items can have onClick handlers. Use Enter or Space to activate the focused item, or click with mouse."
      }
    }
  }
}
