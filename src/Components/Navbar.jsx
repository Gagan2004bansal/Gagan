import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// import { House, BookOpen, Award, Envelope } from "@phosphor-icons/react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm' : 'bg-white border-b border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/">
            <div style={{ fontFamily: "'Geist Mono', monospace" }} className="text-lg font-semibold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer tracking-tight">
              gagan bansal
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8 items-center">
              <Link to="/">
                <div className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group">
                  {/* <House size={20} className="group-hover:text-emerald-600 transition-colors" weight="bold" /> */}
                  <span style={{ fontFamily: "'Geist Mono', monospace" }} className="text-xs font-medium uppercase tracking-wider">Home</span>
                </div>
              </Link>

              <Link to='/article'>
                <div className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group">
                  {/* <BookOpen size={20} className="group-hover:text-emerald-600 transition-colors" weight="bold" /> */}
                  <span style={{ fontFamily: "'Geist Mono', monospace" }} className="text-xs font-medium uppercase tracking-wider">Articles</span>
                </div>
              </Link>

              <Link to='/certifications'>
                <div className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group">
                  {/* <Award size={20} className="group-hover:text-emerald-600 transition-colors" weight="bold" /> */}
                  <span style={{ fontFamily: "'Geist Mono', monospace" }} className="text-xs font-medium uppercase tracking-wider">Achievements</span>
                </div>
              </Link>

              <Link to='/contact'>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors cursor-pointer">
                  {/* <Envelope size={18} weight="bold" /> */}
                  <span style={{ fontFamily: "'Geist Mono', monospace" }} className="text-xs font-medium uppercase tracking-wider">Contact</span>
                </div>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex gap-4">
              <Link to="/">
                <div className="text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer">
                  {/* <House size={24} weight="bold" /> */}
                </div>
              </Link>

              <Link to='/article'>
                <div className="text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer">
                  {/* <BookOpen size={24} weight="bold" /> */}
                </div>
              </Link>

              <Link to='/certifications'>
                <div className="text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer">
                  {/* <Award size={24} weight="bold" /> */}
                </div>
              </Link>

              <Link to='/contact'>
                <div className="text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer">
                  {/* <Envelope size={24} weight="bold" /> */}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap');
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </nav>
  )
}