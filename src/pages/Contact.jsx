import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const form = useRef();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');

        // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
        // Sign up at https://www.emailjs.com/
        const SERVICE_ID = 'service_id_placeholder';
        const TEMPLATE_ID = 'template_id_placeholder';
        const PUBLIC_KEY = 'public_key_placeholder';

        emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            }, (error) => {
                console.log(error.text);
                setStatus('error');
            });
    };
    return (
        <div className="contact-page" style={{ backgroundColor: 'var(--primary)', minHeight: '100vh', color: 'var(--white)' }}>
            {/* Header */}
            <section style={{
                padding: '8rem 0 4rem',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0.8))'
            }}>
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontSize: '3.5rem',
                            marginBottom: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            color: 'var(--white)'
                        }}
                    >
                        Contact Us
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '80px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ height: '4px', backgroundColor: 'var(--accent)', margin: '0 auto 1.5rem' }}
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ fontSize: '1.2rem', color: '#cbd5e1' }}
                    >
                        We'd love to hear from you. Get in touch with us.
                    </motion.p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
                        {/* Contact Info */}
                        <motion.div
                            style={{ flex: '1 1 300px' }}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 style={{ marginBottom: '2rem', color: 'var(--accent)', fontSize: '2rem' }}>Get In Touch</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--accent)',
                                        flexShrink: 0,
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--white)' }}>Visit Us</h3>
                                        <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                                            GK Group, Main Road,<br />
                                            Palakkad, Kerala, India - 678001
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--accent)',
                                        flexShrink: 0,
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <Phone size={28} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--white)' }}>Call Us</h3>
                                        <a
                                            href="https://wa.me/919447532898"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#cbd5e1', textDecoration: 'none', display: 'block', marginBottom: '0.5rem', transition: 'color 0.2s' }}
                                            onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                                            onMouseOut={(e) => e.target.style.color = '#cbd5e1'}
                                        >
                                            +91 9447 532 898
                                        </a>
                                        <p style={{ color: '#cbd5e1' }}>+91 9876 543 210</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--accent)',
                                        flexShrink: 0,
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        <Mail size={28} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--white)' }}>Email Us</h3>
                                        <a
                                            href="mailto:gkgroup@mail.com"
                                            style={{ color: '#cbd5e1', textDecoration: 'none', display: 'block', marginBottom: '0.5rem', transition: 'color 0.2s' }}
                                            onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                                            onMouseOut={(e) => e.target.style.color = '#cbd5e1'}
                                        >
                                            gkgroup@mail.com
                                        </a>
                                        <a
                                            href="mailto:info@gkgroup.com"
                                            style={{ color: '#cbd5e1', textDecoration: 'none', display: 'block', transition: 'color 0.2s' }}
                                            onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                                            onMouseOut={(e) => e.target.style.color = '#cbd5e1'}
                                        >
                                            info@gkgroup.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            style={{ flex: '1 1 400px' }}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                padding: '3rem',
                                borderRadius: '16px',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <h2 style={{ marginBottom: '2rem', color: 'var(--white)', fontSize: '2rem' }}>Send Message</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-2">
                                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500', color: '#cbd5e1' }}>Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                backgroundColor: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px',
                                                outline: 'none',
                                                fontFamily: 'inherit',
                                                color: 'var(--white)',
                                                fontSize: '1rem'
                                            }}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500', color: '#cbd5e1' }}>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                backgroundColor: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px',
                                                outline: 'none',
                                                fontFamily: 'inherit',
                                                color: 'var(--white)',
                                                fontSize: '1rem'
                                            }}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500', color: '#cbd5e1' }}>Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                backgroundColor: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px',
                                                outline: 'none',
                                                fontFamily: 'inherit',
                                                color: 'var(--white)',
                                                fontSize: '1rem'
                                            }}
                                            placeholder="Inquiry about..."
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500', color: '#cbd5e1' }}>Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                backgroundColor: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px',
                                                outline: 'none',
                                                fontFamily: 'inherit',
                                                resize: 'vertical',
                                                color: 'var(--white)',
                                                fontSize: '1rem'
                                            }}
                                            placeholder="How can we help you?"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn"
                                        style={{
                                            width: '100%',
                                            backgroundColor: 'var(--accent)',
                                            color: 'var(--primary)',
                                            padding: '1rem',
                                            fontSize: '1.1rem',
                                            fontWeight: '700'
                                        }}
                                        disabled={status === 'submitting'}
                                    >
                                        {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                    </button>
                                    {status === 'success' && (
                                        <p style={{ color: 'var(--success)', marginTop: '1rem', textAlign: 'center' }}>
                                            Message sent successfully! We will get back to you soon.
                                        </p>
                                    )}
                                    {status === 'error' && (
                                        <p style={{ color: 'var(--error)', marginTop: '1rem', textAlign: 'center' }}>
                                            Something went wrong. Please try again.
                                        </p>
                                    )}
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.068225323324!2d76.65479931480106!3d10.786729992314458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86dfa087d31ad%3A0x56443d2c6b4f3e3d!2sPalakkad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1631234567890!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </section>
        </div>
    );
};

export default Contact;
