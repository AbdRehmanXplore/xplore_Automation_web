import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    const footerRef = useRef(null)
    const [copied, setCopied] = useState(false)

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

        const elements = footerRef.current?.querySelectorAll('.reveal')
        elements?.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('hello@xploreautomations.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <footer className="footer" ref={footerRef}>
            <div className="container footer-container reveal">

                {/* Top Section */}
                <div className="footer-top">
                    <div className="footer-top-left">
                        <p className="footer-creator">Xplore Automations &copy; {new Date().getFullYear()}</p>
                        <div className="footer-actions">
                            <button onClick={handleCopyEmail} className="footer-btn footer-btn-outline">
                                <i className={copied ? "ri-check-line" : "ri-mail-line"}></i> {copied ? "Email Copied!" : "Copy Email"}
                            </button>
                            <div className="footer-socials">
                                <a href="mailto:hello@xploreautomations.com" className="social-circle" aria-label="Email">
                                    <i className="ri-mail-line"></i>
                                </a>
                                <a href="https://www.linkedin.com/company/xplore-automations/" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="LinkedIn">
                                    <i className="ri-linkedin-line"></i>
                                </a>
                                <a href="https://www.instagram.com/xplore_automations/" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Instagram">
                                    <i className="ri-instagram-line"></i>
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Twitter">
                                    <i className="ri-twitter-x-line"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer Nav Links */}
                    <nav className="footer-nav" aria-label="Footer navigation">
                        <div className="footer-nav-col">
                            <span className="footer-nav-heading mono">Company</span>
                            <ul>
                                <li><a href="/#work">Work</a></li>
                                <li><a href="/#capabilities">Services</a></li>
                                <li><a href="/#pricing">Pricing</a></li>
                                <li><a href="/#contact">Contact</a></li>
                            </ul>
                        </div>
                        <div className="footer-nav-col">
                            <span className="footer-nav-heading mono">Resources</span>
                            <ul>
                                <li><Link to="/cases">Case Studies</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>


            </div>
        </footer>
    )
}

export default Footer
