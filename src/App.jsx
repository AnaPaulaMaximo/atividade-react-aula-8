import { useMemo, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import TaskList from './components/TaskList.jsx'
import { initialTasks } from './data/tasks.js'

const filters = ['Todas', 'A fazer', 'Concluídas']

function formattedDate() {
  return new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
}

export default function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('Todas')
  const [title, setTitle] = useState('')

  const visibleTasks = useMemo(() => tasks.filter((task) => {
    if (filter === 'A fazer') return !task.done
    if (filter === 'Concluídas') return task.done
    return true
  }), [tasks, filter])
  const completedCount = tasks.filter((task) => task.done).length
  const pendingCount = tasks.length - completedCount

  function addTask(event) {
    event.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle) return
    setTasks((current) => [...current, { id: Date.now(), title: cleanTitle, category: 'Pessoal', time: 'Hoje', done: false }])
    setTitle('')
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task))
  }

  function removeTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  return (
    <div className="app-shell" id="inicio">
      <Sidebar completedCount={completedCount} />
      <main className="main-content">
        <header className="topbar"><div className="breadcrumb">Minhas listas <span>/</span> <strong>Meu dia</strong></div><button className="help-button" aria-label="Ajuda">?</button></header>
        <section className="dashboard">
          <div className="date-line"><span className="sun-icon">☼</span>{formattedDate()}</div>
          <div className="heading-row"><div><h1>Meu dia</h1><p>Pequenos passos fazem grandes dias.</p></div><div className="weather"><span>☀</span><div><strong>24°</strong><small>Um dia bonito!</small></div></div></div>

          <div className="summary-grid">
            <article className="summary-card"><span className="summary-icon lavender">☷</span><div><span>Suas tarefas</span><strong>{tasks.length}</strong></div><span className="summary-caption">no total</span></article>
            <article className="summary-card"><span className="summary-icon peach">◷</span><div><span>Pendentes</span><strong>{pendingCount}</strong></div><span className="summary-caption">para hoje</span></article>
            <article className="summary-card"><span className="summary-icon mint">✓</span><div><span>Concluídas</span><strong>{completedCount}</strong></div><span className="summary-caption">muito bem!</span></article>
          </div>

          <section className="tasks-panel" aria-labelledby="tasks-heading">
            <div className="panel-heading"><div><h2 id="tasks-heading">Sua lista <span className="task-total">{visibleTasks.length}</span></h2><p>Um passo de cada vez ✨</p></div><button className="sort-button">☷ <span>Organizar</span></button></div>
            <form className="add-task" onSubmit={addTask}><span className="plus-icon">＋</span><input aria-label="Nome da nova tarefa" placeholder="Adicione uma tarefa..." value={title} onChange={(event) => setTitle(event.target.value)} /><button type="submit" disabled={!title.trim()}>Adicionar</button></form>
            <div className="filter-tabs" role="group" aria-label="Filtrar tarefas">{filters.map((item) => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}{item === 'Todas' && <span>{tasks.length}</span>}</button>)}</div>
            <TaskList tasks={visibleTasks} onToggle={toggleTask} onRemove={removeTask} />
            {tasks.length > 0 && <div className="list-footer"><span>Você está indo muito bem 🌷</span><span>{completedCount} de {tasks.length} concluídas</span></div>}
          </section>
          <footer className="page-footer">Um dia de cada vez. Você consegue! <span>✿</span></footer>
        </section>
      </main>
    </div>
  )
}
