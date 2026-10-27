import { useMemo, useState } from 'react'
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  ExternalLink,
  Filter,
  FlaskConical,
  Layers3,
  Mail,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Zap,
} from 'lucide-react'

import { categories, tools, useCases } from './data/tools.js'

const CONTACT_EMAIL = 'vangurijashwanth2@gmail.com'

const iconMap = {
  code: Code2,
  search: Search,
  book: BookOpen,
  cpu: Cpu,
  terminal: Terminal,
  layers: Layers3,
}

function asArray(value) {
  return Array.isArray(value) ? value : []
}

function Logo() {
  return (
    <Link className="brand" to="/" aria-label="TechGuide Lab home">
      <span className="brand-mark">
        <FlaskConical size={20} strokeWidth={2.2} />
      </span>
      <span>
        TechGuide <b>Lab</b>
        <small>THE PRACTICAL AI DIRECTORY</small>
      </span>
    </Link>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <Link
            className={
              location.pathname === '/' ? 'nav-link active' : 'nav-link'
            }
            to="/"
            onClick={closeMenu}
          >
            Discover tools
          </Link>

          <Link
            className={
              location.pathname === '/use-cases'
                ? 'nav-link active'
                : 'nav-link'
            }
            to="/use-cases"
            onClick={closeMenu}
          >
            Find by task
          </Link>

          <a
            className="nav-link"
            href="/#how-it-works"
            onClick={closeMenu}
          >
            How it works
          </a>
        </nav>

        <a
          className="header-cta"
          href="https://chatgpt.com/"
          target="_blank"
          rel="noreferrer"
        >
          Try ChatGPT <ArrowUpRight size={16} />
        </a>
      </div>
    </header>
  )
}

function ToolLogo({ tool, large = false }) {
  return (
    <span
      className={`tool-logo ${tool.accent || ''} ${
        large ? 'tool-logo-large' : ''
      }`}
      aria-hidden="true"
    >
      {tool.symbol || 'AI'}
    </span>
  )
}

function ToolCard({ tool, index = 0 }) {
  return (
    <article
      className="tool-card"
      style={{ '--delay': `${Math.min(index, 8) * 45}ms` }}
    >
      <div className="tool-card-top">
        <ToolLogo tool={tool} />
        <span className="category-pill">{tool.category || 'AI Tools'}</span>
      </div>

      <div className="tool-maker">{tool.maker || 'AI Tool Provider'}</div>

      <h3>
        <Link to={`/tools/${tool.id}`}>{tool.name}</Link>
      </h3>

      <p className="tool-tagline">
        {tool.tagline || tool.description || 'Explore this useful AI tool.'}
      </p>

      <div className="card-footer">
        <span className="free-label">
          <span className="free-dot" />
          Free access available
        </span>

        <Link
          className="circle-link"
          to={`/tools/${tool.id}`}
          aria-label={`View ${tool.name}`}
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  )
}

function ToolDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const tool = tools.find((item) => item.id === id)

  if (!tool) {
    return (
      <main className="page-shell not-found">
        <div className="eyebrow">404 / TOOL NOT FOUND</div>
        <h1>That tool isn't in our directory yet.</h1>
        <Link className="button button-dark" to="/">
          Explore all tools <ArrowRight size={17} />
        </Link>
      </main>
    )
  }

  const toolTags = asArray(tool.tags)

  const related = tools
    .filter((item) => {
      if (item.id === tool.id) return false

      const sameCategory = item.category === tool.category

      const sharedTag = asArray(item.tags).some((tag) =>
        toolTags.includes(tag)
      )

      return sameCategory || sharedTag
    })
    .slice(0, 3)

  return (
    <main className="page-shell detail-page">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back to discovery
      </button>

      <section className="detail-hero">
        <div className="detail-heading">
          <div className="detail-brand">
            <ToolLogo tool={tool} large />

            <div>
              <span className="eyebrow">
                {tool.maker || 'AI Tool Provider'}
              </span>
              <h1>{tool.name}</h1>
            </div>
          </div>

          <p className="detail-tagline">
            {tool.tagline || 'Explore this AI tool.'}
          </p>

          <p className="detail-description">
            {tool.description || 'Explore the official website for details.'}
          </p>

          <a
            className="button button-dark"
            href={tool.url || 'https://chatgpt.com/'}
            target="_blank"
            rel="noreferrer"
          >
            Visit official website <ExternalLink size={17} />
          </a>
        </div>

        <aside className="free-panel">
          <span className="free-panel-icon">
            <Check size={18} />
          </span>

          <span className="eyebrow">PRICING SNAPSHOT</span>
          <h2>Free access available</h2>

          <p>
            {tool.freePlan ||
              'Check the official provider website for current pricing and limits.'}
          </p>

          <div className="fine-print">
            <ShieldCheck size={16} />
            Free features and limits may change. Confirm details with the
            provider.
          </div>
        </aside>
      </section>

      <div className="detail-grid">
        <section className="content-panel">
          <div className="section-kicker">01 / WHAT IT'S GOOD FOR</div>
          <h2>Put it to work</h2>

          <ul className="check-list">
            {asArray(tool.bestFor).map((item) => (
              <li key={item}>
                <Check size={17} />
                {item}
              </li>
            ))}

            {asArray(tool.bestFor).length === 0 && (
              <li>
                <Check size={17} />
                Explore the tool's features on its official website.
              </li>
            )}
          </ul>

          <div className="section-kicker section-kicker-spaced">
            02 / TRY THESE TASKS
          </div>

          <div className="example-list">
            {asArray(tool.useCases).map((item, index) => (
              <div className="example-row" key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </div>
            ))}

            {asArray(tool.useCases).length === 0 && (
              <div className="example-row">
                <span>01</span>
                <p>Visit the official website and explore its main features.</p>
              </div>
            )}
          </div>
        </section>

        <aside className="content-panel limitation-panel">
          <div className="section-kicker">03 / GOOD TO KNOW</div>
          <h2>Know the limits</h2>

          <p>
            {tool.limitation ||
              'Features, pricing, and usage limits can change. Verify important information with the provider.'}
          </p>

          <div className="notice-box">
            <ShieldCheck size={18} />
            <span>
              Use AI as a helper, not the final authority. Check important
              facts and test technical work.
            </span>
          </div>

          <div className="tag-list">
            {toolTags.map((tag) => (
              <span key={tag}>#{String(tag).replaceAll(' ', '')}</span>
            ))}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="related-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">KEEP EXPLORING</div>
              <h2>Tools worth comparing</h2>
            </div>

            <Link to="/" className="text-link">
              All tools <ArrowRight size={16} />
            </Link>
          </div>

          <div className="tool-grid related-grid">
            {related.map((item, index) => (
              <ToolCard key={item.id} tool={item} index={index} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

function UseCasesPage() {
  return (
    <main className="page-shell usecase-page">
      <div className="eyebrow">A BETTER PLACE TO START</div>

      <h1>What are you trying to do?</h1>

      <p className="page-intro">
        Choose a task to see tools that can help. You don't need to know the
        AI product names first.
      </p>

      <div className="usecase-grid">
        {useCases.map((item, index) => {
          const Icon = iconMap[item.icon] || Sparkles

          return (
            <article className="usecase-card" key={item.title}>
              <span className="usecase-icon">
                <Icon size={22} />
              </span>

              <span className="usecase-number">
                TASK {String(index + 1).padStart(2, '0')}
              </span>

              <h2>{item.title}</h2>
              <p>{item.description}</p>

              <div className="usecase-tools">
                {asArray(item.tools).map((toolId) => {
                  const tool = tools.find((entry) => entry.id === toolId)

                  return tool ? (
                    <Link key={toolId} to={`/tools/${toolId}`}>
                      {tool.name} <ArrowUpRight size={13} />
                    </Link>
                  ) : null
                })}
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}

/* -------------------- ABOUT PAGE -------------------- */

function AboutPage() {
  return (
    <main className="page-shell usecase-page legal-page">
      <div className="eyebrow">ABOUT TECHGUIDE LAB</div>

      <h1>
        Less hype.
        <br />
        <span>More useful AI.</span>
      </h1>

      <p className="page-intro">
        A practical starting point for discovering AI tools, understanding
        what they do, and choosing the right tool for the task in front of you.
      </p>

      <section className="detail-grid legal-feature-grid">
        <article className="content-panel legal-feature">
          <span className="principle-icon">
            <Search size={22} />
          </span>
          <div className="section-kicker">01 / DISCOVER</div>
          <h2>Find tools that fit your work</h2>
          <p>
            Explore a curated directory of AI tools for coding, research,
            learning, engineering, and everyday problem-solving.
          </p>
        </article>

        <article className="content-panel legal-feature">
          <span className="principle-icon">
            <BookOpen size={22} />
          </span>
          <div className="section-kicker">02 / UNDERSTAND</div>
          <h2>Know what you're choosing</h2>
          <p>
            Learn what a tool can help with, where it may be useful, and
            which limitations to check before relying on it.
          </p>
        </article>

        <article className="content-panel legal-feature">
          <span className="principle-icon">
            <ShieldCheck size={22} />
          </span>
          <div className="section-kicker">03 / VERIFY</div>
          <h2>Make informed decisions</h2>
          <p>
            AI products and free plans change. Always verify current
            features, pricing, privacy practices, and usage limits with
            the official provider.
          </p>
        </article>
      </section>

      <section className="content-panel legal-section">
        <div className="section-kicker">OUR PURPOSE</div>
        <h2>Why TechGuide Lab exists</h2>
        <p>
          The AI landscape can be confusing, especially when you're just
          getting started. TechGuide Lab aims to make exploration easier by
          organizing useful tools around real tasks and explaining them in
          straightforward language.
        </p>
        <p>
          Our goal is to help students, developers, curious learners, and
          builders make a more informed first choice without unnecessary
          complexity.
        </p>
      </section>

      <section className="content-panel legal-section">
        <div className="section-kicker">OUR PRINCIPLES</div>
        <h2>Useful information, clearly presented</h2>

        <ul className="check-list">
          <li>
            <Check size={17} />
            Help visitors discover tools by task and category.
          </li>
          <li>
            <Check size={17} />
            Explain potential uses and limitations in plain language.
          </li>
          <li>
            <Check size={17} />
            Encourage users to verify important details with official sources.
          </li>
          <li>
            <Check size={17} />
            Keep the directory accessible without requiring an account.
          </li>
        </ul>
      </section>

      <div className="legal-cta">
        <div>
          <div className="eyebrow">READY TO EXPLORE?</div>
          <h2>Find your next useful tool.</h2>
          <p>Start with a task and discover where AI might help.</p>
        </div>

        <Link className="button button-dark" to="/">
          Explore the directory <ArrowRight size={17} />
        </Link>
      </div>
    </main>
  )
}
/* -------------------- CONTACT PAGE -------------------- */

function ContactPage() {
  return (
    <main className="page-shell usecase-page legal-page">
      <div className="eyebrow">GET IN TOUCH</div>

      <h1>Let's talk.</h1>

      <p className="page-intro">
        Have a question, found an error, or want to suggest an AI tool?
        We'd like to hear from you.
      </p>

      <section className="detail-grid legal-contact-grid">
        <article className="content-panel contact-card">
          <span className="principle-icon">
            <Mail size={23} />
          </span>

          <div className="section-kicker">EMAIL US</div>
          <h2>Questions and feedback</h2>
          <p>
            Contact us about directory listings, corrections, suggestions,
            or general feedback about TechGuide Lab.
          </p>

          <a
            className="button button-dark"
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              'TechGuide Lab enquiry'
            )}`}
          >
            Send an email <ArrowUpRight size={17} />
          </a>

          {CONTACT_EMAIL === 'YOUR_EMAIL@example.com' && (
            <p className="fine-print">
              Website owner: replace the placeholder email in src/app.jsx
              with your real contact email before publishing.
            </p>
          )}
        </article>

        <article className="content-panel contact-card">
          <span className="principle-icon">
            <Sparkles size={23} />
          </span>

          <div className="section-kicker">HELP US IMPROVE</div>
          <h2>Suggest a tool or correction</h2>
          <p>
            If a tool is missing, a link is broken, or information needs
            updating, include the tool name and the relevant details in
            your message.
          </p>

          <p className="contact-note">
            Helpful details make it easier to review your suggestion.
          </p>
        </article>
      </section>

      <section className="content-panel legal-section">
        <div className="section-kicker">BEFORE YOU WRITE</div>
        <h2>A quick note</h2>
        <p>
          TechGuide Lab is an independent directory. For account access,
          billing, or technical support for a specific AI product, please
          contact that product's official support team.
        </p>
      </section>
    </main>
  )
}

/* -------------------- PRIVACY POLICY PAGE -------------------- */

function PrivacyPolicyPage() {
  const lastUpdated = 'October 26, 2026'

  return (
    <main className="page-shell usecase-page legal-page">
      <div className="eyebrow">YOUR PRIVACY MATTERS</div>

      <h1>Privacy policy.</h1>

      <p className="page-intro">
        This policy explains how TechGuide Lab may handle information when
        you visit our website and use the directory.
      </p>

      <p className="policy-updated">
        <ShieldCheck size={16} />
        Last updated: {lastUpdated}
      </p>

      <div className="legal-policy-layout">
        <aside className="content-panel policy-sidebar">
          <div className="section-kicker">ON THIS PAGE</div>
          <a href="#information">Information we collect</a>
          <a href="#usage">How information is used</a>
          <a href="#cookies">Cookies and advertising</a>
          <a href="#third-party">Third-party services</a>
          <a href="#security">Data security</a>
          <a href="#children">Children's privacy</a>
          <a href="#changes">Policy updates</a>
          <a href="#contact-privacy">Contact</a>
        </aside>

        <div className="legal-policy-content">
          <section className="content-panel legal-section" id="information">
            <div className="section-kicker">01 / INFORMATION</div>
            <h2>Information we collect</h2>
            <p>
              TechGuide Lab is designed as an informational directory. You
              can browse the directory without creating an account.
            </p>
            <p>
              We do not intentionally ask visitors to submit sensitive
              personal information through the directory. Depending on the
              hosting provider and services used, technical information such
              as browser type, device information, IP address, requested
              pages, and server logs may be processed to operate, maintain,
              and protect the website.
            </p>
            <p>
              If you contact us by email, we may receive your email address,
              the contents of your message, and any information you choose
              to include.
            </p>
          </section>

          <section className="content-panel legal-section" id="usage">
            <div className="section-kicker">02 / PURPOSE</div>
            <h2>How information is used</h2>
            <p>Information may be used to:</p>
            <ul className="check-list">
              <li>
                <Check size={17} />
                Operate, maintain, and protect the website.
              </li>
              <li>
                <Check size={17} />
                Respond to messages, feedback, and correction requests.
              </li>
              <li>
                <Check size={17} />
                Understand website performance and improve the experience,
                where analytics tools are used.
              </li>
              <li>
                <Check size={17} />
                Meet applicable legal obligations and address misuse.
              </li>
            </ul>
            <p>
              We do not claim to collect or use data through services that
              have not been enabled on the website.
            </p>
          </section>

          <section className="content-panel legal-section" id="cookies">
            <div className="section-kicker">03 / COOKIES</div>
            <h2>Cookies and advertising</h2>
            <p>
              Cookies and similar technologies may be used by the hosting
              provider, analytics services, or third-party services that
              appear on the website.
            </p>
            <p>
              If Google AdSense or another advertising service is enabled,
              that service may use cookies or similar technologies to
              deliver, measure, and personalize advertisements, subject to
              its own policies and your available privacy settings.
            </p>
            <p>
              Third-party advertising providers may process information
              about visits to this and other websites as described in their
              own privacy documentation. Advertising and cookie practices
              can vary by provider, region, and configuration.
            </p>
            <p>
              You can manage cookies through your browser settings. Blocking
              some cookies may affect the operation of certain website
              features or third-party services.
            </p>
          </section>

          <section className="content-panel legal-section" id="third-party">
            <div className="section-kicker">04 / EXTERNAL SERVICES</div>
            <h2>Third-party websites and services</h2>
            <p>
              TechGuide Lab links to external AI tools and their official
              websites. When you follow an external link, the other website's
              privacy policy and terms apply to your visit there.
            </p>
            <p>
              We do not control the data practices, security, content, or
              availability of external websites. Review their policies
              before sharing personal information or creating an account.
            </p>
            <p>
              The website's hosting, analytics, or advertising providers may
              also process information under their respective terms and
              privacy policies.
            </p>
          </section>

          <section className="content-panel legal-section" id="security">
            <div className="section-kicker">05 / SECURITY</div>
            <h2>Data security and retention</h2>
            <p>
              We aim to use reasonable practices to protect the website and
              any information received through it. However, no website or
              internet transmission can be guaranteed to be completely
              secure.
            </p>
            <p>
              Technical logs and messages may be retained for as long as
              needed for website operations, security, responding to
              enquiries, or meeting legal requirements, subject to the
              practices of the relevant service providers.
            </p>
          </section>

          <section className="content-panel legal-section" id="children">
            <div className="section-kicker">06 / YOUNGER VISITORS</div>
            <h2>Children's privacy</h2>
            <p>
              TechGuide Lab is an informational website and is not
              specifically directed at children under 13. We do not
              knowingly request personal information from children under
              13. If you believe a child has submitted personal information
              to us, contact us so that the situation can be reviewed.
            </p>
          </section>

          <section className="content-panel legal-section" id="changes">
            <div className="section-kicker">07 / UPDATES</div>
            <h2>Changes to this policy</h2>
            <p>
              This privacy policy may be updated when the website's
              features, service providers, advertising arrangements, or
              legal obligations change. Updates will be published on this
              page with a revised date.
            </p>
          </section>

          <section className="content-panel legal-section" id="contact-privacy">
            <div className="section-kicker">08 / CONTACT</div>
            <h2>Questions about privacy?</h2>
            <p>
              If you have a question about this policy or information you
              have sent to TechGuide Lab, contact the website owner.
            </p>
            <a
              className="text-link"
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                'Privacy policy enquiry'
              )}`}
            >
              Contact us by email <ArrowUpRight size={16} />
            </a>
          </section>
        </div>
      </div>

      <div className="notice-box privacy-notice">
        <ShieldCheck size={19} />
        <span>
          Important: update this policy to accurately reflect the actual
          hosting, analytics, cookies, advertising, and data practices on
          your published website. This template is not legal advice.
        </span>
      </div>
    </main>
  )
}

/* -------------------- HOMEPAGE -------------------- */

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All tools')
  const [showAll, setShowAll] = useState(false)
  const [sortBy, setSortBy] = useState('recommended')

  const safeTools = asArray(tools)
  const safeCategories = asArray(categories)

  const filteredTools = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    let result = safeTools.filter((tool) => {
      const matchesCategory =
        activeCategory === 'All tools' || tool.category === activeCategory

      const searchable = [
        tool.name,
        tool.maker,
        tool.category,
        tool.tagline,
        tool.description,
        ...asArray(tool.tags),
        ...asArray(tool.bestFor),
        ...asArray(tool.useCases),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return matchesCategory && (!query || searchable.includes(query))
    })

    if (sortBy === 'az') {
      result = [...result].sort((a, b) =>
        (a.name || '').localeCompare(b.name || '')
      )
    }

    return result
  }, [searchTerm, activeCategory, sortBy])

  const displayedTools =
    showAll || searchTerm || activeCategory !== 'All tools'
      ? filteredTools
      : filteredTools.slice(0, 8)

  function chooseCategory(category) {
    setActiveCategory(category)
    setShowAll(true)
  }

  function resetFilters() {
    setSearchTerm('')
    setActiveCategory('All tools')
    setShowAll(false)
    setSortBy('recommended')
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="badge-pulse" />
              YOUR PRACTICAL AI TOOLKIT
            </div>

            <h1>
              Find the right AI.
              <br />
              <span>Do better work.</span>
            </h1>

            <p className="hero-description">
              A clear, curated guide to useful AI tools for coding,
              research, engineering and learning — including what you can
              use for free.
            </p>

            <div className="hero-actions">
              <a className="button button-dark" href="#directory">
                Explore the directory <ArrowDownRight size={17} />
              </a>

              <Link className="button button-light" to="/use-cases">
                Find tools by task <ArrowRight size={17} />
              </Link>
            </div>

            <div className="hero-proof">
              <div className="avatar-stack">
                <span>AI</span>
                <span>{'</>'}</span>
                <span>⚙</span>
              </div>

              <p>
                <b>Less hype. More useful.</b>
                <br />
                Practical notes for real projects.
              </p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="visual-center">
              <span className="visual-spark">
                <Sparkles size={28} />
              </span>
              <span>AI</span>
              <small>TOOLKIT</small>
            </div>

            <div className="float-chip chip-chat">
              <span className="mini-mark mint-mark">✳</span>
              <div>
                <b>ChatGPT</b>
                <small>Learn &amp; build</small>
              </div>
              <span className="chip-check">
                <Check size={13} />
              </span>
            </div>

            <div className="float-chip chip-code">
              <span className="mini-mark violet-mark">⌘</span>
              <div>
                <b>Copilot</b>
                <small>Write better code</small>
              </div>
            </div>

            <div className="float-chip chip-research">
              <span className="mini-mark cyan-mark">⌕</span>
              <div>
                <b>Research</b>
                <small>Find reliable sources</small>
              </div>
            </div>

            <div className="visual-caption">
              <span className="caption-dot" />
              A smarter starting point
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <span>BUILT FOR CURIOUS MINDS</span>
          <div>
            <span>Students</span>
            <span>Developers</span>
            <span>Builders</span>
            <span>Problem-solvers</span>
          </div>
        </div>
      </section>
                  <section className="directory-section page-shell" id="directory">
        <div className="section-heading directory-heading">
          <div>
            <div className="eyebrow">THE DIRECTORY</div>
            <h2>Meet your new toolkit.</h2>
            <p>
              Useful tools, clearly explained. Start with the task, not the
              hype.
            </p>
          </div>

          <div className="tool-count">
            <b>{String(safeTools.length).padStart(2, '0')}</b>
            <span>
              TOOLS TO
              <br />
              EXPLORE
            </span>
          </div>
        </div>

        <div className="search-row">
          <label className="search-box">
            <Search size={19} />

            <input
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setShowAll(true)
              }}
              placeholder="Search tools, tasks, or skills..."
              aria-label="Search tools"
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
                type="button"
              >
                <X size={16} />
              </button>
            )}

            <kbd>⌘ K</kbd>
          </label>

          <label className="sort-control">
            <Filter size={16} />
            <span className="sort-label">Sort</span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort tools"
            >
              <option value="recommended">Recommended</option>
              <option value="az">A to Z</option>
            </select>

            <ChevronDown size={14} />
          </label>
        </div>

        <div
          className="category-row"
          role="group"
          aria-label="Filter by category"
        >
          {safeCategories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? 'category-button selected'
                  : 'category-button'
              }
              onClick={() => chooseCategory(category)}
            >
              {category}
              {category === 'All tools' && <span>{safeTools.length}</span>}
            </button>
          ))}
        </div>

        <div className="results-line">
          <span>
            {filteredTools.length}{' '}
            {filteredTools.length === 1 ? 'tool' : 'tools'} found
          </span>
          <span>Independent guide · No account needed</span>
        </div>

        {displayedTools.length > 0 ? (
          <div className="tool-grid">
            {displayedTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={28} />
            <h3>No tools found</h3>
            <p>Try another search or clear your category filter.</p>

            <button
              className="button button-dark"
              onClick={() => {
                setSearchTerm('')
                setActiveCategory('All tools')
                setShowAll(false)
              }}
            >
              Reset filters
            </button>
          </div>
        )}

        {!showAll && filteredTools.length > displayedTools.length && (
          <div className="load-more-wrap">
            <button
              className="button button-outline"
              onClick={() => setShowAll(true)}
            >
              Explore all {filteredTools.length} tools{' '}
              <ArrowRight size={17} />
            </button>
          </div>
        )}
      </section>

      <section className="usecase-band">
        <div className="page-shell usecase-band-inner">
          <div className="usecase-intro">
            <div className="eyebrow eyebrow-light">START WITH YOUR GOAL</div>

            <h2>
              Not sure which tool
              <br />
              you need?
            </h2>

            <p>
              Tell us what you're working on. We'll point you toward a useful
              place to start.
            </p>

            <Link to="/use-cases" className="button button-white">
              Find by task <ArrowRight size={17} />
            </Link>
          </div>

          <div className="quick-tasks">
            {asArray(useCases).slice(0, 4).map((item) => {
              const Icon = iconMap[item.icon] || Zap

              return (
                <Link
                  className="quick-task"
                  to="/use-cases"
                  key={item.title}
                >
                  <span className="quick-task-icon">
                    <Icon size={19} />
                  </span>

                  <span>
                    <b>{item.title}</b>
                    <small>{item.description}</small>
                  </span>

                  <ArrowUpRight size={17} className="quick-arrow" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="how-section page-shell" id="how-it-works">
        <div className="section-heading">
          <div>
            <div className="eyebrow">OUR APPROACH</div>
            <h2>Clarity over complexity.</h2>
            <p>
              AI should help you get moving, not make things more confusing.
            </p>
          </div>
        </div>

        <div className="principle-grid">
          <article>
            <span className="principle-icon">
              <Search size={21} />
            </span>
            <span className="principle-no">01</span>
            <h3>Find what fits</h3>
            <p>Search by tool, task, or the problem you're trying to solve.</p>
          </article>

          <article>
            <span className="principle-icon">
              <BookOpen size={21} />
            </span>
            <span className="principle-no">02</span>
            <h3>Understand the trade-offs</h3>
            <p>Know what a tool does and where its free plan has limits.</p>
          </article>

          <article>
            <span className="principle-icon">
              <ShieldCheck size={21} />
            </span>
            <span className="principle-no">03</span>
            <h3>Verify before you trust</h3>
            <p>Check important claims, especially in code and engineering.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main page-shell">
        <Logo />

        <p>
          A practical starting point for exploring AI tools.
          <br />
          Built for people who want to learn, make and solve.
        </p>

        <div className="footer-links">
          <Link to="/">Discover</Link>
          <Link to="/use-cases">Use cases</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy-policy">Privacy policy</Link>
          <a href="https://chatgpt.com/" target="_blank" rel="noreferrer">
            ChatGPT <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      <div className="footer-bottom page-shell">
        <span>© {new Date().getFullYear()} TechGuide Lab</span>
        <span>Independent directory · No database · No account required</span>
        <span>Free-plan details can change; verify with providers.</span>
      </div>
    </footer>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="app-shell" key={location.pathname}>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools/:id" element={<ToolDetail />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        {/* Keep the old sitemap URL working too. */}
        <Route path="/privacy" element={<PrivacyPolicyPage />} />

        <Route
          path="*"
          element={
            <main className="page-shell not-found">
              <div className="eyebrow">404 / PAGE NOT FOUND</div>
              <h1>Looks like this page wandered off.</h1>
              <Link className="button button-dark" to="/">
                Back to TechGuide Lab <ArrowRight size={17} />
              </Link>
            </main>
          }
        />
      </Routes>

      <Footer />
    </div>
  )
}
