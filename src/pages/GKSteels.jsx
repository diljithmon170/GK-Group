import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import steelImage from '../assets/images/steel.jpg';

const GKSteels = () => {
    const products = [
        'High-Grade TMT Bars',
        'MS Pipes & Tubes',
        'Roofing Sheets',
        'Structural Steel',
        'Cement & Aggregates',
        'Construction Hardware'
    ];

    return (
        <div className="steels-page" style={{ backgroundColor: 'var(--primary)', minHeight: '100vh' }}>
            {/* Hero */}
            <section style={{
                height: '70vh',
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${steelImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative'
            }}>
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            fontSize: '4.5rem',
                            marginBottom: '1.5rem',
                            color: 'var(--white)',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            textShadow: '0 4px 10px rgba(0,0,0,0.3)'
                        }}
                    >
                        GK Steels
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100px' }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ height: '4px', backgroundColor: 'var(--accent)', margin: '0 auto 1.5rem' }}
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            fontSize: '1.8rem',
                            color: '#cbd5e1',
                            fontWeight: '300',
                            fontFamily: 'var(--font-heading)'
                        }}
                    >
                        Strength That Builds Your Future
                    </motion.p>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding">
                <div className="container">
                    <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem' }}>
                        <div style={{ flex: '1 1 600px' }}>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                style={{
                                    marginBottom: '2rem',
                                    color: 'var(--accent)',
                                    fontSize: '2.5rem',
                                    borderLeft: '4px solid var(--white)',
                                    paddingLeft: '1.5rem'
                                }}
                            >
                                The Foundation of Strength
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                style={{ marginBottom: '1.5rem', fontSize: '1.2rem', color: '#cbd5e1', lineHeight: '1.8' }}
                            >
                                GK Steels is your trusted partner for all construction and hardware needs.
                                We understand that the strength of a building lies in the quality of materials used.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                style={{ marginBottom: '3rem', fontSize: '1.2rem', color: '#cbd5e1', lineHeight: '1.8' }}
                            >
                                We provide premium quality steel products, pipes, rods, and essential hardware materials
                                sourced from the best manufacturers. Our goal is to ensure that your dream projects
                                are built on a foundation of uncompromised quality.
                            </motion.p>

                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                style={{ marginBottom: '2rem', color: 'var(--white)', fontSize: '2rem' }}
                            >
                                Our Products
                            </motion.h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                {products.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '15px',
                                            fontSize: '1.2rem',
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            padding: '1.2rem',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            color: 'var(--white)'
                                        }}
                                        whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                    >
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            backgroundColor: 'var(--accent)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--primary)',
                                            flexShrink: 0
                                        }}>
                                            <Check size={18} strokeWidth={3} />
                                        </div>
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GKSteels;
