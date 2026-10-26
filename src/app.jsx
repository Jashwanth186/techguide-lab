
import { useMemo, useState } from 'react'
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { categories, tools, useCases } from './data/tools.js'

const pageStyle = {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '48px 24px 72px',
  lineHeight: 1.8,
}

function Logo() {
  return (
    <Link to="/" style={{ fontSize: 22, fontWeight: 800, color: 'inherit', textDecoration: 'none' }}>
      TechGuide <span style={{ color: '#6558e8' }}>Lab</span>
    </Link>
  )
}

function Header() {
  return (
    <header style={{ padding: '20px 5%', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: 1100, margin: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <Logo />
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
          <Link to="/">Discover tools</Link>
          <Link to="/use-cases">Use cases</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy-policy">Privacy</Link>
        </nav>
      </div>
    </header>
  )
}

function HomePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All tools')

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = category === 'All tools' || tool.category === category
      const searchable = [
        tool.name, tool.maker, tool.category, tool.tagline,
        tool.description, ...(tool.tags || []),
      ].join(' ').toLowerCase()

      return matchesCategory && searchable.includes(query.toLowerCase())
    })
  }, [query, category])

  return (
    <main style={pageStyle}>
      <p>YOUR PRACTICAL AI TOOLKIT</p>
      <h1>Find the right AI. Do better work.</h1>
      <p>Explore AI tools for coding, research, engineering, productivity, and learning.</p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search AI tools..."
        aria-label="Search AI tools"
        style={{ width: '100%', maxWidth: 500, padding: 12, margin: '16px 0', boxSizing: 'border-box' }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {(categories || ['All tools']).map((item) => (
          <button key={item} onClick={() => setCategory(item)} style={{ padding: '8px 12px', cursor: 'pointer' }}>
            {item}
          </button>
        ))}
      </div>

      <h2>{filteredTools.length} tools to explore</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
        {filteredTools.map((tool) => (
          <article key={tool.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 }}>
            <p>{tool.category}</p>
            <h3><Link to={`/tools/${tool.id}`}>{tool.name}</Link></h3>
            <p>{tool.tagline || tool.description}</p>
            <p>{tool.maker}</p>
            <Link to={`/tools/${tool.id}`}>View tool →</Link>
          </article>
        ))}
      </div>
    </main>
  )
}

function ToolDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const tool = tools.find((item) => item.id === id)

  if (!tool) {
    return <main style={pageStyle}><h1>Tool not found</h1><Link to="/">Explore tools</Link></main>
  }

  return (
    <main style={pageStyle}>
      <button onClick={() => navigate(-1)}>← Back</button>
      <p>{tool.category}</p>
      <h1>{tool.name}</h1>
      <p>{tool.maker}</p>
      <p>{tool.description || tool.tagline}</p>

      <h2>What it's useful for</h2>
      <ul>{(tool.bestFor || []).map((item) => <li key={item}>{item}</li>)}</ul>

      <h2>Example tasks</h2>
      <ul>{(tool.useCases || []).map((item) => <li key={item}>{item}</li>)}</ul>

      <h2>Free plan and limitations</h2>
      <p>{tool.freePlan || 'Check the provider website for current pricing and free-plan details.'}</p>
      <p>{tool.limitation || 'Features and usage limits may change. Verify details with the provider.'}</p>

      <p>
        <a href={tool.url || 'https://chatgpt.com/'} target="_blank" rel="noreferrer">
          Visit official website ↗
        </a>
      </p>
    </main>
  )
}

function UseCasesPage() {
  return (
    <main style={pageStyle}>
      <h1>Find AI tools by task</h1>
      <p>Start with what you want to accomplish.</p>
      {(useCases || []).map((item) => (
        <section key={item.title} style={{ borderBottom: '1px solid #e5e7eb', padding: '16px 0' }}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          {(item.tools || []).map((id) => {
            const tool = tools.find((entry) => entry.id === id)
            return tool ? <p key={id}><Link to={`/tools/${id}`}>{tool.name} →</Link></p> : null
          })}
        </section>
      ))}
    </main>
  )
}

