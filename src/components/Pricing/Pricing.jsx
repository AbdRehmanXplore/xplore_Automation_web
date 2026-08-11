import { useEffect, useRef, useState } from 'react'
import './Pricing.css'
import CalBookingButton from '../CalBookingButton/CalBookingButton'

const services = [
    { id: 'automations', label: 'AI Automations' },
    { id: 'call-agents', label: 'Call Agents' },
    { id: 'chatbots', label: 'Chatbots' },
    { id: 'websites', label: 'Websites' },
    { id: 'apps', label: 'Apps' },
]

const pricingData = {
    automations: {
        basic: {
            setup: '$149',
            monthly: '$49',
            features: [
                '1 automated workflow',
                'Integration with 2 tools',
                'Basic trigger setup',
                'Email notifications',
                '7 days post-launch support',
            ]
        },
        advanced: {
            setup: '$350',
            monthly: '$99',
            features: [
                'Up to 3 automated workflows',
                'Integration with 5 tools',
                'AI logic and conditional branching',
                'Trigger-based pipeline setup',
                '30 days post-launch support',
                'Performance report after 30 days',
            ]
        },
        custom: {
            features: [
                'Unlimited workflows',
                'Full-stack integrations',
                'Custom AI model training',
                'Dedicated project manager',
                'Ongoing retainer available',
                'Priority support',
            ]
        }
    },
    'call-agents': {
        basic: {
            setup: '$499',
            monthly: '$149',
            features: [
                'Pre-built AI voice agent',
                'Up to 200 mins per month',
                'Basic inbound call flow',
                'Simple FAQ handling',
                '7 days post-launch support',
            ]
        },
        advanced: {
            setup: '$2,497',
            monthly: '$499',
            features: [
                'Fully trained AI voice agent',
                'Up to 500 mins per month',
                'CRM and calendar integration',
                'Inbound call flows (up to 5)',
                'Lead qualification setup',
                '30 days post-launch support',
            ]
        },
        custom: {
            features: [
                'Unlimited call minutes',
                'Multi-language support',
                'Outbound plus inbound campaigns',
                'Custom voice and persona',
                'Advanced CRM sync and reporting',
                'Dedicated success manager',
            ]
        }
    },
    chatbots: {
        basic: {
            setup: '$299',
            monthly: '$79',
            features: [
                'Pre-built chatbot template',
                'Website deployment',
                'Up to 3 conversation flows',
                'Basic lead capture',
                '7 days post-launch support',
            ]
        },
        advanced: {
            setup: '$1,497',
            monthly: '$299',
            features: [
                'Custom-trained chatbot',
                'Deploy on website and 1 channel',
                'Up to 10 conversation flows',
                'Lead capture and CRM handoff',
                'FAQ and support automation',
                '30 days post-launch support',
            ]
        },
        custom: {
            features: [
                'Unlimited conversation flows',
                'Multi-channel deployment',
                'Advanced AI training on your data',
                'E-commerce and payment integration',
                'Analytics and optimisation',
                'Ongoing management available',
            ]
        }
    },
    websites: {
        basic: {
            setup: '$299',
            monthly: '$49',
            features: [
                '3-page professional website',
                'Mobile-responsive design',
                'Basic SEO setup',
                'Contact form included',
                '7 days post-launch support',
            ]
        },
        advanced: {
            setup: '$997',
            monthly: '$149',
            features: [
                'Up to 5-page custom website',
                'Mobile-responsive design',
                'SEO foundation setup',
                'Contact form and booking widget',
                'Google Analytics integration',
                '30 days post-launch support',
            ]
        },
        custom: {
            features: [
                'Unlimited pages and functionality',
                'Custom animations and interactions',
                'E-commerce or membership portal',
                'AI chatbot integration',
                'Full SEO and speed optimisation',
                'Ongoing maintenance available',
            ]
        }
    },
    apps: {
        basic: {
            setup: '$999',
            monthly: '$199',
            features: [
                'Simple web app',
                'Up to 4 core features',
                'User authentication',
                'Basic database setup',
                '14 days post-launch support',
            ]
        },
        advanced: {
            setup: '$3,997',
            monthly: '$699',
            features: [
                'Custom web or mobile app',
                'Up to 10 core features',
                'User authentication and roles',
                'Database and basic AI integration',
                'Admin dashboard included',
                '60 days post-launch support',
            ]
        },
        custom: {
            features: [
                'Unlimited features and modules',
                'Full AI and ML integration',
                'Scalable cloud infrastructure',
                'Multi-platform: web, iOS, Android',
                'API-first architecture',
                'Dedicated development team',
            ]
        }
    }
}

