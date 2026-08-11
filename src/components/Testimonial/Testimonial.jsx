import { useEffect, useRef, useState } from 'react'
import './Testimonial.css'

function AnimatedMetric({ end, suffix = '', decimals = 0, duration = 1500 }) {
    const [value, setValue] = useState(0)
    const [hasAnimated, setHasAnimated] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true)
                    const startTime = performance.now()

                    const animate = (now) => {
                        const elapsed = now - startTime
                        const progress = Math.min(elapsed / duration, 1)
                        const eased = 1 - Math.pow(1 - progress, 3)
                        setValue(eased * end)
                        if (progress < 1) {
                            requestAnimationFrame(animate)
                        } else {
                            setValue(end)
                        }
                    }
                    requestAnimationFrame(animate)
                }
            },
            { threshold: 0.5 }
        )

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [end, duration, hasAnimated])

    const display = decimals > 0
        ? value.toFixed(decimals)
        : Math.round(value)

    return <span className="metric-value" ref={ref}>{display}{suffix}</span>
}

const testimonials = [
    {
        initials: 'JA',
        name: 'James A.',
        role: 'Founder, Apex Property Group',
        service: 'Call Agents',
        quote: 'Before the AI call agent we were losing leads every single night and weekend. Now the agent answers every call, qualifies the lead and books them into our calendar. We have not missed a single enquiry in 4 months. Complete game changer for our business.',
        metrics: [
            { label: 'Leads Captured', end: 100, suffix: '%', decimals: 0, duration: 1200 },
            { label: 'Response Time', end: 0, suffix: 's', decimals: 0, duration: 800, display: '<3s' },
            { label: 'ROI in Month 1', end: 4, suffix: 'x', decimals: 0, duration: 1400 }
        ]
    }
]

const allTestimonials = [
    {
        initials: 'MK',
        name: 'Marcus K.',
        role: 'Operations Director, TerraScale Solutions',
        service: 'Automations',
        quote: 'Xplore Automations eliminated our entire manual data entry process. What used to take my team 3 days every week now runs automatically overnight. The ROI was visible within the first month.'
    },
    {
        initials: 'SL',
        name: 'Sarah L.',
        role: 'CEO, Luminary Analytics',
        service: 'Automations',
        quote: 'We saved over 40 hours a week across our team after they automated our reporting pipeline. The system runs flawlessly and the team at Xplore was incredibly thorough in their setup.'
    },
    {
        initials: 'RC',
        name: 'Rachel C.',
        role: 'Sales Manager, SwiftMove Logistics',
        service: 'Call Agents',
        quote: 'We used to lose at least 15 leads a week to voicemail. Since deploying the AI agent, every call gets answered, every lead gets logged and our conversion rate has jumped 22%. Not a single lead lost since day one.'
    },
    {
        initials: 'TW',
        name: 'Tom W.',
        role: 'Head of CX, NovaNest SaaS',
        service: 'Chatbots',
        quote: 'Our chatbot handles 70% of customer queries automatically day and night. Response times dropped from hours to seconds. Customer satisfaction scores went up and our support team is finally breathing again.'
    },
    {
        initials: 'FM',
        name: 'Fatima M.',
        role: 'Marketing Director, Elara Consulting',
        service: 'Chatbots',
        quote: 'The chatbot they built captures leads around the clock. Even at 2am when no one is in the office. We are closing deals that we would have completely missed before. It paid for itself in the second week.'
    },
    {
        initials: 'AO',
        name: 'Amara O.',
        role: 'Partner, Osei Legal Associates',
        service: 'Websites',
        quote: 'The new site is blazing fast and loads in under a second on mobile. Our Google ranking improved within weeks and consultation bookings doubled. The design is sleek, professional and everything works perfectly.'
    },
    {
        initials: 'NK',
        name: 'Nadia K.',
        role: 'Director, Vertex Financial Services',
        service: 'Apps',
        quote: 'Xplore built our client portal from scratch in 6 weeks. It handles everything from onboarding to document signing and project updates. Our clients love it and it saves us enormous operational time every single week.'
    }
]

