import { useEffect, useState,usememo } from 'react';

const TOOLS = [
  { id: 'resume-builder', name: 'Resume Builder', category: 'Career', description: 'Create a clear, professional resume for your next opportunity.', tag: 'Career' },
  { id: 'word-counter', name: 'Word Counter', category: 'Writing', description: 'Count words, characters, and paragraphs in your text.', tag: 'Writing' },
  { id: 'password-generator', name: 'Password Generator', category: 'Security', description: 'Generate a strong random password right in your browser.', tag: 'Security' },
  { id: 'percentage-calculator', name: 'Percentage Calculator', category: 'Calculators', description: 'Calculate percentages, discounts, and percentage changes.', tag: 'Math' },
  { id: 'study-planner', name: 'Study Planner', category: 'Education', description: 'Organize study tasks and build a simple daily plan.', tag: 'Study' },
  { id: 'unit-converter', name: 'Unit Converter', category: 'Calculators', description: 'Convert common length, weight, and temperature units.', tag: 'Math' },
  { id: 'bio-generator', name: 'Bio Idea Generator', category: 'Writing', description: 'Get inspiration for a short profile or social bio.', tag: 'Writing' },
  { id: 'focus-timer', name: 'Focus Timer', category: 'Productivity', description: 'Use focused work sessions with a simple timer.', tag: 'Focus' },
];

const CATEGORIES = ['All tools', 'Calculators', 'Career', 'Education', 'Productivity', 'Security', 'Writing'];

function Header() {
  return <header className="site-header"><a className="brand" href="/" aria-label="TechGuide Lab home"><span className="brand-mark">T</span><span>TechGuide <b>Lab</b></span></a><nav aria-label="Main navigation"><a href="/">Home</a><a href="/#directory">Explore tools</a><a href="/about/">About</a><a href="/contact/">Contact</a></nav></header>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-brand"><span className="brand-mark">T</span><span>TechGuide Lab</span></div><p>Simple, useful tools for everyday tasks.</p><div className="footer-links"><a href="/about/">About</a><a href="/privacy/">Privacy</a><a href="/contact/">Contact</a></div><small>© {new Date().getFullYear()} TechGuide Lab. All rights reserved.</small></footer>;
}

function ToolCard({ tool }) {
  return <article className="tool-card"><div className="tool-card-top"><span className="tool-icon">{tool.name.slice(0, 1)}</span><span className="pill">{tool.tag}</span></div><h3>{tool.name}</h3><p>{tool.description}</p><a className="text-link" href={`/tools/${tool.id}/`}>Open tool <span aria-hidden="true">↗</span></a></article>;
}

function Directory() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All tools');
  const filteredTools = useMemo(() => TOOLS.filter((tool) => {
    const matchesCategory = category === 'All tools' || tool.category === category;
    const searchable = `${tool.name} ${tool.category} ${tool.description}`.toLowerCase();
    return matchesCategory && searchable.includes(query.trim().toLowerCase());
  }), [query, category]);

  return <section className="directory section" id="directory"><div className="section-heading"><div><span className="eyebrow">THE DIRECTORY</span><h2>Meet your new toolkit.</h2><p>Useful tools, clearly explained. Start with the task, not the hype.</p></div><span className="tool-total"><b>{String(filteredTools.length).padStart(2, '0')}</b><small>TOOLS FOUND</small></span></div><div className="search-row"><label className="search-box"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools by name or task…" aria-label="Search tools" /></label></div><div className="category-list" aria-label="Filter by category">{CATEGORIES.map((item) => <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)} type="button">{item}</button>)}</div>{filteredTools.length ? <div className="tools-grid">{filteredTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div> : <div className="empty-state"><h3>No matching tools</h3><p>Try another search or choose a different category.</p><button className="button button-secondary" onClick={() => { setQuery(''); setCategory('All tools'); }} type="button">Clear filters</button></div>}</section>;
}

