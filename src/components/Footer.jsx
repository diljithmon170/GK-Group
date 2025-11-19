import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle, Send } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubscribe = (e) => {
        e.preventDefault();
        setStatus('submitting');

        // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
        const SERVICE_ID = 'service_id_placeholder';
        const TEMPLATE_ID = 'template_id_newsletter'; // Create a separate template for newsletter
        const PUBLIC_KEY = 'public_key_placeholder';

        emailjs.send(SERVICE_ID, TEMPLATE_ID, { email }, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setStatus('success');
                setEmail('');
            }, (error) => {
                console.log(error.text);
                setStatus('error');
            });
    };

    return (
        <footer style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', paddingTop: '4rem' }}>
            <div className="container">
                <div className="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', paddingBottom: '3rem' }}>

                    {/* Contact Info */}
                    <div>
                        <h3 style={{ color: 'var(--white)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Contact Us</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)' }}>
                                <Mail size={18} color="var(--accent)" />
                                <a
                                    href="mailto:gkgroup@mail.com"
                                    style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                                    onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                                    onMouseOut={(e) => e.target.style.color = 'inherit'}
                                >
                                    gkgroup@mail.com
                                </a>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)' }}>
                                <Phone size={18} color="var(--accent)" />
                                <a
                                    href="https://wa.me/919447532898"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                                    onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                                    onMouseOut={(e) => e.target.style.color = 'inherit'}
                                >
                                    +91 9447 532 898
                                </a>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)' }}>
                                <MapPin size={18} color="var(--accent)" />
                                <span>Palakkad, Kerala, India</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 style={{ color: 'var(--white)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Quick Links</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {['Home', 'About', 'GK Textiles', 'GK Steels', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        style={{ color: 'var(--text-light)', transition: 'color 0.2s' }}
                                        onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                                        onMouseOut={(e) => e.target.style.color = 'var(--text-light)'}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social & Newsletter */}
                    <div>
                        <h3 style={{ color: 'var(--white)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Follow Us</h3>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            {[Facebook, Instagram, MessageCircle].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--white)',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>

                        <h3 style={{ color: 'var(--white)', marginBottom: '1rem', fontSize: '1.2rem' }}>Newsletter</h3>
                        <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    border: 'none',
                                    outline: 'none',
                                    flex: 1,
                                    fontFamily: 'inherit'
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: 'var(--accent)',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '0.5rem',
                                    cursor: 'pointer',
                                    color: 'var(--white)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                disabled={status === 'submitting'}
                            >
                                <Send size={18} />
                            </button>
                        </form>
                        {status === 'success' && <p style={{ color: 'var(--success)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Subscribed successfully!</p>}
                        {status === 'error' && <p style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Subscription failed. Try again.</p>}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    padding: '1.5rem 0',
                    textAlign: 'center',
                    color: 'var(--text-light)',
                    fontSize: '0.9rem'
                }}>
                    &copy; {currentYear} GK Group | Designed by Mr. Gireesh Kumar, Palakkad, Kerala, India
                </div>
            </div>
        </footer>
    );
};

export default Footer;
