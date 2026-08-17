import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import CalBookingButton from '../CalBookingButton/CalBookingButton'
import logo from '../../assets/logo.png'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setIsMenuOpen(false)
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    // Scroll detection for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
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
            <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
                <div className="container">
                    <nav className="nav">
                        <a href="#" className="logo-link">
                            <img src={logo} alt="Xplore Automations" className="logo" />
                        </a>

                        <div className="nav-center">
                            <ul className="nav-links">
                                <li><a href="/#work" className="nav-link">Work</a></li>
                                <li><a href="/#capabilities" className="nav-link">Services</a></li>
                                <li><a href="/#pricing" className="nav-link">Pricing</a></li>
                                <li><Link to="/cases" className="nav-link">Cases</Link></li>
                                <li><Link to="/blog" className="nav-link">Blog</Link></li>
                                <li><a href="/#contact" className="nav-link">Contact</a></li>
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
            </header>

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
                            <a href="/#work" className="mobile-nav-link" onClick={handleNavClick}>
                                <span className="mobile-nav-number">01</span>
                                Work
                            </a>
                        </li>
                        <li>
                            <a href="/#capabilities" className="mobile-nav-link" onClick={handleNavClick}>
                                <span className="mobile-nav-number">02</span>
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="/#pricing" className="mobile-nav-link" onClick={handleNavClick}>
                                <span className="mobile-nav-number">03</span>
                                Pricing
                            </a>
                        </li>
                        <li>
                            <Link to="/cases" className="mobile-nav-link" onClick={handleNavClick}>
                                <span className="mobile-nav-number">04</span>
                                Cases
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog" className="mobile-nav-link" onClick={handleNavClick}>
                                <span className="mobile-nav-number">05</span>
                                Blog
                            </Link>
                        </li>
                        <li>
                            <a href="/#contact" className="mobile-nav-link" onClick={handleNavClick}>
                                <span className="mobile-nav-number">06</span>
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