function HomePage() {
  return <><main><section className="hero"><div className="hero-copy"><span className="eyebrow"><span className="status-dot" /> YOUR EVERYDAY DIGITAL TOOLKIT</span><h1>Less searching.<br /><span>More doing.</span></h1><p className="hero-description">Discover practical, easy-to-use tools that help you work smarter, learn faster, and get everyday tasks done.</p><div className="hero-actions"><a className="button button-primary" href="#directory">Explore the tools <span aria-hidden="true">→</span></a><a className="button button-secondary" href="/about/">Learn about us</a></div><div className="hero-note"><span className="check-mark">✓</span> Straightforward tools. No unnecessary complexity.</div></div><div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-window"><div className="window-dots"><i/><i/><i/></div><div className="art-window-label">YOUR WORKSPACE</div><div className="art-main-icon">✳</div><div className="art-line long"/><div className="art-line medium"/><div className="art-mini-grid"><span>✎<small>Write</small></span><span>⌘<small>Organize</small></span><span>↗<small>Create</small></span></div></div><span className="float-chip chip-one">✦ Find your flow</span><span className="float-chip chip-two">✓ Simple by design</span></div></section><div className="trust-strip"><span>MADE FOR EVERYDAY TASKS</span><span>✳ Easy to explore</span><span>↗ Practical and useful</span><span>⌘ One place to start</span></div><Directory /><section className="bottom-cta"><span className="eyebrow">START SOMEWHERE</span><h2>A better way to get things done.</h2><p>Explore the directory and find a tool for the task in front of you.</p><a className="button button-light" href="#directory">Browse all tools →</a></section></main></>;
}

function InfoPage({ title, eyebrow, children }) {
  return <main className="info-page section"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><div className="info-content">{children}</div><a className="button button-primary" href="/">Back to homepage</a></main>;
}

