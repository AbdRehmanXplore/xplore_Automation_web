import { useEffect, useRef } from 'react'
import './Narrative.css'

const problems = [
    {
        number: '01',
        title: "Leads slipping through the cracks",
        description: "Every missed call is a missed deal. Without automation, your business leaks revenue every single day."
    },
    {
        number: '02',
        title: "Repetitive tasks eating your time",
        description: "Hours spent on data entry, follow-ups and manual workflows that a well-built system could run in seconds."
    },
    {
        number: '03',
        title: "Growth hitting a ceiling",
        description: "You cannot scale a business that depends entirely on human bandwidth. There is a smarter way."
    }
]

function Narrative() {
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
        <section id="process" className="narrative" ref={sectionRef}>
            <div className="container">
                {/* Section header */}
                <div className="narrative-header reveal">
                    <span className="section-label mono">The Problem</span>
                    <h2 className="narrative-title">
                        Your business deserves<br />
                        better than <span className="strike">manual everything</span>
                    </h2>
                </div>

                {/* Problem cards */}
                <div className="problem-grid">
                    {problems.map((problem, index) => (
                        <div
                            className={`problem-card reveal reveal-delay-${index + 1}`}
                            key={problem.number}
                        >
                            <span className="problem-number mono">{problem.number}</span>
                            <h3 className="problem-title">{problem.title}</h3>
                            <p className="problem-desc">{problem.description}</p>
                        </div>
                    ))}
                </div>

                {/* Solution */}
                <div className="solution reveal">
                    <div className="solution-line"></div>
                    <div className="solution-content">
                        <span className="section-label mono accent">The Solution</span>
                        <h3 className="solution-title">
                            Your data. Our AI.<br />
                            <span className="accent">Results that run 24/7.</span>
                        </h3>
                        <p className="solution-desc">
                            We build and deploy intelligent systems tailored to your business.
                            No generic tools. No half measures. Just AI that works.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Narrative
