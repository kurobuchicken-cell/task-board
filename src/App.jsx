import { useState, useEffect } from 'react'
import styles from './App.module.css'

const STORAGE_KEY = 'task-board-tasks'
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    const text = input.trim()
    if (!text) return
    setTasks(prev => {
      const id = prev.length > 0 ? Math.max(...prev.map(t => t.id)) + 1 : 1
      return [...prev, { id, text, done: false }]
    })
    setInput('')
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className={styles.board}>
      <h1 className={styles.title}>タスクボード</h1>

      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="新しいタスクを入力..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.addButton} onClick={addTask}>
          追加
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className={styles.empty}>タスクがありません</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map(task => (
            <li key={task.id} className={`${styles.item} ${task.done ? styles.done : ''}`}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className={styles.text}>{task.text}</span>
              <button
                className={styles.deleteButton}
                onClick={() => deleteTask(task.id)}
                aria-label="削除"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className={styles.count}>
        {tasks.filter(t => !t.done).length} / {tasks.length} 件 未完了
      </p>
    </div>
  )
}
