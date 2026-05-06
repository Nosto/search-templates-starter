---
name: search-templates-preact
description: Project Preact component conventions for Search Templates Starter. Use when editing or creating TSX Preact components matching **/*.tsx, including components that read Nosto app state.
---

# Search Templates Preact

Apply these conventions when editing TSX components in this project.

## Component Conventions

- Favor functional Preact components and use function declarations instead of lambda syntax.
- Extract prop definitions when props have more than two members.
- Capitalize component names so they are clearly distinct from HTML elements.
- Keep components small and focused.
- Use hooks such as `useState` and `useEffect` for state and lifecycle behavior.
- Use `useMemo` and `useCallback` where memoization prevents meaningful unnecessary re-renders.
- Avoid inline functions in JSX props when a stable handler improves performance or readability.
- Use semantic HTML and proper ARIA attributes for accessibility.
- Use the most specific selector function for `useNostoAppState` to avoid unnecessary re-renders, for example `state => state.response?.redirect` instead of `state => state`.
