import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import bgImage from '../assets/images/background.jpg';
import textileImage from '../assets/images/textile.jpg';
import steelImage from '../assets/images/steel.jpg';

const Home = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="home-page" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
            {/* Hero Section */}
            <section
                style={{
                    height: '100vh',
                    width: '100%',
                    backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.7)), url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--white)',
                    textAlign: 'center',
                    padding: '0 1rem'
                }}
            >
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.8 }}
                        variants={fadeIn}
                    >
                        <h2 style={{
                            fontSize: '1.2rem',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            marginBottom: '1rem',
                            color: 'var(--accent)'
                        }}>
                            Welcome to GK Group
                        </h2>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            marginBottom: '1.5rem',
                            color: 'var(--white)'
                        }}>
                            Quality You Trust.<br />Service with Commitment.
                        </h1>
                        <p style={{
                            fontSize: '1.2rem',
                            maxWidth: '700px',
                            margin: '0 auto 2.5rem',
                            color: 'var(--text-light)',
                            opacity: 0.9
                        }}>
                            Leading the way in premium textiles and construction materials since inception.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/contact" className="btn btn-accent">
                                Get in Touch
                            </Link>
                            <Link to="/about" className="btn btn-outline">
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Preview */}
            <section className="section-padding" style={{ position: 'relative' }}>
                <div className="container">
                    <div className="row" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
                        <motion.div
                            style={{ flex: '1 1 400px' }}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>Building Trust Through Quality</h2>
                            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.8' }}>
                                GK Group has grown from humble beginnings to become a trusted name in Palakkad's business community.
                                Under the leadership of Mr. Gireesh Kumar, we continue to uphold our values of trust, quality, and customer satisfaction.
                            </p>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                {['Premium Quality Products', 'Customer-Centric Approach', 'Decades of Experience'].map((item, index) => (
                                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
                                        <CheckCircle color="var(--accent)" size={20} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/about" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                color: 'var(--accent)',
                                fontWeight: '600',
                                fontSize: '1.1rem'
                            }}>
                                Read Our Story <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                        <motion.div
                            style={{ flex: '1 1 400px' }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div style={{
                                position: 'relative',
                                padding: '2.5rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    width: '100px',
                                    height: '100px',
                                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                    borderRadius: '50%',
                                    zIndex: -1,
                                    filter: 'blur(20px)'
                                }} />
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--white)' }}>Our Vision</h3>
                                <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: '#cbd5e1' }}>
                                    "To be the most trusted partner for our customers by consistently delivering excellence in everything we do."
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Divisions */}
            <section className="section-padding" style={{ backgroundColor: '#0f172a' }}>
                <div className="container">
                    <div className="text-center mb-3">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--white)' }}>Our Divisions</h2>
                        <p style={{ color: '#cbd5e1', maxWidth: '600px', margin: '0 auto' }}>
                            Specialized services tailored to meet your specific needs with the highest standards of quality.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {/* GK Textiles Card */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.05)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                            }}
                        >
                            <div style={{ height: '250px', overflow: 'hidden' }}>
                                <img src={textileImage} alt="GK Textiles" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '1rem', color: 'var(--white)' }}>GK Textiles</h3>
                                <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
                                    Discover our extensive collection of premium textiles ranging from traditional Indian wear to contemporary fashion.
                                </p>
                                <Link to="/gk-textiles" className="btn btn-outline" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>
                                    Explore Collection
                                </Link>
                            </div>
                        </motion.div>

                        {/* GK Steels Card */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.05)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                            }}
                        >
                            <div style={{ height: '250px', overflow: 'hidden' }}>
                                <img src={steelImage} alt="GK Steels" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '1rem', color: 'var(--white)' }}>GK Steels</h3>
                                <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
                                    Your trusted partner for all construction and hardware needs. High-quality steel products, pipes, and rods.
                                </p>
                                <Link to="/gk-steels" className="btn btn-outline" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>
                                    View Products
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="section-padding" style={{
                background: 'linear-gradient(to right, var(--primary), #1e293b)',
                color: 'var(--white)',
                textAlign: 'center',
                borderTop: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>Ready to Experience Quality?</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', opacity: 0.9, fontSize: '1.2rem', color: '#cbd5e1' }}>
                        Visit our store in Palakkad or contact us today to discuss your requirements. We are here to serve you.
                    </p>
                    <Link to="/contact" className="btn btn-accent" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                        Contact Us Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
