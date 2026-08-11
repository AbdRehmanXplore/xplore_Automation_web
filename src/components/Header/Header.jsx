import { useState, useEffect } from 'react'
import './Header.css'
import GlassSurface from '../GlassSurface'
import Button from '../Button/Button'
import CalBookingButton from '../CalBookingButton/CalBookingButton'
import logo from '../../assets/logo.png'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setIsMenuOpen(false)
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMenuOpen])

    const handleNavClick = () => {
        setIsMenuOpen(false)
    }

    return (
        <>
            <GlassSurface
                className="header"
                width="min(1200px, 90%)"
                height="auto"
                borderRadius={40}
                borderWidth={0}
                opacity={0.8}
                blur={12}
                displace={0.3}
                distortionScale={-180}
                redOffset={0}
                greenOffset={10}
                blueOffset={20}
                mixBlendMode="screen"
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 100
                }}
            >
                <div className="container">
                    <nav className="nav">
                        <a href="#" className="logo-link">
                            <img src={logo} alt="Xplore Automations" className="logo" />
                        </a>

                        <div className="nav-center">
                            <ul className="nav-links">
                                <li><a href="#work" className="nav-link">Work</a></li>
                                <li><a href="#capabilities" className="nav-link">Services</a></li>
                                <li><a href="#pricing" className="nav-link">Pricing</a></li>
                                <li><a href="#contact" className="nav-link">Contact</a></li>
                            </ul>
                        </div>

                        <div className="nav-right">
                            <CalBookingButton variant="primary">
                                Book a Call
                            </CalBookingButton>
                        </div>

                        <button
                            className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
                            aria-label="Menu"
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span></span>
                            <span></span>
                        </button>
                    </nav>
                </div>
            </GlassSurface>

            {/* Mobile Menu Overlay */}
            <div
                className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                <nav className="mobile-nav">
                    <ul className="mobile-nav-links">
                        <li>
                            <a href="#work" className="mobile-nav-link" onClick={handleNavClick}>
                                <span className="mobile-nav-number">01</span>
                                Work
                            </a>
                        </li>
                        <li>
                            <a href="#capabilities" className="mobile-nav-link" onClick={handleNavClick}>
                                <span className="mobile-nav-number">02</span>
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#pricing" className="mobile-nav-link" onClick={handleNavClick}>
                                <span className="mobile-nav-number">03</span>
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="mobile-nav-link" onClick={handleNavClick}>
                                <span className="mobile-nav-number">04</span>
                                Contact
                            </a>
                        </li>
                    </ul>

                    <div className="mobile-menu-footer">
                        <div className="mobile-status">
                            <span className="status-dot"></span>
                            <span className="mono">Available for new projects</span>
                        </div>
                        <CalBookingButton
                            variant="primary"
                            onClick={handleNavClick}
                        >
                            Book a Call
                        </CalBookingButton>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Header
