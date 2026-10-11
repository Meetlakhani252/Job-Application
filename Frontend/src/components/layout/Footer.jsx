import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200/80 mt-auto pt-12 pb-14 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-sm font-bold text-base">
                R
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Rooklet
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Empowering university students and early-career talent across India to discover transparent, career-defining internships and entry-level jobs.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-2xs font-bold text-xs"
              >
                in
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter X"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-2xs font-bold text-xs"
              >
                𝕏
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-2xs text-xs font-mono"
              >
                &lt;/&gt;
              </a>
            </div>
          </div>

          {/* Platform Columns */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-semibold text-xs tracking-wider uppercase text-slate-900">
              Platform
            </h3>
            <a href="/#opportunities" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
              Browse Opportunities
            </a>
            <a href="/#features" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
              Core Features
            </a>
            <a href="/#how-it-works" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
              How It Works
            </a>
            <a href="/#pricing" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
              Pricing Plans
            </a>
            <a href="/#faq" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
              Frequently Asked Questions
            </a>
          </div>

          {/* Legal & Account */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-semibold text-xs tracking-wider uppercase text-slate-900">
              Resources &amp; Portals
            </h3>
            <Link to="/find-application" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
              Track Application ID
            </Link>
            <Link to="/admin/login" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
              Recruiter / Admin Login
            </Link>
            <span className="text-sm text-slate-400 cursor-not-allowed">
              Privacy Policy
            </span>
            <span className="text-sm text-slate-400 cursor-not-allowed">
              Terms of Service
            </span>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Rooklet Technologies Inc. All rights reserved.</p>
          <p className="text-slate-400 text-[11px]">
            Designed with care for students and early-career job seekers across India.
          </p>
        </div>
      </div>
    </footer>
  );
}
