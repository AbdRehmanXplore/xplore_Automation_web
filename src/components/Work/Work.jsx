import { useEffect, useRef } from 'react'
import './Work.css'
import Button from '../Button/Button'

const workItems = [
    {
        index: '01',
        title: 'INVOICE PROCESSING PIPELINE',
        category: 'AI Automations',
        metric: '20+ hrs saved weekly',
        href: '#booking',
        description: 'End-to-end automation extracting invoice data and syncing to accounting software'
    },
    {
        index: '02',
        title: '24/7 INBOUND VOICE AGENT',
        category: 'AI Call Agents',
        metric: '300+ calls handled monthly',
        href: '#booking',
        description: 'AI voice agent qualifying leads and booking appointments around the clock'
    },
    {
        index: '03',
        title: 'CUSTOMER SUPPORT CHATBOT',
        category: 'AI Chatbots',
        metric: '70% ticket deflection',
        href: '#booking',
        description: 'Knowledge-base trained bot resolving queries instantly across all channels'
    }
]

function Work() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1, rootMargin: '-50px' }
        )

        const elements = sectionRef.current?.querySelectorAll('.reveal')
        elements?.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <section id="work" className="work" ref={sectionRef}>
            <div className="container">
                <div className="work-header reveal">
                    <div className="work-header-left">
                        <span className="section-label mono">Selected Work</span>
                        <h2 className="work-title">
                            Transformations<br />
                            <span className="text-muted">that perform</span>
                        </h2>
                    </div>
                </div>

                <div className="work-grid">
                    {workItems.map((item, idx) => (
                        <a
                            href={item.href}
                            className={`work-item reveal reveal-delay-${idx + 1}`}
                            key={item.index}
                        >
                            <div className="work-item-header">
                                <span className="work-index mono">{item.index}</span>
                                <div className="work-meta">
                                    <span className="work-category">{item.category}</span>
                                    <span className="work-metric mono">{item.metric}</span>
                                </div>
                            </div>
                            <h3 className="work-item-title">{item.title}</h3>
                            <p className="work-item-desc">{item.description}</p>
                            <div className="work-item-arrow">
                                <i className="ri-arrow-right-up-line"></i>
                            </div>
                        </a>
                    ))}

                    <a
                        href="#portfolio"
                        className="portfolio-window reveal reveal-delay-4"
                    >
                        {/* macOS title bar */}
                        <div className="window-titlebar">
                            <div className="window-dots">
                                <span className="dot dot-red"></span>
                                <span className="dot dot-yellow"></span>
                                <span className="dot dot-green"></span>
                            </div>
                            <span className="window-title mono">portfolio - Xplore Automations</span>
                        </div>

                        {/* Window body */}
                        <div className="window-body">
                            <div className="window-folder-icon">
                                <i className="ri-folder-5-fill"></i>
                            </div>
                            <div className="window-info">
                                <span className="window-heading">Full Portfolio</span>
                                <span className="window-sub mono">View all AI projects and case studies</span>
                            </div>
                            <div className="window-cta">
                                <span className="window-cta-text mono">Open</span>
                                <i className="ri-arrow-right-up-line"></i>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Work