function AboutPage() {
  return (
    <main style={pageStyle}>
      <p>ABOUT TECHGUIDE LAB</p>
      <h1>Making AI easier to understand and use.</h1>
      <p>TechGuide Lab is an independent directory that helps people discover AI tools for coding, research, engineering, productivity, and learning.</p>

      <h2>Our mission</h2>
      <p>We aim to make AI tool discovery simpler by organizing tools around their uses and helping visitors find official provider websites.</p>

      <h2>What you'll find here</h2>
      <ul>
        <li>AI tools organized by category and purpose.</li>
        <li>Practical information about features and use cases.</li>
        <li>Guidance for students, developers, and learners.</li>
        <li>Links to providers so visitors can verify current details.</li>
      </ul>

      <h2>Our approach</h2>
      <p>We aim to provide clear and useful information. Features, prices, and free-plan limits may change. Verify important details with providers and review AI-generated information before relying on it.</p>

      <h2>Independence</h2>
      <p>TechGuide Lab is an independent project. A listing does not necessarily mean the provider endorses or sponsors this website.</p>
      <p>Questions? <Link to="/contact">Contact us</Link>.</p>
    </main>
  )
}

function ContactPage() {
  return (
    <main style={pageStyle}>
      <h1>Contact Us</h1>
      <p>Have feedback, found an incorrect tool detail, or want to suggest an AI tool? We'd like to hear from you.</p>
      <p>Email us at: <a href="mailto:vangurijashwanth2@gmail.com">vangurijashwanth2@gmail.com</a></p>
      <p>Please include the relevant tool name and a description of your question or correction.</p>
    </main>
  )
}

function PrivacyPolicyPage() {
  return (
    <main style={pageStyle}>
      <h1>Privacy Policy</h1>
      <p><strong>Last updated: October 26, 2026</strong></p>

      <h2>Introduction</h2>
      <p>TechGuide Lab respects your privacy. This policy explains how information may be handled when you visit this website.</p>

      <h2>Information you provide</h2>
      <p>This website does not currently require visitors to create an account. If you contact us by email, we receive the information you choose to include in your message.</p>

      <h2>Cookies and usage data</h2>
      <p>Our hosting provider or third-party services may process technical information such as browser details, requests, and basic usage data to operate, protect, and improve the website.</p>

      <h2>Advertising and Google AdSense</h2>
      <p>If advertising services such as Google AdSense are enabled in the future, Google and its partners may use cookies or similar technologies to serve, measure, and personalize advertisements as permitted by applicable settings and law.</p>
      <p>Visitors can learn about Google's advertising practices and available controls through Google's advertising privacy resources.</p>

      <h2>Third-party websites</h2>
      <p>Our directory links to third-party websites. Those websites have their own privacy policies and practices, which we do not control.</p>

      <h2>Data security and children's privacy</h2>
      <p>We take reasonable steps to operate the website responsibly, but no online service can guarantee absolute security. This website is not intended to knowingly collect personal information from children through account registration.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy as the website changes. Updates will be published on this page.</p>

      <h2>Contact</h2>
      <p>For privacy questions, email <a href="mailto:vangurijashwanth2@gmail.com">vangurijashwanth2@gmail.com</a>.</p>
    </main>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e5e7eb', padding: '28px 5%', lineHeight: 2 }}>
      <div style={{ maxWidth: 1100, margin: 'auto' }}>
        <Logo />
        <p>An independent starting point for exploring AI tools.</p>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
          <Link to="/">Discover</Link>
          <Link to="/use-cases">Use cases</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </nav>
        <p>© {new Date().getFullYear()} TechGuide Lab. Tool details may change; verify with providers.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div key={location.pathname}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools/:id" element={<ToolDetail />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<main style={pageStyle}><h1>Page not found</h1><Link to="/">Return home</Link></main>} />
      </Routes>
      <Footer />
    </div>
  )
}
