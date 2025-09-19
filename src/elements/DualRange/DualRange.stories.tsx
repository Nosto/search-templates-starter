import type { Meta, StoryObj } from "@storybook/preact"
import { useState } from "preact/hooks"
import DualRange from "./DualRange"

const DualRangeWithState = (props: {
  min: number
  max: number
  value: [number | undefined, number | undefined]
  onChange?: (value: [number | undefined, number | undefined]) => void
  className?: string
  id?: string
}) => {
  const [internalValue, setInternalValue] = useState<[number | undefined, number | undefined]>(props.value)

  const handleChange = (newValue: [number | undefined, number | undefined]) => {
    setInternalValue(newValue)
    props.onChange?.(newValue)
  }

  return (
    <div style={{ width: "400px", padding: "20px" }}>
      <DualRange {...props} value={internalValue} onChange={handleChange} />
    </div>
  )
}

export default {
  title: "Elements/DualRange",
  component: DualRangeWithState,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: { type: "number" },
      description: "Minimum value of the range"
    },
    max: {
      control: { type: "number" },
      description: "Maximum value of the range"
    },
    value: {
      control: { type: "object" },
      description: "Current [min, max] values (use undefined for default min/max)"
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS class name"
    },
    id: {
      control: { type: "text" },
      description: "HTML id attribute"
    },
    onChange: {
      action: "changed",
      description: "Callback function when range values change"
    }
  }
} as Meta<typeof DualRangeWithState>

type Story = StoryObj<typeof DualRangeWithState>

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    value: [undefined, undefined]
  },
  parameters: {
    docs: {
      description: {
        story: "A basic dual range slider from 0 to 100."
      }
    }
  }
}

export const PriceRange: Story = {
  args: {
    min: 10,
    max: 500,
    value: [25, 75]
  },
  parameters: {
    docs: {
      description: {
        story: "A price range slider with initial values set."
      }
    }
  }
}

export const RatingRange: Story = {
  args: {
    min: 1,
    max: 5,
    value: [undefined, undefined]
  },
  parameters: {
    docs: {
      description: {
        story: "A rating range slider from 1 to 5 stars."
      }
    }
  }
}

export const WeightRange: Story = {
  args: {
    min: 0.1,
    max: 25.0,
    value: [undefined, undefined]
  },
  parameters: {
    docs: {
      description: {
        story: "A weight range slider with decimal values."
      }
    }
  }
}