function ToolPage({ tool }) {
  const [text, setText] = useState('');
  const [copiedMessage, setCopiedMessage] = useState('');
  const [passwordLength, setPasswordLength] = useState(16);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const [percentValue, setPercentValue] = useState('');
  const [percentOf, setPercentOf] = useState('');
  const [unitValue, setUnitValue] = useState('');
  const [unitFrom, setUnitFrom] = useState('km');
  const [unitTo, setUnitTo] = useState('mi');
  const [studyTasks, setStudyTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  function generatePassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*?';
    const values = new Uint32Array(passwordLength);
    window.crypto.getRandomValues(values);
    setGeneratedPassword(Array.from(values, (value) => chars[value % chars.length]).join(''));
  }
  async function copyText(value) {
    try { await navigator.clipboard.writeText(value); setCopiedMessage('Copied to clipboard.'); }
    catch { setCopiedMessage('Select and copy the result manually.'); }
  }

  return <main className="info-page tool-page section"><a className="back-link" href="/#directory">← Back to all tools</a><span className="eyebrow">{tool.category.toUpperCase()} TOOL</span><h1>{tool.name}</h1><p className="tool-intro">{tool.description}</p><div className="tool-workspace">
    {tool.id === 'word-counter' && <><label className="field-label" htmlFor="word-text">Enter or paste your text</label><textarea id="word-text" rows="9" value={text} onChange={(event) => setText(event.target.value)} placeholder="Start typing here…"/><div className="stats-row"><div><b>{wordCount}</b><span>Words</span></div><div><b>{charCount}</b><span>Characters</span></div><div><b>{text.trim() ? text.trim().split(/[.!?]+/).filter(Boolean).length : 0}</b><span>Sentences</span></div></div></>}
    {tool.id === 'password-generator' && <><label className="field-label" htmlFor="password-length">Password length: {passwordLength}</label><input id="password-length" type="range" min="8" max="40" value={passwordLength} onChange={(event) => setPasswordLength(Number(event.target.value))}/><button className="button button-primary" onClick={generatePassword} type="button">Generate secure password</button>{generatedPassword && <div className="result-box"><code>{generatedPassword}</code><button className="button button-secondary" onClick={() => copyText(generatedPassword)} type="button">Copy</button></div>}{copiedMessage && <p className="success-message" role="status">{copiedMessage}</p>}<p className="helper-text">Your password is generated locally in this browser and is not sent to a server.</p></>}
    {tool.id === 'percentage-calculator' && <><div className="form-grid"><label className="field-label">What percentage? <input type="number" value={percentValue} onChange={(event) => setPercentValue(event.target.value)} placeholder="e.g. 20"/></label><label className="field-label">Of what number? <input type="number" value={percentOf} onChange={(event) => setPercentOf(event.target.value)} placeholder="e.g. 1500"/></label></div><div className="calculation-result"><span>Result</span><b>{percentValue !== '' && percentOf !== '' && Number.isFinite(Number(percentValue) * Number(percentOf) / 100) ? (Number(percentValue) * Number(percentOf) / 100).toLocaleString(undefined, { maximumFractionDigits: 6 }) : '—'}</b></div></>}
    {tool.id === 'unit-converter' && <><label className="field-label">Value <input type="number" value={unitValue} onChange={(event) => setUnitValue(event.target.value)} placeholder="Enter a value"/></label><div className="form-grid"><label className="field-label">From <select value={unitFrom} onChange={(event) => setUnitFrom(event.target.value)}><option value="km">Kilometres</option><option value="mi">Miles</option><option value="kg">Kilograms</option><option value="lb">Pounds</option><option value="c">Celsius</option><option value="f">Fahrenheit</option></select></label><label className="field-label">To <select value={unitTo} onChange={(event) => setUnitTo(event.target.value)}><option value="km">Kilometres</option><option value="mi">Miles</option><option value="kg">Kilograms</option><option value="lb">Pounds</option><option value="c">Celsius</option><option value="f">Fahrenheit</option></select></label></div><div className="calculation-result"><span>Converted value</span><b>{unitValue !== '' && unitFrom === unitTo ? Number(unitValue).toLocaleString() : unitValue !== '' && unitFrom === 'km' && unitTo === 'mi' ? (Number(unitValue) * 0.621371).toLocaleString(undefined, { maximumFractionDigits: 6 }) : unitValue !== '' && unitFrom === 'mi' && unitTo === 'km' ? (Number(unitValue) / 0.621371).toLocaleString(undefined, { maximumFractionDigits: 6 }) : unitValue !== '' && unitFrom === 'kg' && unitTo === 'lb' ? (Number(unitValue) * 2.20462).toLocaleString(undefined, { maximumFractionDigits: 6 }) : unitValue !== '' && unitFrom === 'lb' && unitTo === 'kg' ? (Number(unitValue) / 2.20462).toLocaleString(undefined, { maximumFractionDigits: 6 }) : unitValue !== '' && unitFrom === 'c' && unitTo === 'f' ? (Number(unitValue) * 9 / 5 + 32).toLocaleString(undefined, { maximumFractionDigits: 6 }) : unitValue !== '' && unitFrom === 'f' && unitTo === 'c' ? ((Number(unitValue) - 32) * 5 / 9).toLocaleString(undefined, { maximumFractionDigits: 6 }) : '—'}</b></div><p className="helper-text">Conversions are provided for the listed unit pairs.</p></>}
    {tool.id === 'resume-builder' && <><p className="helper-text">Fill in your details to create a simple resume draft you can copy into a document.</p><div className="form-grid"><label className="field-label">Full name <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name"/></label><label className="field-label">Target role <input value={role} onChange={(event) => setRole(event.target.value)} placeholder="e.g. Software intern"/></label></div><label className="field-label">Summary / skills <textarea rows="5" value={text} onChange={(event) => setText(event.target.value)} placeholder="Add your skills, education, and experience…"/></label><div className="result-box resume-preview"><pre>{`${name || 'Your Name'}\n${role || 'Target Role'}\n\nPROFILE & SKILLS\n${text || 'Add your profile and skills above.'}`}</pre><button className="button button-secondary" onClick={() => copyText(`${name || 'Your Name'}\n${role || 'Target Role'}\n\nPROFILE & SKILLS\n${text}`)} type="button">Copy draft</button></div>{copiedMessage && <p className="success-message" role="status">{copiedMessage}</p>}</>}
    {tool.id === 'study-planner' && <><form onSubmit={(event) => { event.preventDefault(); if (newTask.trim()) { setStudyTasks((tasks) => [...tasks, { id: Date.now(), text: newTask.trim(), done: false }]); setNewTask(''); } }} className="task-form"><input value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="Add a study task…" aria-label="New study task"/><button className="button button-primary" type="submit">Add task</button></form><ul className="task-list">{studyTasks.map((task) => <li key={task.id}><label><input type="checkbox" checked={task.done} onChange={() => setStudyTasks((tasks) => tasks.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))}/><span className={task.done ? 'task-done' : ''}>{task.text}</span></label><button type="button" className="remove-task" onClick={() => setStudyTasks((tasks) => tasks.filter((item) => item.id !== task.id))} aria-label={`Remove ${task.text}`}>×</button></li>)}</ul>{studyTasks.length === 0 && <p className="helper-text">Your study tasks will appear here. Tasks stay in this page session.</p>}</>}
    {tool.id === 'bio-generator' && <><label className="field-label">A few details about you <textarea rows="4" value={text} onChange={(event) => setText(event.target.value)} placeholder="Your interests, role, or personality…"/></label><div className="result-box"><p>{text.trim() ? `${text.trim().replace(/[.!?]+$/, '')}. Curious mind. Always learning. ✨` : 'Your bio idea will appear here when you enter a few details.'}</p>{text.trim() && <button className="button button-secondary" onClick={() => copyText(`${text.trim().replace(/[.!?]+$/, '')}. Curious mind. Always learning. ✨`)} type="button">Copy bio</button>}</div>{copiedMessage && <p className="success-message" role="status">{copiedMessage}</p>}</>}
    {tool.id === 'focus-timer' && <FocusTimer />}
  </div></main>;
}