function Testimonial() {
    const sectionRef = useRef(null)
    const [activeIdx, setActiveIdx] = useState(0)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.2 }
        )

        const elements = sectionRef.current?.querySelectorAll('.reveal')
        elements?.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <section className="testimonial" ref={sectionRef}>
            <div className="container">
                <div className="testimonial-header reveal">
                    <div className="quote-mark">"</div>
                    <span className="testimonial-label mono">Testimonials</span>
                    <h2 className="testimonial-title">
                        What our <span className="accent">clients say</span>
                    </h2>
                </div>

                {/* Featured testimonial */}
                <div className="testimonial-layout">
                    {/* Left: Author card */}
                    <div className="testimonial-left reveal">
                        <div className="testimonial-author-card vertical-layout">
                            <div className="author-square-avatar-container">
                                <div className="author-initials-avatar">
                                    {testimonials[0].initials}
                                </div>
                            </div>

                            <div className="author-info-vertical">
                                <div className="author-name-row">
                                    <span className="author-name-large">{testimonials[0].name}</span>
                                    <span className="author-verified" title="Verified Client">
                                        <i className="ri-verified-badge-fill"></i>
                                    </span>
                                </div>
                                <span className="author-role mono">{testimonials[0].role}</span>

                                <div className="author-stats-boxes">
                                    <div className="author-stat-box">
                                        <i className="ri-robot-line"></i>
                                        <div className="stat-box-info">
                                            <span className="stat-box-val">AI</span>
                                            <span className="stat-box-lbl">Call Agent</span>
                                        </div>
                                    </div>
                                    <div className="author-stat-box">
                                        <i className="ri-verified-badge-fill"></i>
                                        <div className="stat-box-info">
                                            <span className="stat-box-val">4 mo</span>
                                            <span className="stat-box-lbl">zero missed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Service badge card */}
                        <div className="testimonial-video-card" style={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.75rem', padding: '2rem' }}>
                            <i className="ri-phone-fill" style={{ fontSize: '2.5rem', color: 'var(--accent)' }}></i>
                            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Call Agent Project</span>
                        </div>
                    </div>

                    {/* Right: Quote text */}
                    <div className="testimonial-right reveal reveal-delay-1">
                        <blockquote className="testimonial-quote">
                            <p>{testimonials[0].quote}</p>
                        </blockquote>

                        {/* Metrics bar */}
                        <div className="metrics-bar">
                            <div className="metric-item">
                                <AnimatedMetric end={100} suffix="%" decimals={0} duration={1200} />
                                <span className="metric-label mono">Leads Captured</span>
                            </div>
                            <div className="metric-divider"></div>
                            <div className="metric-item">
                                <span className="metric-value">24/7</span>
                                <span className="metric-label mono">Always On</span>
                            </div>
                            <div className="metric-divider"></div>
                            <div className="metric-item">
                                <AnimatedMetric end={4} suffix="x" decimals={0} duration={1400} />
                                <span className="metric-label mono">ROI Month 1</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional testimonials grid */}
                <div className="extra-testimonials reveal" style={{ marginTop: '3rem' }}>
                    <div className="extra-testimonials-grid">
                        {allTestimonials.map((t, i) => (
                            <div
                                key={i}
                                className={`extra-card reveal reveal-delay-${(i % 3) + 1}`}
                                onClick={() => setActiveIdx(i)}
                            >
                                <div className="extra-card-header">
                                    <div className="extra-avatar">{t.initials}</div>
                                    <div>
                                        <div className="extra-name">{t.name}</div>
                                        <div className="extra-role mono">{t.role}</div>
                                    </div>
                                    <span className="extra-service-tag">{t.service}</span>
                                </div>
                                <p className="extra-quote">{t.quote}</p>
                                <div className="extra-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonial
