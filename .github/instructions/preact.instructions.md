---
applyTo: "**/*.tsx"
---

# Preact Conventions
- Favor functional style react components and use the function syntax instead of lambda syntax
- Extract props definitions with more than 2 members
- Capitalize component names to clearly distinguish them from HTML elements
- Keep components small and focused, following the single-responsibility principle
- Use hooks (e.g. useState, useEffect) for state and lifecycle management in functional components
- Utilize memoization (useMemo, useCallback) to prevent unnecessary re-renders
- Avoid inline functions in JSX props to maintain performance and readability
- Ensure accessibility by using semantic HTML and proper aria attributes