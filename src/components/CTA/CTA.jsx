import React, { useEffect, useRef } from 'react';
import './CTA.css';
import Button from '../Button/Button';
import CalBookingButton from '../CalBookingButton/CalBookingButton';

function CTA() {
    const ctaRef = useRef(null);

    useEffect(() => {
        const cta = ctaRef.current;
        if (!cta) return;

        const handleMouseMove = (e) => {
            const rect = cta.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            cta.style.setProperty('--mouse-x', `${x}%`);
            cta.style.setProperty('--mouse-y', `${y}%`);
        };

        cta.addEventListener('mousemove', handleMouseMove);
        return () => cta.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="thin-cta" ref={ctaRef}>
            <div className="thin-cta-glow"></div>
            <div className="thin-cta-content">
                <div className="thin-cta-left">
                    <span className="thin-cta-status">
                        <span className="pulse-dot"></span>
                        Taking on new clients
                    </span>
                    <span className="thin-cta-text mono">Let us build something that works for you</span>
                </div>

                <div className="thin-cta-buttons">
                    <Button href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@xploreautomations.com&su=Project+Enquiry+via+Xplore+Automations" target="_blank" rel="noopener noreferrer" variant="ghost" className="thin-cta-btn secondary" magnetic>
                        Send Email
                    </Button>
                    <CalBookingButton variant="primary" className="thin-cta-btn primary" showFreeBadge={true}>
                        Book Call
                    </CalBookingButton>
                </div>
            </div>
        </section>
    );
}

export default CTA;
