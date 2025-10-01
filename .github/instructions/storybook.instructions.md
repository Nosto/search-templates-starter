---
applyTo: "**/*.stories.tsx"
---

# Storybook Stories
- **ALWAYS** use actual components from the codebase in Storybook files instead of demo components
- Import the real component: `import ComponentName from "./ComponentName"`
- Set the Meta type to the actual component: `Meta<typeof ComponentName>`
- **Always include `tags: ["autodocs"]`** in the Meta configuration for automatic documentation generation
- **Skip argTypes usage** if they are related to component props - let Storybook infer types from TypeScript
- **Prefer typed object stories over function stories** - use `StoryObj<typeof Component>` approach consistently
- **Prefer args over render function** in storybook stories - use `args: {}` instead of `render: () => {}` when possible
- For components that depend on Nosto hooks/context that aren't available in Storybook:
  - Create a `MockedView` story that shows what the component would look like when properly integrated
  - Include documentation noting the component requires Nosto search context
  - Use inline styles for quick mockups rather than complex demo components
- Keep stories focused on demonstrating the actual component structure and behavior
- Avoid creating elaborate custom demo components that duplicate functionality
- **Never create functionally identical stories** - each story should demonstrate a unique state, behavior, or variation of the component