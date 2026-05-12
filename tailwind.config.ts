import type { Config } from "tailwindcss"

export default {
  content: {
    relative: true,
    files: ["./index.html", "./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"]
  }
} satisfies Config
