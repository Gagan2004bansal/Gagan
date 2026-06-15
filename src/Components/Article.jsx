import React from 'react';
import Navbar from "./Navbar";
import Medium from "./Medium";
import { BookOpen, ArrowUpRight } from "@phosphor-icons/react";

export default function Article() {
  return (
    <div className="bg-white text-slate-900">

      <Navbar />

      {/* Header Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* <BookOpen size={32} className="text-emerald-600" weight="bold" /> */}
              <h1 style={{ fontFamily: "'Crimson Text', serif" }} className="text-5xl lg:text-6xl font-light">
                Articles & Writing
              </h1>
            </div>
            <p className="text-lg text-slate-600 font-light leading-relaxed max-w-2xl">
              Thoughts on system design, development, and technology. Articles on Medium and deep dives into machine learning.
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200"></div>

      {/* Medium Articles Section */}
      <section className="py-16 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">

          <div className="bg-white border border-slate-200 rounded-lg p-8 hover:border-emerald-400 hover:shadow-md transition-all">
            <Medium username="gaganbansal475" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 text-white rounded-lg p-12 text-center space-y-6">
            <h2 style={{ fontFamily: "'Crimson Text', serif" }} className="text-4xl font-light">
              Have a topic in mind?
            </h2>
            <p className="text-slate-300 font-light text-lg leading-relaxed">
              Suggest topics or collaborate on articles. Always interested in exploring new ideas.
            </p>
            <a 
              href="mailto:gaganbansal2004@example.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-medium rounded hover:bg-emerald-700 transition-colors"
            >
              Reach out
              <ArrowUpRight size={18} weight="bold" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-slate-500 font-light">
          <div className="flex items-center gap-2">
            © 2026 • <span style={{ fontFamily: "'Geist Mono', monospace" }} className="text-xs text-emerald-600 font-medium">gagan.dev</span>
          </div>
          <div className="flex gap-6">
            <a href="https://medium.com/@gaganbansal475" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Medium</a>
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
      `}</style>
    </div>
  )
}