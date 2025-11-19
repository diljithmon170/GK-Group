import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../index.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'GK Textiles', path: '/gk-textiles' },
        { name: 'GK Steels', path: '/gk-steels' },
        { name: 'Contact Us', path: '/contact' },
    ];

    return (
        <header
            className={`header ${scrolled ? 'scrolled' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: scrolled ? '1rem 0' : '2rem 0'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <div style={{
                        width: '45px',
                        height: '45px',
                        background: 'linear-gradient(135deg, var(--accent), #FDB931)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '900',
                        borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                    }}>
                        GK
                    </div>
                    <span style={{
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        color: scrolled ? 'var(--white)' : 'var(--white)',
                        letterSpacing: '1px',
                        textShadow: scrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.3)',
                        textTransform: 'uppercase'
                    }}>
                        GK GROUP
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav" style={{ display: 'none' }}>
                    <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    style={{
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        color: location.pathname === link.path ? 'var(--accent)' : (scrolled ? 'var(--white)' : 'var(--white)'),
                                        position: 'relative',
                                        padding: '0.5rem 0',
                                        transition: 'color 0.3s ease',
                                        textDecoration: 'none'
                                    }}
                                    onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                                    onMouseOut={(e) => {
                                        if (location.pathname !== link.path) {
                                            e.target.style.color = scrolled ? 'var(--white)' : 'var(--white)';
                                        }
                                    }}
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="underline"
                                            style={{
                                                position: 'absolute',
                                                bottom: '0',
                                                left: 0,
                                                width: '100%',
                                                height: '2px',
                                                backgroundColor: 'var(--accent)',
                                                boxShadow: '0 0 8px var(--accent)'
                                            }}
                                        />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: scrolled ? 'var(--white)' : 'var(--white)',
                        display: 'block'
                    }}
                    className="mobile-toggle"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            backgroundColor: 'rgba(15, 23, 42, 0.95)',
                            backdropFilter: 'blur(12px)',
                            padding: '2rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            borderTop: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', listStyle: 'none', padding: 0 }}>
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            color: location.pathname === link.path ? 'var(--accent)' : 'var(--white)',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: block !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
        </header>
    );
};

export default Header;