function FocusTimer() {
  const [minutes, setMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return undefined;
    const timerId = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timerId);
          setRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [running]);
  const display = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`;
  return <div className="timer-panel"><div className="timer-display" aria-live="polite">{display}</div><label className="field-label">Session length (minutes)<select value={minutes} disabled={running} onChange={(event) => { const value = Number(event.target.value); setMinutes(value); setSecondsLeft(value * 60); }}><option value="15">15 minutes</option><option value="25">25 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option></select></label><div className="hero-actions"><button className="button button-primary" type="button" onClick={() => setRunning(true)} disabled={running || secondsLeft === 0}>{running ? 'Focus session running…' : 'Start focus session'}</button><button className="button button-secondary" type="button" onClick={() => { setRunning(false); setSecondsLeft(minutes * 60); }} >Reset</button></div><p className="helper-text">Keep this tab open while you focus.</p></div>;
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const toolMatch = path.match(/^\/tools\/([^/]+)$/);
  const selectedTool = toolMatch ? TOOLS.find((tool) => tool.id === toolMatch[1]) : null;
  let page;
  if (selectedTool) page = <ToolPage tool={selectedTool} />;
  else if (path === '/about') page = <InfoPage eyebrow="ABOUT TECHGUIDE LAB" title="Useful tools. Clear guidance."><p>TechGuide Lab is a simple directory of practical digital tools designed to help people get everyday tasks done with less friction.</p><p>Our goal is to make useful technology easier to discover and easier to use. We aim for clear descriptions, straightforward interfaces, and tools that focus on a real task.</p></InfoPage>;
  else if (path === '/contact') page = <InfoPage eyebrow="GET IN TOUCH" title="Contact us"><p>Have a suggestion, spotted an issue, or want to recommend a tool? We welcome feedback that helps make TechGuide Lab more useful.</p><p>For now, you can share feedback by opening an issue in the project's public repository or using the contact method listed by the site owner.</p></InfoPage>;
  else if (path === '/privacy') page = <InfoPage eyebrow="YOUR PRIVACY" title="Privacy policy"><p>TechGuide Lab is a directory of browser-based tools. Some tools process the information you enter locally in your browser. Do not enter sensitive personal information into any online tool unless you understand how it will be handled.</p><p>This starter site does not include a custom server or account system. Hosting providers, analytics, or advertising services added by the site owner may process data according to their own policies. Update this policy to accurately describe any services you enable before publishing.</p><p>For privacy questions, contact the site owner through the project's listed contact method.</p></InfoPage>;
  else if (toolMatch && !selectedTool) page = <InfoPage eyebrow="TOOL NOT FOUND" title="We couldn't find that tool"><p>The link may be out of date, or the tool may have moved.</p></InfoPage>;
  else page = <HomePage />;

  return <div className="app-shell"><Header />{page}<Footer /></div>;
}
