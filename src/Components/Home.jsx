import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { LinkedinLogo, GithubLogo, Copyright, ReadCvLogo, Heart, ArrowUpRight, Code } from "@phosphor-icons/react"
import Navbar from './Navbar';

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-white text-slate-900 overflow-hidden">
            {/* Navigation */}
            <Navbar/>

            {/* Hero */}
            <section className="pt-32 pb-24 px-6 lg:px-8 relative">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <p style={{ fontFamily: "'Geist Mono', monospace" }} className="text-sm text-emerald-600 font-medium tracking-wide uppercase">
                                Computer Scientist & Developer
                            </p>
                            <h1 style={{ fontFamily: "'Crimson Text', serif" }} className="text-7xl lg:text-8xl font-light leading-tight tracking-tight">
                                Gagan<br />Bansal
                            </h1>
                        </div>

                        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-light">
                            I build <span className="text-emerald-600 font-medium">scalable systems</span> and craft thoughtful digital experiences. Currently researching low-level optimizations at Quark Software (Trilogy). Student at Chitkara University.
                        </p>

                        <div className="flex gap-6 pt-4">
                            <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 border-b-2 border-emerald-600 pb-1 hover:text-emerald-600 transition-colors">
                                Get in touch
                                <ArrowUpRight size={16} weight="bold" />
                            </a>
                            <a href="/Data/GaganResume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 border-b border-slate-300 pb-1 hover:text-slate-900 hover:border-slate-900 transition-colors">
                                Resume
                                <ArrowUpRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            </section>

            {/* About */}
            <section id="about" className="py-24 px-6 lg:px-8 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2 space-y-6">
                            <h2 style={{ fontFamily: "'Crimson Text', serif" }} className="text-4xl font-light text-slate-900">
                                About me
                            </h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed font-light">
                                <p>
                                    I'm a final year computer science student passionate about building things that matter. My focus is on understanding how systems work at a fundamental level — from CPU architectures to distributed systems design.
                                </p>
                                <p>
                                    At Quark, I'm working on integrating client-side code with legacy C++ servers, learning how real systems age and evolve. I'm equally interested in modern web technologies and low-level optimizations.
                                </p>
                                <p>
                                    When I'm not coding, you'll find me reading about systems design, writing, playing guitar, or exploring the night sky.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <p style={{ fontFamily: "'Geist Mono', monospace" }} className="text-xs text-emerald-600 font-medium uppercase tracking-wider mb-3">
                                    Key Stats
                                </p>
                                <ul className="space-y-2 text-sm text-slate-600 font-light">
                                    <li>• CGPA: <span className="text-slate-900 font-medium">9.41</span></li>
                                    <li>• DSA Problems: <span className="text-slate-900 font-medium">1200+</span></li>
                                    <li>• Top <span className="text-slate-900 font-medium">80/2500</span> in dept</li>
                                    <li>• Hackathon finalist</li>
                                </ul>
                            </div>

                            <div>
                                <p style={{ fontFamily: "'Geist Mono', monospace" }} className="text-xs text-emerald-600 font-medium uppercase tracking-wider mb-3">
                                    Social
                                </p>
                                <div className="flex gap-4">
                                    <a href="https://github.com/Gagan2004bansal" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                                        <GithubLogo size={20} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/bansalgagan2004/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                                        <LinkedinLogo size={20} />
                                    </a>
                                    <a href="https://leetcode.com/u/Gagan_Bansal/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors text-sm font-semibold">
                                        LC
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section id="work" className="py-24 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 style={{ fontFamily: "'Crimson Text', serif" }} className="text-4xl font-light mb-16">
                        Experience
                    </h2>

                    <div className="space-y-12">
                        {/* Experience Item */}
                        <div className="border-l-2 border-emerald-600 pl-8 pb-8">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900">R&D Intern</h3>
                                    <p className="text-emerald-600 font-medium">Quark</p>
                                </div>
                                <span style={{ fontFamily: "'Geist Mono', monospace" }} className="text-xs text-slate-500 font-medium">Jan 2026 – Now</span>
                            </div>
                            <ul className="space-y-2 text-slate-600 text-sm leading-relaxed font-light">
                                <li>• Research on gSOAP client-side integration with Axis2 C/C++ servers</li>
                                <li>• Modernizing legacy codebases for ARM64 architecture support</li>
                                <li>• Deep dive into low-level optimizations and system design patterns</li>
                            </ul>
                        </div>

                        <div className="border-l-2 border-slate-200 pl-8">
                            <p className="text-slate-500 text-sm font-light">More experiences coming soon...</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section id="projects" className="py-24 px-6 lg:px-8 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <h2 style={{ fontFamily: "'Crimson Text', serif" }} className="text-4xl font-light mb-16">
                        Projects
                    </h2>

                    <div className="space-y-12">
                        {[
                            {
                                title: "KVMemo",
                                subtitle: "High-performance in-memory key-value store",
                                description: "A cross-platform, concurrent KV store written in C++. Focus on performance and clean architecture.",
                                tags: ["C++", "Systems", "Concurrency"],
                                link: "https://www.kvmemo.dev/"
                            },
                            {
                                title: "FlarePP",
                                subtitle: "Creator-editor collaboration platform",
                                description: "End-to-end platform for creators and editors. Upload, assign, collaborate, and publish directly to YouTube.",
                                tags: ["MERN", "YouTube API", "Real-time"],
                                link: "https://github.com/Gagan2004bansal/"
                            },
                            {
                                title: "SANGAM",
                                subtitle: "Collaborative note-taking application",
                                description: "Real-time collaborative notes with powerful organization, tagging, and team features.",
                                tags: ["React", "Real-time", "Web"],
                                link: "https://github.com/Gagan2004bansal/SANGAM"
                            },
                            {
                                title: "CDS Library",
                                subtitle: "Custom C data structures library",
                                description: "Comprehensive C library with linked lists, trees, graphs, sorting algorithms. Built for learning and production use.",
                                tags: ["C", "Algorithms", "DSA"],
                                link: "https://github.com/Gagan2004bansal/CDS"
                            }
                        ].map((project, idx) => (
                            <a key={idx} href={project.link} className="group block border-b border-slate-200 pb-8 hover:border-emerald-600 transition-colors">
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-2xl font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-slate-500 font-light mt-1">{project.subtitle}</p>
                                        </div>
                                        <ArrowUpRight size={20} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
                                    </div>
                                    <p className="text-slate-600 leading-relaxed font-light max-w-2xl">
                                        {project.description}
                                    </p>
                                    <div className="flex gap-2 pt-2">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} style={{ fontFamily: "'Geist Mono', monospace" }} className="text-xs text-slate-500 bg-slate-200 px-3 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="py-24 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 style={{ fontFamily: "'Crimson Text', serif" }} className="text-4xl font-light mb-16">
                        Skills & Tools
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[
                            {
                                category: "Languages",
                                items: ["C/C++", "Rust", "JavaScript", "Java"]
                            },
                            {
                                category: "Web",
                                items: ["React", "Node.js", "Express", "MongoDB", "SQL", "Tailwind CSS"]
                            },
                            {
                                category: "Systems",
                                items: ["Linux", "AWS", "Docker", "Git", "Figma"]
                            },
                            {
                                category: "Core",
                                items: ["System Design", "DSA", "Databases", "OS", "Networks"]
                            }
                        ].map((group, idx) => (
                            <div key={idx}>
                                <h3 style={{ fontFamily: "'Geist Mono', monospace" }} className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-4">
                                    {group.category}
                                </h3>
                                <ul className="space-y-2">
                                    {group.items.map((item, i) => (
                                        <li key={i} className="text-slate-600 font-light flex items-center gap-2">
                                            <span className="w-1 h-1 bg-emerald-600 rounded-full"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section id="contact" className="py-24 px-6 lg:px-8 bg-slate-900 text-white">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h2 style={{ fontFamily: "'Crimson Text', serif" }} className="text-5xl lg:text-6xl font-light leading-tight">
                        Let's work together
                    </h2>
                    <p className="text-lg text-slate-300 font-light leading-relaxed">
                        I'm always interested in hearing about interesting projects and opportunities. Drop me a message and let's create something meaningful.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                        <a href="mailto:gaganbansal2004@example.com" className="px-8 py-3 bg-emerald-600 text-white font-medium rounded hover:bg-emerald-700 transition-colors">
                            Send me an email
                        </a>
                        <a href="https://www.linkedin.com/in/bansalgagan2004/" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-slate-500 text-white font-medium rounded hover:border-white transition-colors">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 py-12 px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-slate-500 font-light">
                    <div className="flex items-center gap-2">
                        Developed with <Heart size={16} weight="fill" className="text-emerald-600" /> by Gagan
                    </div>
                    <div style={{ fontFamily: "'Geist Mono', monospace" }} className="text-xs">
                        © 2026 • gagan
                    </div>
                    <div className="flex gap-6">
                        <a href="https://github.com/Gagan2004bansal" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">GitHub</a>
                        <a href="https://www.linkedin.com/in/bansalgagan2004/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">LinkedIn</a>
                    </div>
                </div>
            </footer>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Geist+Mono:wght@400;500;600&display=swap');

                * {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                html {
                    scroll-behavior: smooth;
                }

                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #f8fafc;
                }

                ::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }

                a {
                    -webkit-tap-highlight-color: transparent;
                }
            `}</style>
        </div>
    )
}