function Pricing() {
    const [activeService, setActiveService] = useState('automations')
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible')
                })
            },
            { threshold: 0.1, rootMargin: '-50px' }
        )
        const elements = sectionRef.current?.querySelectorAll('.reveal')
        elements?.forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const current = pricingData[activeService]

    return (
        <section id="pricing" className="pricing" ref={sectionRef}>
            <div className="container">
                <div className="pricing-header reveal">
                    <span className="section-label mono">Pricing</span>
                    <h2 className="pricing-title">
                        Simple, <span className="accent">honest pricing</span>
                    </h2>
                    <p className="pricing-subtitle mono">Select a service to see its plans</p>
                </div>

                {/* Service selector tabs */}
                <div className="pricing-tabs reveal">
                    {services.map(s => (
                        <button
                            key={s.id}
                            className={`pricing-tab ${activeService === s.id ? 'active' : ''}`}
                            onClick={() => setActiveService(s.id)}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Pricing cards */}
                <div className="pricing-cards pricing-cards-3 reveal">

                    {/* Basic Plan */}
                    <div className="pricing-card">
                        <div className="pricing-card-header">
                            <span className="plan-tier mono">Basic Plan</span>
                            <div className="plan-price-block">
                                <div className="plan-price">{current.basic.setup}</div>
                                <span className="plan-billing mono">one-time setup</span>
                            </div>
                            <div className="plan-monthly-block">
                                <span className="plan-plus">+</span>
                                <div className="plan-monthly-price">{current.basic.monthly}</div>
                                <span className="plan-billing mono">/ month</span>
                            </div>
                        </div>
                        <ul className="plan-features">
                            {current.basic.features.map((f, i) => (
                                <li key={i}><i className="ri-check-line"></i>{f}</li>
                            ))}
                        </ul>
                        <CalBookingButton variant="ghost" className="plan-cta">
                            Get Started <i className="ri-arrow-right-line"></i>
                        </CalBookingButton>
                    </div>

                    {/* Advanced Plan */}
                    <div className="pricing-card pricing-card-highlighted">
                        <div className="pricing-card-badge">Most Popular</div>
                        <div className="pricing-card-header">
                            <span className="plan-tier mono">Advanced Plan</span>
                            <div className="plan-price-block">
                                <div className="plan-price">{current.advanced.setup}</div>
                                <span className="plan-billing mono">one-time setup</span>
                            </div>
                            <div className="plan-monthly-block">
                                <span className="plan-plus">+</span>
                                <div className="plan-monthly-price">{current.advanced.monthly}</div>
                                <span className="plan-billing mono">/ month</span>
                            </div>
                        </div>
                        <ul className="plan-features">
                            {current.advanced.features.map((f, i) => (
                                <li key={i}><i className="ri-check-line"></i>{f}</li>
                            ))}
                        </ul>
                        <CalBookingButton variant="ghost" className="plan-cta">
                            Get Started <i className="ri-arrow-right-line"></i>
                        </CalBookingButton>
                    </div>

                    {/* Custom Plan */}
                    <div className="pricing-card pricing-card-featured">
                        <div className="pricing-card-badge">Best Value</div>
                        <div className="pricing-card-header">
                            <span className="plan-tier mono">Custom Plan</span>
                            <div className="plan-price plan-price-custom">
                                <span>Let's Talk</span>
                            </div>
                            <span className="plan-billing mono">tailored to your exact needs</span>
                        </div>
                        <ul className="plan-features">
                            {current.custom.features.map((f, i) => (
                                <li key={i}><i className="ri-check-line"></i>{f}</li>
                            ))}
                        </ul>
                        <CalBookingButton variant="primary" className="plan-cta plan-cta-primary">
                            Book a Call
                        </CalBookingButton>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Pricing
