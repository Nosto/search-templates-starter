---
name: search-templates-storybook
description: Project Storybook story conventions for Search Templates Starter. Use when editing or creating Storybook files matching **/*.stories.tsx, especially stories for real Preact components.
---

# Search Templates Storybook

Apply these conventions when editing Storybook stories in this project.

## Story Structure

- Use actual components from the codebase instead of demo components.
- Import the real component, for example `import ComponentName from "./ComponentName"`.
- Set the Meta type to the actual component with `Meta<typeof ComponentName>`.
- Always include `tags: ["autodocs"]` in Meta configuration.
- Skip `argTypes` for component props when Storybook can infer them from TypeScript.
- Prefer typed object stories with `StoryObj<typeof Component>`.
- Prefer `args: {}` over a `render` function when possible.
- Keep stories focused on actual component structure and behavior.
- Avoid elaborate custom demo components that duplicate real functionality.
- Never create functionally identical stories; each story should demonstrate a unique state, behavior, or variation.

## Nosto Context

For components that depend on Nosto hooks or context unavailable in Storybook:

- Create a `MockedView` story that shows the expected integrated appearance.
- Include documentation noting that the component requires Nosto search context.
- Use inline styles for quick mockups instead of complex demo components.
