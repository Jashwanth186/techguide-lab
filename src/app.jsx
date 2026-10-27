<section className="directory-section page-shell" id="directory">
  <div className="section-heading directory-heading">
    <div>
      <div className="eyebrow">THE DIRECTORY</div>
      <h2>Meet your new toolkit.</h2>
      <p>
        Useful tools, clearly explained. Start with the task, not the hype.
      </p>
    </div>

    <div className="tool-count">
      <b>{String(safeTools.length).padStart(2, "0")}</b>
      <span>
        TOOLS TO
        <br />
        EXPLORE
      </span>
    </div>
  </div>

  <div className="search-row">
    <input
      type="search"
      placeholder="Search tools..."
      aria-label="Search tools"
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
    />
  </div>

  <div className="tools-grid">
    {safeTools
      .filter((tool) => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return true;

        return `${tool.name ?? ""} ${tool.description ?? ""} ${
          tool.category ?? ""
        }`
          .toLowerCase()
          .includes(query);
      })
      .map((tool) => (
        <article className="tool-card" key={tool.id}>
          <div className="tool-card-content">
            <span className="tool-category">
              {tool.category ?? "Tool"}
            </span>

            <h3>{tool.name}</h3>

            <p>{tool.description ?? "Explore this useful tool."}</p>

            <a href={`/tools/${tool.id}`}>
              Explore tool →
            </a>
          </div>
        </article>
      ))}
  </div>

  {safeTools.length === 0 && (
    <p>No tools are available yet. Please check back soon.</p>
  )}
</section>
