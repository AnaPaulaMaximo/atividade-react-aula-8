import { categoryColors } from '../data/tasks.js'

export default function TaskItem({ task, onToggle, onRemove }) {
  return (
    <li className={`task-item ${task.done ? 'is-done' : ''}`}>
      <button className="check-button" onClick={() => onToggle(task.id)} aria-label={task.done ? `Reabrir ${task.title}` : `Concluir ${task.title}`}>
        {task.done && <span>✓</span>}
      </button>
      <div className="task-copy"><span className="task-title">{task.title}</span><span className={`category ${categoryColors[task.category] || 'purple'}`}>{task.category}</span></div>
      <time className="task-time">{task.time}</time>
      <button className="remove-button" onClick={() => onRemove(task.id)} aria-label={`Remover ${task.title}`}>×</button>
    </li>
  )
}
