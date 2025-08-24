import type { Meta, StoryObj } from "@storybook/preact"
import { h } from "preact"
import Icon, { type IconName } from "./Icon"

const meta: Meta<typeof Icon> = {
  title: "Elements/Icon",
  component: Icon,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: [
        "close",
        "arrow",
        "arrow-left",
        "arrow-right",
        "arrow-up",
        "arrow-down",
        "search",
        "page-prev",
        "page-next",
        "filter"
      ],
      description: "Icon name to display"
    },
    className: {
      control: "text",
      description: "Additional CSS classes"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: "search"
  }
}

export const All: Story = {
  render: () => {
    const iconNames: IconName[] = [
      "close",
      "arrow",
      "arrow-left",
      "arrow-right",
      "arrow-up",
      "arrow-down",
      "search",
      "page-prev",
      "page-next",
      "filter"
    ]

    return h(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
          gap: "16px",
          alignItems: "center",
          justifyItems: "center"
        }
      },
      iconNames.map(name =>
        h(
          "div",
          {
            key: name,
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px"
            }
          },
          [h(Icon, { name }), h("span", { style: { fontSize: "12px", textAlign: "center" } }, name)]
        )
      )
    )
  },
  parameters: {
    controls: { disable: true }
  }
}
