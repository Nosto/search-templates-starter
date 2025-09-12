import type { Meta, StoryObj } from "@storybook/preact"
import Grid from "./Grid"

export default {
  title: "Elements/Grid",
  component: Grid,
  parameters: {
    layout: "padded"
  },
  tags: ["autodocs"]
} as Meta<typeof Grid>

type Story = StoryObj<typeof Grid>

// Helper component for demo content
const GridItem = ({ children, style }: { children: string; style?: React.CSSProperties }) => (
  <div
    style={{
      padding: "1rem",
      backgroundColor: "#f0f3f6",
      borderRadius: "4px",
      textAlign: "center",
      ...style
    }}
  >
    {children}
  </div>
)

export const Default: Story = {
  args: {
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
      </>
    )
  }
}

export const FixedColumns: Story = {
  args: {
    columns: 3,
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </>
    )
  }
}

export const SmallGap: Story = {
  args: {
    columns: 4,
    gap: "small",
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
      </>
    )
  }
}

export const LargeGap: Story = {
  args: {
    columns: 2,
    gap: "large",
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
      </>
    )
  }
}

export const CenteredItems: Story = {
  args: {
    columns: 3,
    alignItems: "center",
    justifyItems: "center",
    children: (
      <>
        <GridItem>Short</GridItem>
        <GridItem style={{ height: "80px" }}>Tall item with more content</GridItem>
        <GridItem>Medium content</GridItem>
      </>
    )
  }
}

export const AutoFill: Story = {
  args: {
    columns: "auto-fill",
    gap: "medium",
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
        <GridItem>Item 7</GridItem>
        <GridItem>Item 8</GridItem>
      </>
    )
  }
}

export const CustomGap: Story = {
  args: {
    columns: 2,
    gap: "2rem",
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
      </>
    )
  }
}
