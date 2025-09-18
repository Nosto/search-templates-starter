import type { Meta, StoryObj } from "@storybook/preact"
import { useState } from "preact/hooks"
import DualRange from "./DualRange"

export default {
  title: "Elements/DualRange",
  component: DualRange,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof DualRange>

type Story = StoryObj<typeof DualRange>

const DualRangeWithState = (props: {
  min: number
  max: number
  initialValue?: [number | undefined, number | undefined]
}) => {
  const [value, setValue] = useState<[number | undefined, number | undefined]>(
    props.initialValue || [undefined, undefined]
  )
  return <DualRange min={props.min} max={props.max} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: () => <DualRangeWithState min={0} max={100} />,
  parameters: {
    docs: {
      description: {
        story: "A basic dual range slider from 0 to 100."
      }
    }
  }
}

export const PriceRange: Story = {
  render: () => <DualRangeWithState min={10} max={500} initialValue={[25, 75]} />,
  parameters: {
    docs: {
      description: {
        story: "A price range slider with initial values set."
      }
    }
  }
}

export const RatingRange: Story = {
  render: () => <DualRangeWithState min={1} max={5} />,
  parameters: {
    docs: {
      description: {
        story: "A rating range slider from 1 to 5 stars."
      }
    }
  }
}

export const WeightRange: Story = {
  render: () => <DualRangeWithState min={0.1} max={25.0} />,
  parameters: {
    docs: {
      description: {
        story: "A weight range slider with decimal values."
      }
    }
  }
}
