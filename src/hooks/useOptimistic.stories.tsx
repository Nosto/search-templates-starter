import type { Meta, StoryObj } from "@storybook/preact-vite"
import { useState } from "preact/hooks"
import { useOptimistic } from "./useOptimistic"

const meta = {
  title: "Hooks/useOptimistic",
  parameters: {
    docs: {
      description: {
        component:
          "A hook that manages optimistic updates with automatic rollback support. This provides React-compatible semantics for managing optimistic state changes that can be rolled back if the operation fails."
      }
    }
  },
  tags: ["autodocs"]
} as Meta

export default meta

type Story = StoryObj

function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [serverLikes, setServerLikes] = useState(initialLikes)
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    serverLikes,
    (state, newLike) => state + (newLike as number)
  )

  const handleLike = async () => {
    addOptimisticLike(1)

    await new Promise(resolve => setTimeout(resolve, 1000))
    setServerLikes(current => current + 1)
  }

  return (
    <div style={{ padding: "20px", fontFamily: "var(--ns-font-family)" }}>
      <button
        onClick={handleLike}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          border: "none",
          borderRadius: "8px",
          background: "#e91e63",
          color: "white",
          cursor: "pointer",
          transition: "background 0.2s"
        }}
        onMouseOver={e => (e.currentTarget.style.background = "#c2185b")}
        onMouseOut={e => (e.currentTarget.style.background = "#e91e63")}
        onFocus={e => (e.currentTarget.style.background = "#c2185b")}
        onBlur={e => (e.currentTarget.style.background = "#e91e63")}
      >
        ❤️ {optimisticLikes} Likes
      </button>
      <p style={{ marginTop: "16px", color: "#666" }}>
        Click to like! The UI updates immediately while the server processes your request.
      </p>
    </div>
  )
}

function TodoList() {
  type Todo = { id: number; text: string; completed: boolean }
  const [serverTodos, setServerTodos] = useState<Todo[]>([
    { id: 1, text: "Learn Preact", completed: false },
    { id: 2, text: "Build awesome apps", completed: false },
    { id: 3, text: "Ship to production", completed: false }
  ])

  const [optimisticTodos, toggleOptimisticTodo] = useOptimistic(serverTodos, (state, action) => {
    const { id } = action as { id: number }
    return state.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  })

  const handleToggle = async (id: number) => {
    toggleOptimisticTodo({ id })

    await new Promise(resolve => setTimeout(resolve, 800))
    setServerTodos(current => current.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  return (
    <div style={{ padding: "20px", fontFamily: "var(--ns-font-family)" }}>
      <h3 style={{ marginTop: 0 }}>Todo List</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {optimisticTodos.map(todo => (
          <li
            key={todo.id}
            style={{
              padding: "12px",
              marginBottom: "8px",
              background: "#f5f5f5",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              style={{ cursor: "pointer" }}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#999" : "#333"
              }}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
      <p style={{ color: "#666", fontSize: "14px" }}>Check items off your list. The UI updates instantly!</p>
    </div>
  )
}

function Counter() {
  const [serverCount, setServerCount] = useState(0)
  const [optimisticCount, incrementOptimistic] = useOptimistic(serverCount, (state, value) => state + (value as number))

  const handleIncrement = async (amount: number) => {
    incrementOptimistic(amount)

    await new Promise(resolve => setTimeout(resolve, 600))
    setServerCount(current => current + amount)
  }

  return (
    <div style={{ padding: "20px", fontFamily: "var(--ns-font-family)" }}>
      <h3 style={{ marginTop: 0 }}>Counter</h3>
      <div
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: "#2196f3",
          marginBottom: "20px",
          textAlign: "center"
        }}
      >
        {optimisticCount}
      </div>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button
          onClick={() => handleIncrement(1)}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            border: "1px solid #2196f3",
            borderRadius: "4px",
            background: "white",
            color: "#2196f3",
            cursor: "pointer"
          }}
        >
          +1
        </button>
        <button
          onClick={() => handleIncrement(5)}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            border: "1px solid #2196f3",
            borderRadius: "4px",
            background: "white",
            color: "#2196f3",
            cursor: "pointer"
          }}
        >
          +5
        </button>
        <button
          onClick={() => handleIncrement(10)}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            border: "1px solid #2196f3",
            borderRadius: "4px",
            background: "white",
            color: "#2196f3",
            cursor: "pointer"
          }}
        >
          +10
        </button>
      </div>
      <p style={{ marginTop: "16px", color: "#666", textAlign: "center" }}>
        Click any button to increment. The count updates immediately!
      </p>
    </div>
  )
}

export const LikeButtonExample: Story = {
  render: () => <LikeButton initialLikes={42} />,
  parameters: {
    docs: {
      description: {
        story:
          "A like button that shows optimistic updates. When clicked, the count increases immediately while the server request is processing."
      }
    }
  }
}

export const TodoListExample: Story = {
  render: () => <TodoList />,
  parameters: {
    docs: {
      description: {
        story:
          "A todo list that uses optimistic updates to toggle completion state. Items appear checked/unchecked instantly while the change is saved to the server."
      }
    }
  }
}

export const CounterExample: Story = {
  render: () => <Counter />,
  parameters: {
    docs: {
      description: {
        story:
          "A counter that demonstrates optimistic updates with different increment values. The count updates immediately when buttons are clicked."
      }
    }
  }
}
