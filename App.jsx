import { useMemo, useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check,
  ChevronDown, Code2, Cpu, ExternalLink, Filter, FlaskConical, Layers3,
  Menu, Search, ShieldCheck, Sparkles, Terminal, X, Zap
} from 'lucide-react'
import { categories, tools, useCases } from './data/tools.js'

const iconMap = { code: Code2, search: Search, book: BookOpen, cpu: Cpu, terminal: Terminal, layers: Layers3 }

function Logo() {
  return <Link className="brand" to="/" aria-label="TechGuide Lab home">
    <span className="brand-mark"><FlaskConical size={20} strokeWidth={2.2} /></span>
    <span>TechGuide <b>Lab</b><small>THE PRACTICAL AI DIRECTORY</small></span>
  </Link>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  return <header className="site-header">
    <div className="header-inner">
      <Logo />
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
        <Link className={location.pathname === '/' ? 'nav-link active' : 'nav-link'} to="/" onClick={() => setMenuOpen(false)}>Discover tools</Link>
        <Link className={location.pathname === '/use-cases' ? 'nav-link active' : 'nav-link'} to="/use-cases" onClick={() => setMenuOpen(false)}>Find by task</Link>
        <a className="nav-link" href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
      </nav>
      <a className="header-cta" href="https://chatgpt.com/" target="_blank" rel="noreferrer">Try ChatGPT <ArrowUpRight size={16} /></a>
    </div>
  </header>
}

function ToolLogo({ tool, large = false }) {
  return <span className={`tool-logo ${tool.accent} ${large ? 'tool-logo-large' : ''}`} aria-hidden="true">{tool.symbol}</span>
}

function ToolCard({ tool, index = 0 }) {
  return <article className="tool-card" style={{ '--delay': `${Math.min(index, 8) * 45}ms` }}>
    <div className="tool-card-top">
      <ToolLogo tool={tool} />
      <span className="category-pill">{tool.category}</span>
    </div>
    <div className="tool-maker">{tool.maker}</div>
    <h3><Link to={`/tools/${tool.id}`}>{tool.name}</Link></h3>
    <p className="tool-tagline">{tool.tagline}</p>
    <div className="card-footer">
      <span className="free-label"><span className="free-dot" /> Free access available</span>
      <Link className="circle-link" to={`/tools/${tool.id}`} aria-label={`View ${tool.name}`}><ArrowUpRight size={18} /></Link>
    </div>
  </article>
}

function ToolDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const tool = tools.find(item => item.id === id)
  if (!tool) return <main className="page-shell not-found"><div className="eyebrow">404 / TOOL NOT FOUND</div><h1>That tool isn't in our directory yet.</h1><Link className="button button-dark" to="/">Explore all tools <ArrowRight size={17} /></Link></main>
  const related = tools.filter(t => t.id !== tool.id && (t.category === tool.category || t.tags.some(tag => tool.tags.includes(tag)))).slice(0, 3)
  return <main className="page-shell detail-page">
    <button className="back-link" onClick={() => navigate(-1)}><ArrowLeft size={16} /> Back to discovery</button>
    <section className="detail-hero">
      <div className="detail-heading">
        <div className="detail-brand"><ToolLogo tool={tool} large /><div><span className="eyebrow">{tool.maker}</span><h1>{tool.name}</h1></div></div>
        <p className="detail-tagline">{tool.tagline}</p>
        <p className="detail-description">{tool.description}</p>
        <a className="button button-dark" href={tool.url} target="_blank" rel="noreferrer">Visit official website <ExternalLink size={17} /></a>
      </div>
      <aside className="free-panel">
        <span className="free-panel-icon"><Check size={18} /></span>
        <span className="eyebrow">PRICING SNAPSHOT</span>
        <h2>Free access available</h2>
        <p>{tool.freePlan}</p>
        <div className="fine-print"><ShieldCheck size={16} /> Free features and limits may change. Confirm details with the provider.</div>
      </aside>
    </section>
    <div className="detail-grid">
      <section className="content-panel">
        <div className="section-kicker">01 / WHAT IT'S GOOD FOR</div>
        <h2>Put it to work</h2>
        <ul className="check-list">{tool.bestFor.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul>
        <div className="section-kicker section-kicker-spaced">02 / TRY THESE TASKS</div>
        <div className="example-list">{tool.useCases.map((item, i) => <div className="example-row" key={item}><span>0{i + 1}</span><p>{item}</p></div>)}</div>
      </section>
      <aside className="content-panel limitation-panel">
        <div className="section-kicker">03 / GOOD TO KNOW</div>
        <h2>Know the limits</h2>
        <p>{tool.limitation}</p>
        <div className="notice-box"><ShieldCheck size={18} /><span>Use AI as a helper, not the final authority. Check important facts and test technical work.</span></div>
        <div className="tag-list">{tool.tags.map(tag => <span key={tag}>#{tag.replaceAll(' ', '')}</span>)}</div>
      </aside>
    </div>
    {related.length > 0 && <section className="related-section"><div className="section-heading"><div><div className="eyebrow">KEEP EXPLORING</div><h2>Tools worth comparing</h2></div><Link to="/" className="text-link">All tools <ArrowRight size={16} /></Link></div><div className="tool-grid related-grid">{related.map((t, i) => <ToolCard key={t.id} tool={t} index={i} />)}</div></section>}
  </main>
}

function UseCasesPage() {
  return <main className="page-shell usecase-page">
    <div className="eyebrow">A BETTER PLACE TO START</div>
    <h1>What are you trying to do?</h1>
    <p className="page-intro">Choose a task to see tools that can help. You don't need to know the AI product names first.</p>
    <div className="usecase-grid">{useCases.map((item, i) => {
      const Icon = iconMap[item.icon] || Sparkles
      return <article className="usecase-card" key={item.title}>
        <span className="usecase-icon"><Icon size={22} /></span>
        <span className="usecase-number">TASK 0{i + 1}</span>
        <h2>{item.title}</h2><p>{item.description}</p>
        <div className="usecase-tools">{item.tools.map(id => {
          const tool = tools.find(t => t.id === id)
          return tool ? <Link key={id} to={`/tools/${id}`}>{tool.name} <ArrowUpRight size={13} /></Link> : null
        })}</div>
      </article>
    })}</div>
  </main>
}

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All tools')
  const [showAll, setShowAll] = useState(false)
  const [sortBy, setSortBy] = useState('recommended')

  const filteredTools = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    let result = tools.filter(tool => {
      const matchesCategory = activeCategory === 'All tools' || tool.category === activeCategory
      const searchable = [tool.name, tool.maker, tool.category, tool.tagline, tool.description, ...tool.tags, ...tool.bestFor, ...tool.useCases].join(' ').toLowerCase()
      return matchesCategory && (!query || searchable.includes(query))
    })
    if (sortBy === 'az') result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [searchTerm, activeCategory, sortBy])

  const displayedTools = showAll || searchTerm || activeCategory !== 'All tools' ? filteredTools : filteredTools.slice(0, 8)

  function chooseCategory(category) {
    setActiveCategory(category)
    setShowAll(true)
  }

  return <main>
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-badge"><span className="badge-pulse" /> YOUR PRACTICAL AI TOOLKIT</div>
          <h1>Find the right AI.<br /><span>Do better work.</span></h1>
          <p className="hero-description">A clear, curated guide to useful AI tools for coding, research, engineering and learning — including what you can use for free.</p>
          <div className="hero-actions"><a className="button button-dark" href="#directory">Explore the directory <ArrowDownRight size={17} /></a><Link className="button button-light" to="/use-cases">Find tools by task <ArrowRight size={17} /></Link></div>
          <div className="hero-proof"><div className="avatar-stack"><span>AI</span><span>{'</>'}</span><span>⚙</span></div><p><b>Less hype. More useful.</b><br />Practical notes for real projects.</p></div>
        </div>
        <div className="hero-visual">
          <div className="visual-orbit orbit-one"></div><div className="visual-orbit orbit-two"></div>
          <div className="visual-center"><span className="visual-spark"><Sparkles size={28} /></span><span>AI</span><small>TOOLKIT</small></div>
          <div className="float-chip chip-chat"><span className="mini-mark mint-mark">✳</span><div><b>ChatGPT</b><small>Learn & build</small></div><span className="chip-check"><Check size={13} /></span></div>
          <div className="float-chip chip-code"><span className="mini-mark violet-mark">⌘</span><div><b>Copilot</b><small>Write better code</small></div></div>
          <div className="float-chip chip-research"><span className="mini-mark cyan-mark">⌕</span><div><b>Research</b><small>Find reliable sources</small></div></div>
          <div className="visual-caption"><span className="caption-dot"></span> A smarter starting point</div>
        </div>
      </div>
      <div className="hero-bottom"><span>BUILT FOR CURIOUS MINDS</span><div><span>Students</span><span>Developers</span><span>Builders</span><span>Problem-solvers</span></div></div>
    </section>

    <section className="directory-section page-shell" id="directory">
      <div className="section-heading directory-heading">
        <div><div className="eyebrow">THE DIRECTORY</div><h2>Meet your new toolkit.</h2><p>Useful tools, clearly explained. Start with the task, not the hype.</p></div>
        <div className="tool-count"><b>{tools.length.toString().padStart(2, '0')}</b><span>TOOLS TO<br />EXPLORE</span></div>
      </div>
      <div className="search-row">
        <label className="search-box"><Search size={19} /><input value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setShowAll(true) }} placeholder="Search tools, tasks, or skills..." aria-label="Search tools" />{searchTerm && <button onClick={() => setSearchTerm('')} aria-label="Clear search"><X size={16} /></button>}<kbd>⌘ K</kbd></label>
        <label className="sort-control"><Filter size={16} /><span className="sort-label">Sort</span><select value={sortBy} onChange={e => setSortBy(e.target.value)} aria-label="Sort tools"><option value="recommended">Recommended</option><option value="az">A to Z</option></select><ChevronDown size={14} /></label>
      </div>
      <div className="category-row" role="group" aria-label="Filter by category">
        {categories.map(category => <button key={category} className={activeCategory === category ? 'category-button selected' : 'category-button'} onClick={() => chooseCategory(category)}>{category}{category === 'All tools' && <span>{tools.length}</span>}</button>)}
      </div>
      <div className="results-line"><span>{filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found</span><span>Independent guide · No account needed</span></div>
      {displayedTools.length ? <div className="tool-grid">{displayedTools.map((tool, i) => <ToolCard key={tool.id} tool={tool} index={i} />)}</div> : <div className="empty-state"><Search size={28} /><h3>No tools found</h3><p>Try another search or clear your category filter.</p><button className="button button-dark" onClick={() => { setSearchTerm(''); setActiveCategory('All tools'); setShowAll(false) }}>Reset filters</button></div>}
      {!showAll && filteredTools.length > displayedTools.length && <div className="load-more-wrap"><button className="button button-outline" onClick={() => setShowAll(true)}>Explore all {filteredTools.length} tools <ArrowRight size={17} /></button></div>}
    </section>

    <section className="usecase-band">
      <div className="page-shell usecase-band-inner">
        <div className="usecase-intro"><div className="eyebrow eyebrow-light">START WITH YOUR GOAL</div><h2>Not sure which tool<br />you need?</h2><p>Tell us what you're working on. We'll point you toward a useful place to start.</p><Link to="/use-cases" className="button button-white">Find by task <ArrowRight size={17} /></Link></div>
        <div className="quick-tasks">{useCases.slice(0, 4).map((item, i) => { const Icon = iconMap[item.icon] || Zap; return <Link className="quick-task" to="/use-cases" key={item.title}><span className="quick-task-icon"><Icon size={19} /></span><span><b>{item.title}</b><small>{item.description}</small></span><ArrowUpRight size={17} className="quick-arrow" /></Link> })}</div>
      </div>
    </section>

    <section className="how-section page-shell" id="how-it-works">
      <div className="section-heading"><div><div className="eyebrow">OUR APPROACH</div><h2>Clarity over complexity.</h2><p>AI should help you get moving, not make things more confusing.</p></div></div>
      <div className="principle-grid">
        <article><span className="principle-icon"><Search size={21} /></span><span className="principle-no">01</span><h3>Find what fits</h3><p>Search by tool, task, or the problem you're trying to solve.</p></article>
        <article><span className="principle-icon"><BookOpen size={21} /></span><span className="principle-no">02</span><h3>Understand the trade-offs</h3><p>Know what a tool does and where its free plan has limits.</p></article>
        <article><span className="principle-icon"><ShieldCheck size={21} /></span><span className="principle-no">03</span><h3>Verify before you trust</h3><p>Check important claims, especially in code and engineering.</p></article>
      </div>
    </section>
  </main>
}

function Footer() {
  return <footer className="site-footer"><div className="footer-main page-shell"><Logo /><p>A practical starting point for exploring AI tools.<br />Built for people who want to learn, make and solve.</p><div className="footer-links"><Link to="/">Discover</Link><Link to="/use-cases">Use cases</Link><a href="https://chatgpt.com/" target="_blank" rel="noreferrer">ChatGPT <ArrowUpRight size={13} /></a></div></div><div className="footer-bottom page-shell"><span>© {new Date().getFullYear()} TechGuide Lab</span><span>Independent directory · No database · No account required</span><span>Free-plan details can change; verify with providers.</span></div></footer>
}

export default function App() {
  const location = useLocation()
  return <div className="app-shell" key={location.pathname}>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tools/:id" element={<ToolDetail />} />
      <Route path="/use-cases" element={<UseCasesPage />} />
      <Route path="*" element={<main className="page-shell not-found"><div className="eyebrow">404 / PAGE NOT FOUND</div><h1>Looks like this page wandered off.</h1><Link className="button button-dark" to="/">Back to TechGuide Lab <ArrowRight size={17} /></Link></main>} />
    </Routes>
    <Footer />
  </div>
}
