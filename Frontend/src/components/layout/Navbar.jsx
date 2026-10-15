import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Navbar() {
  const { admin, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo & Primary Nav */}
        <div className="flex items-center space-x-10">
          <Link to="/" aria-label="Wellfound Home" className="flex items-center group">
            <span className="text-2xl font-bold tracking-tight text-black transition-opacity group-hover:opacity-90">
              wellfound<span className="text-[#FF2E74]">:</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-8">
            <a
              href="#for-companies"
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              For companies
            </a>
            <Link
              to="/opportunities"
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              For job seekers
            </Link>
            <a
              href="#faq"
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              FAQ
            </a>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {admin ? (
            <>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-800 hover:text-black px-3 py-2 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Admin Area</span>
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 text-sm font-medium border border-gray-200 hover:bg-gray-50 text-gray-700 px-3.5 py-1.5 rounded-full transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-gray-500" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/admin/login"
                className="text-sm font-semibold text-gray-800 hover:text-black px-3 py-2 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/opportunities"
                className="text-sm font-medium bg-black hover:bg-neutral-800 text-white px-4 py-2 rounded-full transition-all duration-150 shadow-sm"
              >
                Browse jobs
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            <a
              href="#for-companies"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              For companies
            </a>
            <Link
              to="/opportunities"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              For job seekers
            </Link>
            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              FAQ
            </a>
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {admin ? (
              <>
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 rounded-lg"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Admin Area</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 w-full py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/admin/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 rounded-lg"
                >
                  Log in
                </Link>
                <Link
                  to="/opportunities"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center py-2.5 text-sm font-medium bg-black text-white hover:bg-neutral-800 rounded-full"
                >
                  Browse jobs
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
