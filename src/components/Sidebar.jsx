const links = [
  { icon: '▦', label: 'Meu dia', active: true, count: '4' },
  { icon: '▤', label: 'Importante' },
  { icon: '▧', label: 'Planejado' },
  { icon: '⌂', label: 'Tarefas' },
]

export default function Sidebar({ completedCount }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#inicio" aria-label="Organiza, início">
        <span className="brand-mark">o</span><span>organiza<span className="brand-dot">.</span></span>
      </a>
      <div className="profile">
        <div className="avatar">A</div>
        <div><strong>Olá, Ana!</strong><span>Vamos organizar o dia?</span></div>
        <button className="icon-button profile-menu" aria-label="Opções do perfil">···</button>
      </div>
      <nav aria-label="Navegação principal">
        <p className="nav-caption">MENU</p>
        {links.map((link) => (
          <a className={`nav-link ${link.active ? 'active' : ''}`} href={`#${link.label.toLowerCase().replaceAll(' ', '-')}`} key={link.label}>
            <span className="nav-icon">{link.icon}</span><span>{link.label}</span>
            {link.label === 'Meu dia' && <span className="nav-count">{link.count}</span>}
          </a>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="week-card">
          <span className="week-icon">✦</span>
          <div><strong>Bom trabalho!</strong><span>{completedCount} tarefa{completedCount === 1 ? '' : 's'} concluída{completedCount === 1 ? '' : 's'} hoje</span></div>
        </div>
        <span className="sidebar-note">Feito com carinho <span>♥</span></span>
      </div>
    </aside>
  )
}
