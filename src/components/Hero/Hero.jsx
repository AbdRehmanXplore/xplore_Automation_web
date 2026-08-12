import { useEffect, useRef } from 'react'
import './Hero.css'
import Button from '../Button/Button'
import CalBookingButton from '../CalBookingButton/CalBookingButton'

function Hero() {
    const heroRef = useRef(null)

    useEffect(() => {
        const hero = heroRef.current
        if (!hero) return

        const handleMouseMove = (e) => {
            const rect = hero.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            hero.style.setProperty('--mouse-x', `${x}%`)
            hero.style.setProperty('--mouse-y', `${y}%`)
        }

        hero.addEventListener('mousemove', handleMouseMove)
        return () => hero.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <section className="hero" ref={heroRef}>
            <div className="hero-spotlight"></div>

            <div className="container">
                <div className="hero-content">
                    {/* Main title */}
                    <h1 className="hero-title">
                        <span className="title-line">
                            <span className="title-word">BUILD</span>
                            <span className="title-arrow">x</span>
                            <span className="title-word accent">AUTOMATE</span>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle">
                        We deploy AI systems that work around the clock so your business can
                        <span className="highlight"> scale without limits.</span>
                    </p>

                    {/* CTA Group */}
                    <div className="hero-cta">
                        <Button href="#work" variant="primary" magnetic>
                            View Our Work <i className="ri-arrow-right-line"></i>
                        </Button>
                        <CalBookingButton className="hero-booking-button">
                            <span className="hero-booking-title">Book Free Call</span>
                            <span className="hero-booking-chip mono">Google Meet</span>
                        </CalBookingButton>
                    </div>

                    {/* Trust bar */}
                    <div className="hero-trust">
                        <span className="trust-label mono">Services</span>
                        <div className="trust-logos">
                            <span className="trust-logo">AI Automations</span>
                            <span className="trust-divider">•</span>
                            <span className="trust-logo">Call Agents</span>
                            <span className="trust-divider">•</span>
                            <span className="trust-logo">Chatbots</span>
                            <span className="trust-divider">•</span>
                            <span className="trust-logo">Websites</span>
                            <span className="trust-divider">•</span>
                            <span className="trust-logo">Apps</span>
                        </div>
                    </div>
                </div>

                {/* Stats strip */}
                <div className="hero-stats">
                    <div className="stat">
                        <span className="stat-number">50+</span>
                        <span className="stat-label mono">Projects Delivered</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <span className="stat-number">5</span>
                        <span className="stat-label mono">AI Service Lines</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <span className="stat-number">24/7</span>
                        <span className="stat-label mono">Systems Run Non-Stop</span>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll">
                <span className="mono">Scroll</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    )
}

export default Hero
