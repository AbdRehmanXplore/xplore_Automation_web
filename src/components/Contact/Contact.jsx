import { useEffect, useRef, useState } from 'react'
import './Contact.css'
import Button from '../Button/Button'

function Contact() {
    const sectionRef = useRef(null)
    const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [sending, setSending] = useState(false)

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

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = true
        if (!form.email.trim() || !form.email.includes('@')) e.email = true
        if (!form.message.trim()) e.message = true
        return e
    }

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setErrors(prev => ({ ...prev, [e.target.name]: false }))
    }

// Replace with your key from web3forms.com
const WEB3FORMS_KEY = '9b253184-d8fb-4685-8040-e9cde83d616a'

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) { setErrors(errs); return }

        setSending(true)
        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: `New Enquiry from ${form.name.trim()}${form.service ? ' | ' + form.service : ''}`,
                    name: form.name.trim(),
                    email: form.email.trim(),
                    service: form.service || 'Not specified',
                    message: form.message.trim(),
                }),
            })
            const data = await res.json()
            if (data.success) {
                setSubmitted(true)
            } else {
                throw new Error(data.message || 'Failed')
            }
        } catch (err) {
            console.error(err)
            alert('Something went wrong. Please email us at hello@xploreautomations.com')
        } finally {
            setSending(false)
        }
    }

    return (
        <section id="contact" className="contact" ref={sectionRef}>
            <div className="container">
                <div className="contact-header reveal">
                    <span className="section-label mono">Get In Touch</span>
                    <h2 className="contact-title">
                        Start your <span className="accent">project</span>
                    </h2>
                    <p className="contact-subtitle">
                        Tell us about your business and what you want to build. We get back to you within 24 hours.
                    </p>
                </div>

                <div className="contact-layout">
                    {/* Info column */}
                    <div className="contact-info reveal">
                        <div className="contact-info-item">
                            <div className="contact-info-icon">
                                <i className="ri-mail-line"></i>
                            </div>
                            <div>
                                <div className="contact-info-label mono">Email</div>
                                <a href="mailto:hello@xploreautomations.com" className="contact-info-value">
                                    hello@xploreautomations.com
                                </a>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-info-icon">
                                <i className="ri-time-line"></i>
                            </div>
                            <div>
                                <div className="contact-info-label mono">Response Time</div>
                                <div className="contact-info-value">Within 24 hours</div>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-info-icon">
                                <i className="ri-video-chat-line"></i>
                            </div>
                            <div>
                                <div className="contact-info-label mono">Discovery Call</div>
                                <div className="contact-info-value">Free 30-minute strategy session</div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="contact-form-wrap reveal reveal-delay-1">
                        {submitted ? (
                            <div className="contact-success">
                                <div className="contact-success-icon">
                                    <i className="ri-check-line"></i>
                                </div>
                                <h3 className="contact-success-title">Message Sent Successfully!</h3>
                                <p className="contact-success-text">
                                    Thanks for reaching out! We've received your message and will get back to you within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                                <div className="form-row">
                                    <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                                        <label className="form-label" htmlFor="cf-name">Your Name</label>
                                        <input
                                            id="cf-name"
                                            className="form-input"
                                            type="text"
                                            name="name"
                                            placeholder="John Smith"
                                            value={form.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                        />
                                    </div>
                                    <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                                        <label className="form-label" htmlFor="cf-email">Email Address</label>
                                        <input
                                            id="cf-email"
                                            className="form-input"
                                            type="email"
                                            name="email"
                                            placeholder="john@company.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="cf-service">Service Interested In</label>
                                    <select
                                        id="cf-service"
                                        className="form-input form-select"
                                        name="service"
                                        value={form.service}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a service</option>
                                        <option>AI Automations</option>
                                        <option>AI Call Agents</option>
                                        <option>AI Chatbots</option>
                                        <option>Website</option>
                                        <option>App Development</option>
                                        <option>Not Sure Yet</option>
                                    </select>
                                </div>

                                <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                                    <label className="form-label" htmlFor="cf-message">Project Description</label>
                                    <textarea
                                        id="cf-message"
                                        className="form-input form-textarea"
                                        name="message"
                                        placeholder="Tell us about your business, what you want to automate or build, and any deadlines or budget in mind..."
                                        rows={5}
                                        value={form.message}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="contact-submit btn"
                                    disabled={sending}
                                >
                                    <span>{sending ? 'Opening email...' : 'Send Message'}</span>
                                    <i className="ri-send-plane-line"></i>
                                </button>

                                <p className="form-note mono">We respect your privacy. No spam, ever.</p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
