import TaskItem from './TaskItem.jsx'

export default function TaskList({ tasks, onToggle, onRemove }) {
  if (tasks.length === 0) {
    return <div className="empty-state"><span>✦</span><strong>Tudo em dia!</strong><p>Adicione uma tarefa para começar a organizar seu dia.</p></div>
  }

  return <ul className="task-list">{tasks.map((task) => <TaskItem key={task.id} task={task} onToggle={onToggle} onRemove={onRemove} />)}</ul>
}
