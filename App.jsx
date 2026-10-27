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
        {/* Legacy URL kept working for existing sitemap/bookmarks. */}
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
