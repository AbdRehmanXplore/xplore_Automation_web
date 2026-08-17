import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { getCaseBySlug, cases } from '../data/cases'
import '../components/Button/Button.css'
import './CasePostPage.css'

function CasePostPage() {
    const { slug } = useParams()
    const c = getCaseBySlug(slug)

    useEffect(() => {
        if (!c) return
        document.title = `${c.title} — Xplore Automations`
        let meta = document.querySelector('meta[name="description"]')
        if (meta) meta.setAttribute('content', c.metaDescription)

        // JSON-LD for Case Study
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: c.title,
            description: c.metaDescription,
            author: { '@type': 'Organization', name: 'Xplore Automations' },
            publisher: {
                '@type': 'Organization',
                name: 'Xplore Automations',
                url: 'https://xploreautomations.com'
            },
            datePublished: `${c.date}-01`,
            keywords: c.tags.join(', '),
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://xploreautomations.com/cases/${c.slug}`
            }
        }
        let script = document.getElementById('case-jsonld')
        if (!script) {
            script = document.createElement('script')
            script.id = 'case-jsonld'
            script.type = 'application/ld+json'
            document.head.appendChild(script)
        }
        script.textContent = JSON.stringify(jsonLd)

        window.scrollTo(0, 0)
        return () => {
            const el = document.getElementById('case-jsonld')
            if (el) el.remove()
        }
    }, [c])

    if (!c) return <Navigate to="/cases" replace />

    const related = cases.filter(x => x.slug !== slug && x.industry === c.industry).slice(0, 1)

    return (
        <div className="case-post-page">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb" aria-label="breadcrumb">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <Link to="/cases">Case Studies</Link>
                    <span>/</span>
                    <span>{c.industry}</span>
                </nav>

                {/* Hero */}
                <header className="case-post-hero">
                    <div className="case-post-hero-meta">
                        <span className="case-industry-badge">{c.industry}</span>
                        <span className="mono case-post-location">{c.location}</span>
                        <span className="mono case-post-duration">{c.duration} project</span>
                    </div>
                    <h1 className="case-post-title">{c.title}</h1>
                    <p className="case-post-excerpt">{c.excerpt}</p>
                </header>

                {/* Metrics Banner */}
                <div className="case-metrics-banner">
                    {c.metrics.map(m => (
                        <div key={m.label} className="case-metric-block">
                            <span className="metric-icon">{m.icon}</span>
                            <div className="metric-values">
                                <div className="metric-row">
                                    <span className="metric-before">{m.before}</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10h12M12 5l5 5-5 5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="metric-after">{m.after}</span>
                                </div>
                                <span className="metric-label">{m.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="case-post-layout">
                    <article className="case-post-article">
                        {/* Problem */}
                        <section className="case-section">
                            <div className="case-section-label">
                                <span className="case-section-num mono">01</span>
                                <h2>The Problem</h2>
                            </div>
                            <div className="case-section-content">
                                {c.problem.trim().split('\n\n').map((p, i) => (
                                    <p key={i}>{p.trim()}</p>
                                ))}
                            </div>
                        </section>

                        {/* Solution */}
                        <section className="case-section">
                            <div className="case-section-label">
                                <span className="case-section-num mono">02</span>
                                <h2>What We Built</h2>
                            </div>
                            <div className="case-section-content">
                                <MarkdownRenderer content={c.solution.trim()} />
                            </div>
                        </section>

                        {/* Results */}
                        <section className="case-section">
                            <div className="case-section-label">
                                <span className="case-section-num mono">03</span>
                                <h2>The Results</h2>
                            </div>
                            <div className="case-section-content">
                                <MarkdownRenderer content={c.results.trim()} />
                            </div>
                        </section>

                        {/* Testimonial */}
                        {c.testimonial && (
                            <blockquote className="case-testimonial">
                                <p className="case-testimonial-text">"{c.testimonial.text}"</p>
                                <footer className="case-testimonial-footer">
                                    <span className="case-testimonial-author">{c.testimonial.author}</span>
                                    <span className="case-testimonial-company">{c.testimonial.company}</span>
                                </footer>
                            </blockquote>
                        )}

                        {/* Tags */}
                        <div className="case-tags">
                            {c.tags.map(tag => (
                                <span key={tag} className="blog-tag">#{tag}</span>
                            ))}
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="case-post-sidebar">
                        <div className="sidebar-widget">
                            <h4 className="sidebar-widget-title mono">Project Info</h4>
                            <div className="case-info-list">
                                <div className="case-info-row">
                                    <span className="case-info-key">Industry</span>
                                    <span className="case-info-val">{c.industry}</span>
                                </div>
                                <div className="case-info-row">
                                    <span className="case-info-key">Location</span>
                                    <span className="case-info-val">{c.location}</span>
                                </div>
                                <div className="case-info-row">
                                    <span className="case-info-key">Duration</span>
                                    <span className="case-info-val">{c.duration}</span>
                                </div>
                                <div className="case-info-row">
                                    <span className="case-info-key">Client</span>
                                    <span className="case-info-val">{c.client}</span>
                                </div>
                            </div>
                        </div>

                        <div className="sidebar-widget sidebar-cta-card">
                            <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Get Similar Results</span>
                            <h4>Want this for your business?</h4>
                            <p>Book a free 30-minute strategy call. No commitment — just clarity on what automation can do for you.</p>
                            <a href="/#contact" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>Book a Free Call</a>
                        </div>

                        {related.length > 0 && (
                            <div className="sidebar-widget">
                                <h4 className="sidebar-widget-title mono">Related Case</h4>
                                {related.map(r => (
                                    <Link key={r.slug} to={`/cases/${r.slug}`} className="sidebar-related-item">
                                        <span className="sidebar-related-category">{r.industry}</span>
                                        <span className="sidebar-related-title">{r.title}</span>
                                        <span className="sidebar-related-time mono">{r.heroStat.value} {r.heroStat.label}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    )
}

// Simple markdown renderer
function MarkdownRenderer({ content }) {
    const lines = content.split('\n')
    const elements = []
    let i = 0

    while (i < lines.length) {
        const line = lines[i]
        if (line.startsWith('**') && line.endsWith('**')) {
            elements.push(<h3 key={i} style={{ color: 'var(--text)', marginBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*/g, '') }} />)
        } else if (line.startsWith('- ')) {
            const items = []
            while (i < lines.length && lines[i].startsWith('- ')) {
                items.push(lines[i].slice(2))
                i++
            }
            elements.push(
                <ul key={`ul-${i}`}>
                    {items.map((item, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
                    ))}
                </ul>
            )
            continue
        } else if (line === '') {
            // skip
        } else {
            elements.push(<p key={i} dangerouslySetInnerHTML={{ __html: parseInline(line) }} />)
        }
        i++
    }
    return <div className="case-prose">{elements}</div>
}

function parseInline(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
}

export default CasePostPage
