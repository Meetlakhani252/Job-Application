import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar.jsx';
import styles from './Home.module.css';

const FAQ_ITEMS = [
  {
    question: 'What is Wellfound?',
    answer:
      'Wellfound is the hiring marketplace for startups: post jobs for free with Wellfound Jobs, source with AI agents through Wellfound Reach, or get done-for-you recruiting with Wellfound Autopilot, connected to a network of 10M+ opted-in candidates.',
  },
  {
    question: 'Is Wellfound free to post jobs?',
    answer:
      'Yes, startups can post unlimited jobs completely free. We also offer advanced AI sourcing and recruiting features as part of our premium tiers.',
  },
  {
    question: 'Is Wellfound free for job seekers?',
    answer:
      'Yes, Wellfound is 100% free for candidates. You can build a profile, browse startup roles, apply directly to hiring teams, and get matched with founders at no charge.',
  },
  {
    question: 'How many startups and candidates are on Wellfound?',
    answer:
      'Wellfound has over 10 million registered candidate profiles and more than 27,000 active startups hiring today across tech, AI, healthtech, and fintech.',
  },
  {
    question: 'Does Wellfound offer AI recruiting software?',
    answer:
      'Yes, Wellfound Reach uses autonomous AI sourcing agents that evaluate candidate criteria, match talent with hyper-personalized logic, and manage outreach workflows.',
  },
  {
    question: 'Who is Wellfound for?',
    answer:
      'Wellfound is designed specifically for early-stage through pre-IPO startups looking to build agile teams, and for high-impact candidates seeking venture-backed tech roles.',
  },
];

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // First item open by default

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#FFFDFE] to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Floating Notification Badge Cluster */}
          <div className="relative max-w-2xl mx-auto h-24 mb-3 pointer-events-none hidden sm:block">
            {/* Floating Pill: Interview Booked */}
            <div className="absolute left-4 top-2 bg-white border border-gray-200/90 rounded-full px-3.5 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center space-x-2 text-xs font-medium text-gray-700 animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Interview booked</span>
              <span className="text-gray-400">· just now</span>
            </div>
            {/* Floating Pill: Chime Applicants */}
            <div className="absolute right-12 top-0 bg-white border border-gray-200/90 rounded-full px-3.5 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center space-x-2 text-xs font-medium text-gray-700">
              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">
                C
              </div>
              <span>Chime</span>
              <span className="text-gray-400">· 38 applicants</span>
            </div>
            {/* Floating Pill: Replies Count */}
            <div className="absolute right-8 top-12 bg-[#FFF5F8] border border-[#FFD3E3]/60 rounded-full px-3 py-1 shadow-xs flex items-center space-x-1.5 text-xs font-medium text-[#FF2E74]">
              <span className="font-bold">&lt;3 replies</span>
              <span className="text-[#FF2E74]/70">· this morning</span>
            </div>
          </div>

          {/* Main Center Hero Typography */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] leading-[1.08] font-bold text-gray-950 tracking-tight">
              Where great companies
              <br />
              <span className="accent-italic text-[#FF2E74] font-serif">meet great people.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
              The AI recruiting platform for startups. Post jobs free, deploy AI sourcing agents, or hire with a dedicated recruiter.
            </p>
          </div>

          {/* Dual Core Gateway Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* CARD 1: FOR COMPANIES (Dark Navy Theme) */}
            <div className="bg-[#0D1117] text-white rounded-3xl p-7 sm:p-9 flex flex-col justify-between border border-gray-800 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">
                  For Companies
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                  Find your <span className="accent-italic text-[#FF2E74] font-serif">next hire.</span>
                </h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  Post jobs free, deploy AI sourcing agents, or hand it to an Autopilot recruiter.
                </p>
                <div>
                  <a
                    href="#for-companies"
                    className="inline-flex items-center justify-center bg-[#FF2E74] hover:bg-[#E82463] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-150 shadow-md"
                  >
                    Start hiring →
                  </a>
                </div>
              </div>

              {/* Bottom Mock: AI Reach Agent Status */}
              <div className="mt-8 pt-5 border-t border-gray-800/80">
                <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider text-gray-400 mb-3 uppercase">
                  <span>Reach Agent · Working Now</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 pulse-live" />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="bg-gray-900/90 border border-gray-800 rounded-xl px-3.5 py-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5 truncate mr-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-600/80 text-white flex items-center justify-center text-[10px] font-bold">
                        PS
                      </div>
                      <span className="text-gray-200 font-medium truncate">
                        Priya Shah · Sr Eng @ Notion · 7 YOE
                      </span>
                    </div>
                    <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-semibold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                      REPLIED
                    </span>
                  </div>

                  <div className="bg-gray-900/90 border border-gray-800 rounded-xl px-3.5 py-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5 truncate mr-2">
                      <div className="w-6 h-6 rounded-full bg-amber-600/80 text-white flex items-center justify-center text-[10px] font-bold">
                        MB
                      </div>
                      <span className="text-gray-200 font-medium truncate">
                        Marcus Bennett · Staff @ Stripe · 9 YOE
                      </span>
                    </div>
                    <span className="bg-sky-950/80 text-sky-400 border border-sky-800/60 font-semibold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                      PITCHED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: FOR CANDIDATES (Light Pink Tint Theme) */}
            <div className="bg-[#FFF0F5] text-gray-900 rounded-3xl p-7 sm:p-9 flex flex-col justify-between border border-[#FFD3E3]/70 shadow-xs relative overflow-hidden">
              <div>
                <div className="text-xs font-bold tracking-widest text-[#FF2E74] uppercase mb-3">
                  For Candidates
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-3">
                  Find your <span className="accent-italic text-[#FF2E74] font-serif">next job.</span>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  Apply directly to founders and hiring managers at 27,000+ startups building what&apos;s next.
                </p>
                <div>
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center bg-[#FF2E74] hover:bg-[#E82463] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-150 shadow-md"
                  >
                    Browse jobs →
                  </Link>
                </div>
              </div>

              {/* Bottom Mock: Candidate Matches */}
              <div className="mt-8 pt-5 border-t border-[#FFD3E3]/60">
                <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider text-gray-600 mb-3 uppercase">
                  <span>Matched to you · Today</span>
                  <span className="text-xs font-normal text-[#FF2E74] lowercase">personalized</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="bg-white/95 border border-[#FFD3E3]/70 rounded-xl px-3.5 py-2.5 flex items-center justify-between shadow-xs">
                    <div className="flex items-center space-x-2.5 truncate mr-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                        C
                      </div>
                      <span className="text-gray-800 font-medium truncate">
                        Senior Backend Engineer · Chime · NYC · $180-240K
                      </span>
                    </div>
                    <span className="bg-[#FF2E74] text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                      NEW
                    </span>
                  </div>

                  <div className="bg-white/95 border border-[#FFD3E3]/70 rounded-xl px-3.5 py-2.5 flex items-center justify-between shadow-xs">
                    <div className="flex items-center space-x-2.5 truncate mr-2">
                      <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">
                        L
                      </div>
                      <span className="text-gray-800 font-medium truncate">
                        Founding Product Designer · Lovable · Remote · $150-190K
                      </span>
                    </div>
                    <span className="bg-[#FF2E74] text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                      NEW
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOGO TICKER SECTION */}
      <section className="py-14 border-y border-gray-100 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base sm:text-lg text-gray-700 font-medium mb-8">
            The teams building what&apos;s next <span className="accent-italic text-black font-serif">hire on Wellfound.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-14 opacity-85 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Braze */}
            <span className="font-extrabold text-2xl tracking-tighter text-gray-900 font-sans">
              braze
            </span>
            {/* Zipline */}
            <div className="flex items-center space-x-1.5 font-bold text-xl tracking-tight text-gray-900">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>zipline</span>
            </div>
            {/* Applied Intuition */}
            <div className="flex items-center space-x-1 font-semibold text-lg tracking-tight text-gray-900">
              <span className="text-base">▲</span>
              <span>Applied Intuition</span>
            </div>
            {/* Astranis */}
            <div className="flex items-center space-x-1 font-bold text-lg tracking-wider uppercase text-gray-900">
              <span>ΛSTRANIS</span>
            </div>
            {/* IonQ */}
            <div className="flex items-center font-black text-xl tracking-wide text-gray-900">
              <span className="text-amber-500 text-2xl leading-none mr-0.5">•</span>IONQ
            </div>
            {/* Okta */}
            <span className="font-bold text-xl text-gray-900 tracking-tight">okta</span>
            {/* Scale */}
            <span className="font-bold text-2xl tracking-tighter text-gray-900">scale</span>
            {/* Neuralink */}
            <div className="flex items-center space-x-1 font-semibold text-lg tracking-wide text-gray-900">
              <svg className="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h4v16H4zm6 0h4v16h-4zm6 0h4v16h-4z" />
              </svg>
              <span className="uppercase tracking-widest text-sm font-bold">NEURALINK</span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-2 text-xs font-bold tracking-widest text-[#FF2E74] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E74]" />
            <span>27,000 More Startups Hiring on Wellfound Today</span>
          </div>
        </div>
      </section>

      {/* 3. FOR COMPANIES DEEP DIVE */}
      <section className="bg-[#090D14] text-white py-20 lg:py-28 relative overflow-hidden" id="for-companies">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column */}
            <div className="lg:col-span-5">
              <div className="text-xs font-bold tracking-widest text-[#FF2E74] uppercase mb-3">
                For Companies
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Build the team that <span className="accent-italic text-[#FF2E74] font-serif">defines what&apos;s next.</span>
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                The team you hire is the company you become. Wellfound is where startup people come to be found, and where AI finds the ones who fit your roles.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/admin/login"
                  className="bg-[#FF2E74] hover:bg-[#E82463] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-150"
                >
                  Find your next hire →
                </Link>
                <a
                  href="#faq"
                  className="bg-transparent hover:bg-gray-900 border border-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-150"
                >
                  Schedule a demo
                </a>
              </div>
            </div>

            {/* Right Column: 3 Numbered Offerings */}
            <div className="lg:col-span-7 space-y-10 lg:pl-6">
              <div className="border-b border-gray-800 pb-8 group">
                <div className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-2">
                  01 &nbsp; Wellfound Jobs
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Post once. Reach startup talent.</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Post free and get in front of 10M candidates who joined Wellfound because they want startup opportunities.
                </p>
              </div>

              <div className="border-b border-gray-800 pb-8 group">
                <div className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-2">
                  02 &nbsp; Wellfound Reach
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Find the candidates other searches miss.</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Search 500M+ profiles, uncover adjacent experience, and run personalized outreach from your inbox.
                </p>
              </div>

              <div className="pb-2 group">
                <div className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-2">
                  03 &nbsp; Wellfound Autopilot
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Hire faster with hands-on support.</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Get a dedicated recruiter who sources, pitches, and schedules qualified candidates onto your calendar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOR CANDIDATES SECTION */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-100" id="for-candidates">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-20">
            {/* Left: Text & Buttons */}
            <div className="lg:col-span-5">
              <div className="text-xs font-bold tracking-widest text-[#FF2E74] uppercase mb-3">
                For Candidates
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 leading-tight mb-5">
                Find work <span className="accent-italic text-[#FF2E74] font-serif">that matters.</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Find the next company that&apos;s going to change the world, and the role that changes yours.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/opportunities"
                  className="bg-[#FF2E74] hover:bg-[#E82463] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-150 shadow-sm"
                >
                  Browse all jobs →
                </Link>
                <a
                  href="#faq"
                  className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 text-sm font-semibold px-6 py-3 rounded-full transition-all duration-150"
                >
                  Learn more
                </a>
              </div>
            </div>

            {/* Right: Search Mockup UI Card */}
            <div className="lg:col-span-7">
              <div className="bg-[#FFF5F8] border border-[#FFD3E3] rounded-3xl p-5 sm:p-7 shadow-xs">
                {/* Mock Filter Bar */}
                <div className="bg-white rounded-2xl p-2.5 border border-gray-200/80 shadow-2xs flex flex-wrap items-center gap-2 mb-5 text-xs text-gray-600">
                  <span className="font-medium text-gray-400 pl-2">Show me:</span>
                  <span className="bg-gray-100 font-medium px-3 py-1.5 rounded-lg text-gray-800 flex items-center">
                    Software Engineer <span className="ml-1 text-[10px]">▾</span>
                  </span>
                  <span className="bg-gray-100 font-medium px-3 py-1.5 rounded-lg text-gray-800 flex items-center">
                    roles hiring in San Francisco <span className="ml-1 text-[10px]">▾</span>
                  </span>
                  <Link
                    to="/opportunities"
                    className="ml-auto bg-black hover:bg-gray-800 text-white font-medium px-3.5 py-1.5 rounded-lg text-xs transition-colors"
                  >
                    Search
                  </Link>
                </div>

                {/* Header inside preview */}
                <div className="flex items-center justify-between mb-3 px-1 text-xs font-semibold">
                  <span className="text-gray-800 font-bold">Matches for you</span>
                  <span className="flex items-center text-emerald-600 font-semibold tracking-wider text-[11px] uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 pulse-live" />
                    Recruiters active now
                  </span>
                </div>

                {/* Job Card 1: Zipline */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-xs mb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                        Z
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-900 text-sm">Zipline</span>
                          <span className="text-[11px] font-medium text-emerald-600 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" /> Actively hiring
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Building the world&apos;s fastest, most reliable delivery network.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2">
                    <span className="bg-gray-100 text-gray-700 text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded uppercase">
                      ROBOTICS
                    </span>
                    <span className="bg-gray-100 text-gray-700 text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded uppercase">
                      DRIVERS FIRST
                    </span>
                    <span className="bg-gray-100 text-gray-700 text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded uppercase">
                      RESPONDS WEEKLY
                    </span>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-gray-900">Senior Software Engineer, Autonomy</div>
                      <div className="text-[11px] text-gray-500">South San Francisco · $180K - $240K · Equity</div>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <Link
                        to="/opportunities"
                        className="text-xs font-medium bg-black text-white hover:bg-neutral-800 px-3 py-1 rounded-lg"
                      >
                        View role
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Job Card 2: Lovable Mini Preview */}
                <Link
                  to="/opportunities"
                  className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-xs flex items-center justify-between hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-xs">
                      L
                    </div>
                    <span className="font-bold text-xs text-gray-900">Lovable</span>
                    <span className="text-[10px] font-medium text-emerald-600 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" /> Actively hiring
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[#FF2E74]">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom 4-Column Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-gray-100">
            <div>
              <div className="text-xs font-bold text-[#FF2E74] tracking-wider uppercase mb-2">01</div>
              <h4 className="text-base font-bold text-gray-950 mb-2">
                Dream roles at the companies building what&apos;s next.
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                High-growth teams in AI, infra, robotics, fintech, and frontier categories.
              </p>
            </div>

            <div>
              <div className="text-xs font-bold text-[#FF2E74] tracking-wider uppercase mb-2">02</div>
              <h4 className="text-base font-bold text-gray-950 mb-2">Companies come find you.</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                AI sourcing surfaces you to recruiters, so the right roles reach you even when you&apos;re not looking.
              </p>
            </div>

            <div>
              <div className="text-xs font-bold text-[#FF2E74] tracking-wider uppercase mb-2">03</div>
              <h4 className="text-base font-bold text-gray-950 mb-2">
                Talk to the people doing the actual hiring.
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct lines to founders and hiring managers, not third-party recruiters.
              </p>
            </div>

            <div>
              <div className="text-xs font-bold text-[#FF2E74] tracking-wider uppercase mb-2">04</div>
              <h4 className="text-base font-bold text-gray-950 mb-2">
                Show what you can do, not just where you&apos;ve been.
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your profile goes past the résumé: projects, work, and what you&apos;d actually contribute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WELLFOUND REACH LIVE AGENT SECTION */}
      <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="lg:col-span-5">
              <div className="text-xs font-bold tracking-widest text-[#FF2E74] uppercase mb-3">
                FEATURED · WELLFOUND REACH
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950 leading-tight mb-5">
                Reach the right candidates.
                <br />
                <span className="accent-italic text-[#FF2E74] font-serif">Automatically.</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                The agentic recruiting platform that does what manual screening can&apos;t: it evaluates every candidate, surfaces the ones who&apos;d get filtered out, and runs personalized outreach until they reply. Done by AI, guided by you.
              </p>
              <div>
                <a
                  href="#for-companies"
                  className="inline-flex items-center justify-center bg-black hover:bg-neutral-800 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-150"
                >
                  Explore AI candidate sourcing →
                </a>
              </div>
            </div>

            {/* Right: Dark Live Agent Dashboard Card */}
            <div className="lg:col-span-7">
              <div className="bg-[#0D1117] border border-gray-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-6 border-b border-gray-800/90 mb-5">
                  <span className="text-sm font-semibold text-gray-200">3 agents working</span>
                  <span className="flex items-center text-rose-500 font-bold text-xs tracking-wider uppercase">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mr-2 pulse-live" />
                    LIVE
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Row 1 */}
                  <div className="bg-gray-900/90 border border-gray-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-sm text-white">NYC Senior · Backend</div>
                      <div className="text-xs text-gray-400 mt-0.5">241 evaluated · 117 matched</div>
                    </div>
                    <div className="text-xs text-gray-300 font-medium sm:text-right">
                      <span className="text-white font-bold">12</span> pitched ·{' '}
                      <span className="text-[#FF2E74] font-bold">3</span> replied
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="bg-gray-900/90 border border-gray-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-sm text-white">React Focused · Remote</div>
                      <div className="text-xs text-gray-400 mt-0.5">183 evaluated · 94 matched</div>
                    </div>
                    <div className="text-xs text-gray-300 font-medium sm:text-right">
                      <span className="text-white font-bold">8</span> pitched ·{' '}
                      <span className="text-[#FF2E74] font-bold">2</span> replied
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="bg-gray-900/90 border border-gray-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-sm text-white">Fintech Experience</div>
                      <div className="text-xs text-gray-400 mt-0.5">117 evaluated · 76 matched</div>
                    </div>
                    <div className="text-xs text-gray-300 font-medium sm:text-right">
                      <span className="text-white font-bold">6</span> pitched ·{' '}
                      <span className="text-[#FF2E74] font-bold">1</span> replied
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400 font-normal">
                  <span>Working through the night</span>
                  <span className="text-[#FF2E74] font-medium">+1 reply · 3m ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS GRID */}
      <section className="py-20 lg:py-28 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold tracking-widest text-[#FF2E74] uppercase mb-2">
              HIRED ON WELLFOUND
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-950">
              Jobs found. <span className="accent-italic text-[#FF2E74] font-serif">Teams built.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-[#FFF5F8] border border-[#FFD3E3] rounded-3xl p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold tracking-wider text-[#FF2E74] uppercase mb-4">
                  CANDIDATE
                </div>
                <p className="text-base sm:text-lg text-gray-800 font-normal leading-relaxed italic">
                  &ldquo;I got my tech job on Wellfound 4 years ago and I&apos;m still happy! Pays well, great culture, and unlimited PTO.&rdquo;
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#0D1117] border border-gray-800 text-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-4">
                  RECRUITER
                </div>
                <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed italic">
                  &ldquo;Half of the offers I give are sourced from Wellfound. It&apos;s the best product for anyone looking for startup talent.&rdquo;
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#FFF5F8] border border-[#FFD3E3] rounded-3xl p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold tracking-wider text-[#FF2E74] uppercase mb-4">
                  CANDIDATE
                </div>
                <p className="text-base sm:text-lg text-gray-800 font-normal leading-relaxed italic">
                  &ldquo;I love Wellfound. I got my current job entirely through the site last year. Super easy to use and I love the UI.&rdquo;
                </p>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-[#0D1117] border border-gray-800 text-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-4">
                  RECRUITER
                </div>
                <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed italic">
                  &ldquo;I can&apos;t imagine my day-to-day without this platform. Life would be a lot more difficult.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-20 lg:py-24 bg-[#FFFFFF] border-t border-gray-100" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs font-bold tracking-widest text-[#FF2E74] uppercase mb-2">
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950">
              Common <span className="accent-italic text-[#FF2E74] font-serif">questions.</span>
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="py-5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left text-base sm:text-lg font-bold text-gray-900 focus:outline-none transition-colors"
                  >
                    <span>{item.question}</span>
                    <span
                      className={`text-xl font-light transition-all ${
                        isOpen ? 'text-[#FF2E74] rotate-45' : 'text-gray-400'
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-3 text-sm text-gray-600 leading-relaxed animate-in fade-in">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. PRE-FOOTER CTA */}
      <section className="py-20 lg:py-24 bg-[#090D14] text-white text-center border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            What&apos;s <span className="accent-italic text-[#FF2E74] font-serif">your next move?</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8 font-normal">
            The right job, or the right hire. Both start here.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/opportunities"
              className="bg-[#FF2E74] hover:bg-[#E82463] text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-150 shadow-lg"
            >
              Browse all jobs →
            </Link>
            <Link
              to="/admin/login"
              className="bg-transparent hover:bg-gray-900 border border-gray-700 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-150"
            >
              Start hiring
            </Link>
          </div>
        </div>
      </section>

      {/* 9. MAIN FOOTER */}
      <footer className="bg-black text-gray-400 pt-16 pb-12 border-t border-gray-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-900">
            {/* Left Brand Info */}
            <div className="lg:col-span-4 space-y-4">
              <Link to="/" aria-label="Wellfound Home" className="inline-block">
                <span className="text-2xl font-bold tracking-tight text-white">
                  wellfound<span className="text-[#FF2E74]">:</span>
                </span>
              </Link>
              <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
                Wellfound is the AI recruiting platform and talent marketplace for startups. Post jobs, source candidates with AI agents, or partner with a dedicated recruiter.
              </p>
            </div>

            {/* Column 1: For Companies */}
            <div className="lg:col-span-2">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">For Companies</h5>
              <ul className="space-y-2">
                <li><a className="hover:text-white transition-colors" href="#for-companies">Recruiting platform</a></li>
                <li><a className="hover:text-white transition-colors" href="#for-companies">Post jobs for free</a></li>
                <li><a className="hover:text-white transition-colors" href="#for-companies">AI candidate sourcing</a></li>
                <li><a className="hover:text-white transition-colors" href="#for-companies">Managed recruiting</a></li>
                <li><Link className="hover:text-white transition-colors" to="/admin/login">Admin Portal</Link></li>
              </ul>
            </div>

            {/* Column 2: For Candidates */}
            <div className="lg:col-span-2">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">For Candidates</h5>
              <ul className="space-y-2">
                <li><Link className="hover:text-white transition-colors" to="/opportunities">Startup jobs</Link></li>
                <li><Link className="hover:text-white transition-colors" to="/opportunities">Remote jobs</Link></li>
                <li><Link className="hover:text-white transition-colors" to="/opportunities">Engineering roles</Link></li>
                <li><Link className="hover:text-white transition-colors" to="/dashboard">Application tracker</Link></li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="lg:col-span-2">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Company</h5>
              <ul className="space-y-2">
                <li><a className="hover:text-white transition-colors" href="#hero">About Wellfound</a></li>
                <li><a className="hover:text-white transition-colors" href="#faq">Customer stories</a></li>
                <li><a className="hover:text-white transition-colors" href="#faq">FAQ</a></li>
              </ul>
            </div>

            {/* Column 4: Trust & Support */}
            <div className="lg:col-span-2">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Trust &amp; Support</h5>
              <ul className="space-y-2">
                <li><a className="hover:text-white transition-colors" href="#faq">Help center</a></li>
                <li><a className="hover:text-white transition-colors" href="#faq">Trust center</a></li>
                <li><a className="hover:text-white transition-colors" href="#faq">Privacy &amp; terms</a></li>
              </ul>
            </div>
          </div>

          {/* SEO Browse Matrix */}
          <div className="py-10 border-b border-gray-900">
            <h5 className="text-gray-300 font-bold text-xs uppercase tracking-wider mb-6">
              Browse startup jobs by role and location
            </h5>
            <div className="space-y-4 text-[11px] leading-relaxed">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] w-28 shrink-0">
                  Jobs by role
                </span>
                <div className="flex flex-wrap gap-2 text-gray-400">
                  <Link to="/opportunities" className="bg-gray-900/80 hover:bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md transition-colors">
                    Software Engineer Jobs
                  </Link>
                  <Link to="/opportunities" className="bg-gray-900/80 hover:bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md transition-colors">
                    Product Manager Jobs
                  </Link>
                  <Link to="/opportunities" className="bg-gray-900/80 hover:bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md transition-colors">
                    Product Designer Jobs
                  </Link>
                  <Link to="/opportunities" className="bg-gray-900/80 hover:bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md transition-colors">
                    Data Analyst Jobs
                  </Link>
                  <Link to="/opportunities" className="bg-gray-900/80 hover:bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md transition-colors">
                    UI/UX Designer Jobs
                  </Link>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] w-28 shrink-0">
                  Remote jobs
                </span>
                <div className="flex flex-wrap gap-2 text-gray-400">
                  <Link to="/opportunities" className="bg-gray-900/80 hover:bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md transition-colors">
                    Remote Software Engineer Jobs
                  </Link>
                  <Link to="/opportunities" className="bg-gray-900/80 hover:bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md transition-colors">
                    Remote Product Designer Jobs
                  </Link>
                  <Link to="/opportunities" className="bg-gray-900/80 hover:bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md transition-colors">
                    Remote Data Analyst Jobs
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-[11px]">
            <div>© 2026 Wellfound. All rights reserved.</div>
            <div className="mt-2 sm:mt-0 text-gray-500">
              The recruitment platform built for what&apos;s next.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
