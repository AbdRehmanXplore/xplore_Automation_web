import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cases, getCaseIndustries } from '../data/cases'
import '../components/Button/Button.css'
import './CaseListPage.css'

function CaseListPage() {
    const [activeIndustry, setActiveIndustry] = useState('All')
    const industries = getCaseIndustries()

    const filtered = activeIndustry === 'All'
        ? cases
        : cases.filter(c => c.industry === activeIndustry)

    useEffect(() => {
        document.title = 'Case Studies — Xplore Automations'
        const meta = document.querySelector('meta[name="description"]')
        if (meta) meta.setAttribute('content', 'Real automation case studies — see exactly how Xplore Automations helped businesses in Pakistan save time, cut costs, and grow revenue.')
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="case-list-page">
            <div className="case-page-hero">
                <div className="container">
                    <div className="case-page-hero-inner">
                        <span className="case-page-label mono">/ Case Studies</span>
                        <h1 className="case-page-title">
                            Real Results,<br />
                            <span className="text-accent">Real Numbers</span>
                        </h1>
                        <p className="case-page-subtitle">
                            No fluff, no estimates. These are the actual outcomes we delivered for real businesses — with full transparency on what we built and how.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Industry Filter */}
                <div className="case-filter">
                    {industries.map(ind => (
                        <button
                            key={ind}
                            className={`case-filter-btn ${activeIndustry === ind ? 'active' : ''}`}
                            onClick={() => setActiveIndustry(ind)}
                        >
                            {ind}
                        </button>
                    ))}
                </div>

                {/* Cases Grid */}
                <div className="case-grid">
                    {filtered.map((c, i) => (
                        <Link
                            key={c.slug}
                            to={`/cases/${c.slug}`}
                            className="case-card"
                            style={{ animationDelay: `${i * 0.12}s` }}
                        >
                            <div className="case-card-header">
                                <div className="case-card-meta">
                                    <span className="case-industry-badge">{c.industry}</span>
                                    <span className="case-location mono">{c.location}</span>
                                </div>
                                <div className="case-hero-stat">
                                    <span className="case-stat-value">{c.heroStat.value}</span>
                                    <span className="case-stat-label">{c.heroStat.label}</span>
                                </div>
                            </div>

                            <h2 className="case-card-title">{c.title}</h2>
                            <p className="case-card-excerpt">{c.excerpt}</p>

                            {/* Metrics Preview */}
                            <div className="case-metrics-row">
                                {c.metrics.slice(0, 3).map(m => (
                                    <div key={m.label} className="case-metric-chip">
                                        <span className="case-metric-icon">{m.icon}</span>
                                        <div>
                                            <span className="case-metric-after">{m.after}</span>
                                            <span className="case-metric-label">{m.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="case-card-footer">
                                <span className="case-duration mono">{c.duration} project</span>
                                <span className="case-card-cta">
                                    View Case Study
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="cases-bottom-cta">
                    <p className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.78rem', letterSpacing: '0.08em' }}>YOUR BUSINESS COULD BE NEXT</p>
                    <h2>Ready to see what automation can do for you?</h2>
                    <a href="/#contact" className="btn btn-primary">Book a Free Strategy Call</a>
                </div>
            </div>
        </div>
    )
}

export default CaseListPage
