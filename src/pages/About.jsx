import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users } from 'lucide-react';
import founderImage from '../assets/images/founder.jpg';

const About = () => {
    return (
        <div className="about-page" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
            {/* Header */}
            <section style={{
                background: 'linear-gradient(to bottom, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0.8))',
                color: 'var(--white)',
                padding: '8rem 0 4rem',
                textAlign: 'center'
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
                        About GK Group
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
                        style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', color: '#cbd5e1' }}
                    >
                        A legacy of trust, quality, and commitment serving Palakkad since inception.
                    </motion.p>
                </div>
            </section>

            {/* Our Story */}
            <section className="section-padding">
                <div className="container">
                    <div className="row" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
                        <div style={{ flex: '1 1 400px' }}>
                            <motion.img
                                src={founderImage}
                                alt="Mr. Gireesh Kumar, Founder"
                                style={{ borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            />
                        </div>
                        <div style={{ flex: '1 1 400px' }}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent)', fontSize: '2.5rem' }}>Our Story</h2>
                                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.8' }}>
                                    Founded with a vision to provide quality products and exceptional service,
                                    GK Group has grown from humble beginnings to become a trusted name in
                                    Palakkad's business community.
                                </p>
                                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.8' }}>
                                    Under the leadership of Mr. Gireesh Kumar, we continue to uphold our values of
                                    trust, quality, and customer satisfaction. Our journey is defined by our
                                    unwavering commitment to excellence in both the textile and steel industries.
                                </p>
                                <div style={{
                                    padding: '2rem',
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    borderRadius: '16px',
                                    borderLeft: '4px solid var(--accent)',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}>
                                    <p style={{ fontStyle: 'italic', fontSize: '1.2rem', fontWeight: '500', color: 'var(--white)' }}>
                                        "Success is not just about business growth, but about the trust we build with our customers every single day."
                                    </p>
                                    <p style={{ marginTop: '1rem', fontWeight: '700', color: 'var(--accent)' }}>- Mr. Gireesh Kumar, Founder</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding" style={{ backgroundColor: '#0f172a' }}>
                <div className="container">
                    <div className="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: Target, title: 'Our Mission', text: 'To provide superior quality products that enhance the lives of our customers while maintaining the highest standards of integrity and service.' },
                            { icon: Eye, title: 'Our Vision', text: 'To be the preferred choice for textiles and construction materials in Kerala, known for our quality, reliability, and customer-centric approach.' },
                            { icon: Award, title: 'Our Values', text: 'Quality, Integrity, Customer Satisfaction, and Innovation are the pillars upon which GK Group stands.' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    padding: '2.5rem',
                                    borderRadius: '16px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                    textAlign: 'center',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                            >
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    color: 'var(--accent)',
                                    border: '1px solid rgba(212, 175, 55, 0.2)'
                                }}>
                                    <item.icon size={32} />
                                </div>
                                <h3 style={{ marginBottom: '1rem', color: 'var(--white)' }}>{item.title}</h3>
                                <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats/Team Preview */}
            <section className="section-padding">
                <div className="container text-center">
                    <h2 style={{ marginBottom: '3rem' }}>Why We Are Trusted</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem' }}>
                        {[
                            { number: '25+', label: 'Years of Experience' },
                            { number: '10k+', label: 'Happy Customers' },
                            { number: '100%', label: 'Quality Guarantee' },
                            { number: '2', label: 'Premium Divisions' }
                        ].map((stat, index) => (
                            <div key={index}>
                                <div style={{ fontSize: '3.5rem', fontWeight: '700', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                                    {stat.number}
                                </div>
                                <div style={{ fontSize: '1.2rem', color: 'var(--white)', fontWeight: '500' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
