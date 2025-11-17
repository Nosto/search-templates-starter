import { useState, useEffect } from "preact/hooks"

const NO_OPTIMISTIC_UPDATE = Symbol("no-optimistic-update")

/**
 * A hook that manages optimistic updates with React-compatible semantics.
 * When the parent state changes, the optimistic update is automatically cleared
 * and the hook returns the new base state.
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
export function useOptimistic<T, OptimisticT = unknown>(
  state: T,
  updateFn: (currentState: T, optimisticValue: OptimisticT) => T
): [T, (optimisticValue: OptimisticT) => void] {
  const [optimisticValue, setOptimisticValue] = useState<unknown | typeof NO_OPTIMISTIC_UPDATE>(NO_OPTIMISTIC_UPDATE)

  useEffect(() => {
    setOptimisticValue(NO_OPTIMISTIC_UPDATE)
  }, [state])

  const currentState = optimisticValue !== NO_OPTIMISTIC_UPDATE ? updateFn(state, optimisticValue) : state

  return [currentState, setOptimisticValue]
}
