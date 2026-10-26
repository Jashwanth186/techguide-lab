
import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <main
      className="page-shell"
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        paddingTop: '64px',
        paddingBottom: '80px',
      }}
    >
      <div className="eyebrow">ABOUT TECHGUIDE LAB</div>

      <h1>Making AI easier to understand and use.</h1>

      <p className="page-intro">
        TechGuide Lab is an independent directory that helps people
        discover AI tools for coding, research, engineering, productivity,
        and learning.
      </p>

      <section style={{ marginTop: '40px' }}>
        <h2>Our mission</h2>
        <p>
          We want to make AI tool discovery simpler. Instead of spending
          hours searching, visitors can explore tools by category and
          task, understand their uses, and visit official provider websites.
        </p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>What we offer</h2>
        <ul>
          <li>AI tools organized by category and purpose.</li>
          <li>Practical information about features and use cases.</li>
          <li>Guidance for students, developers, and curious learners.</li>
          <li>Links to official websites for updated information.</li>
        </ul>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>Our commitment</h2>
        <p>
          We aim to provide clear, useful, and honest information.
          AI tool features, pricing, and free-plan limits may change,
          so readers should verify current details with the provider.
          Always review AI-generated information before relying on it.
        </p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2>Independence</h2>
        <p>
          TechGuide Lab is an independent project. A listing does not
          necessarily mean that a provider endorses or sponsors our site.
          We aim to help visitors make informed decisions.
        </p>
      </section>

      <p style={{ marginTop: '40px' }}>
        Have a question? <Link to="/contact">Contact us</Link>.
      </p>
    </main>
  )
}
