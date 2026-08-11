import { useEffect, useRef } from 'react'
import './Capabilities.css'
import CurvedLoop from '../CurvedLoop'

const capabilities = [
    {
        icon: 'ri-loop-right-line',
        title: 'AI Automations',
        description: 'Make.com, n8n and Zapier workflows. Repetitive tasks handled automatically without human input.',
    },
    {
        icon: 'ri-phone-line',
        title: 'AI Call Agents',
        description: 'Voice agents that answer every call 24/7. Leads qualified, appointments booked and never missed.',
    },
    {
        icon: 'ri-chat-3-line',
        title: 'AI Chatbots',
        description: 'Custom-trained on your data. Handles queries, captures leads and converts visitors around the clock.',
    },
    {
        icon: 'ri-window-line',
        title: 'Websites',
        description: 'Fast, responsive and conversion-focused. Built to rank, load instantly and turn visitors into clients.',
    },
    {
        icon: 'ri-smartphone-line',
        title: 'Apps',
        description: 'Web and mobile applications with AI at the core. Client portals, dashboards and SaaS products built end-to-end.',
    },
    {
        icon: 'ri-database-2-line',
        title: 'Integrations',
        description: 'CRM syncing, API connections and data pipelines. Your tools talking to each other in real time.',
    },
]

const tools = ['MAKE.COM', 'N8N', 'VAPI', 'OPENAI', 'RETELL AI', 'ZAPIER', 'BOTPRESS', 'VOICEFLOW', 'REACT', 'PYTHON']

function Capabilities() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1, rootMargin: '-50px' }
        )

        const elements = sectionRef.current?.querySelectorAll('.reveal')
        elements?.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <section id="capabilities" className="capabilities" ref={sectionRef}>
            <div className="container">
                <div className="cap-header-row reveal">
                    <span className="section-label mono">Capabilities</span>
                    <h2 className="capabilities-title">
                        What we <span className="accent">bring to the table</span>
                    </h2>
                </div>

                <div className="cap-grid">
                    {capabilities.map((cap, index) => (
                        <div
                            className={`cap-card reveal reveal-delay-${(index % 3) + 1}`}
                            key={index}
                        >
                            <div className="cap-icon">
                                <i className={cap.icon}></i>
                            </div>
                            <div className="cap-text">
                                <h3 className="cap-title">{cap.title}</h3>
                                <p className="cap-desc">{cap.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tool curved loop */}
                <div className="reveal" style={{ margin: '1rem 0' }}>
                    <CurvedLoop
                        marqueeText={tools.join(' x ') + ' x '}
                        speed={0.8}
                        curveAmount={0}
                        direction="left"
                        interactive
                        className="capabilities-loop-text"
                    />
                </div>
            </div>
        </section>
    )
}

export default Capabilities
