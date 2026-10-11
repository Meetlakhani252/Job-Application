import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogOut, ShieldCheck, LayoutDashboard, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../common/Button.jsx';

export default function Navbar() {
  const { admin, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-slate-900 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg py-1 px-1.5 transition-transform"
            aria-label="Rooklet Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-all font-bold text-lg">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                Rooklet
              </span>
              <span className="text-[10px] font-semibold text-indigo-600 tracking-wider uppercase -mt-0.5">
                Career Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <Link to="/opportunities" className="hover:text-indigo-600 transition-colors">Opportunities</Link>
            <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
            <a href="/#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="/#how-it-works" className="hover:text-indigo-600 transition-colors">Workflow</a>
            <a href="/#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="/#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
          </nav>

          {/* Desktop Navigation Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/dashboard">
              <Button
                size="sm"
                variant="ghost"
                leftIcon={<LayoutDashboard className="w-4 h-4 text-indigo-600" />}
                className="text-slate-700 hover:text-indigo-600 font-medium"
              >
                Dashboard
              </Button>
            </Link>

            {/* Auth Actions */}
            {admin ? (
              <div className="flex items-center gap-2">
                <Link to="/admin">
                  <Button
                    size="sm"
                    variant="ghost"
                    leftIcon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
                  >
                    Admin Area
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={logout}
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/admin/login">
                <Button size="sm" variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                  Admin Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-3 shadow-md animate-in slide-in-from-top-2">
          {/* Quick in-page links */}
          <div className="grid grid-cols-2 gap-2 pb-1 text-center text-xs font-semibold text-slate-700">
            <Link
              to="/opportunities"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
              <span>Opportunities</span>
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 font-semibold flex items-center justify-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-indigo-600" />
              <span>Dashboard</span>
            </Link>
            <a
              href="/#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600"
            >
              Features
            </a>
            <a
              href="/#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600"
            >
              Workflow
            </a>
            <a
              href="/#pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600"
            >
              Pricing
            </a>
            <a
              href="/#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600"
            >
              FAQ
            </a>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {admin ? (
              <>
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Admin Dashboard
                </Link>
                <Link
                  to="/admin/applications"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50"
                >
                  Applications List
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  leftIcon={<LogOut className="w-4 h-4" />}
                  fullWidth
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button size="sm" variant="outline" fullWidth>
                  Admin Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
