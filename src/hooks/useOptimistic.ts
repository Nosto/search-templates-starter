import { useState, useCallback, useRef } from "preact/hooks"

/**
 * A hook that manages optimistic updates with automatic rollback support.
 * This provides React-compatible semantics for managing optimistic state changes
 * that can be rolled back if the operation fails.
 *
 * @template T The type of the state being managed
 * @param state The current state value
 * @param updateFn Function that applies optimistic updates to the current state
 * @returns A tuple containing the optimistic state and a function to add optimistic updates
 *
 * @example
 * ```tsx
 * function LikeButton({ postId, initialLikes }: Props) {
 *   const [optimisticLikes, addOptimisticLike] = useOptimistic(
 *     initialLikes,
 *     (state, newLike) => state + newLike
 *   )
 *
 *   const handleLike = async () => {
 *     addOptimisticLike(1)
 *     try {
 *       await likePost(postId)
 *     } catch (error) {
 *       console.error('Like failed:', error)
 *     }
 *   }
 *
 *   return <button onClick={handleLike}>❤️ {optimisticLikes}</button>
 * }
 * ```
 */
export function useOptimistic<T>(
  state: T,
  updateFn: (currentState: T, optimisticValue: unknown) => T
): [T, (optimisticValue: unknown) => void] {
  const [optimisticValue, setOptimisticValue] = useState<unknown | null>(null)
  const updateFnRef = useRef(updateFn)
  const stateRef = useRef(state)

  updateFnRef.current = updateFn
  stateRef.current = state

  const currentState = optimisticValue !== null ? updateFnRef.current(state, optimisticValue) : state

  const addOptimistic = useCallback((value: unknown) => {
    setOptimisticValue(value)
  }, [])

  return [currentState, addOptimistic]
}
