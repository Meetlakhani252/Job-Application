import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Rocket,
  Search,
  Filter,
  FileText,
  Send,
  Hash,
  Activity,
  Briefcase,
  Building2,
  Layers,
  GraduationCap,
  ShieldCheck,
  Zap,
  Check,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Compass,
  LayoutDashboard,
  UserCheck
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import styles from './Home.module.css';

// FAQ data matching the platform design
const FAQ_ITEMS = [
  {
    question: 'Is Rooklet free for students looking for internships?',
    answer:
      'Yes, our platform provides unlimited browsing and direct applications to all active internship and job listings. You never have to pay to search or submit an application.',
  },
  {
    question: 'How does the unique Application ID work?',
    answer:
      'Every application generates an immutable tracking reference code (e.g. APP-7K3F9Q). You can use this ID anytime in your Candidate Dashboard to monitor review progress, shortlist decisions, and feedback.',
  },
  {
    question: 'Can fresh graduates with zero prior experience apply?',
    answer:
      'Absolutely! Rooklet specializes in early-career opportunities where personal projects, passion, coursework, and problem-solving skills matter far more than previous company names.',
  },
  {
    question: 'What makes the Annual Plan mentorship different?',
    answer:
      'Annual members get paired with experienced software engineers, product managers, and designers for 1-on-1 resume tear-downs, portfolio feedback, and realistic mock interview coaching.',
  },
  {
    question: 'How quickly do partner companies respond?',
    answer:
      'Over 80% of partner companies update application stages within 3 to 5 business days, giving you prompt clarity on shortlists and technical rounds without ghosting.',
  },
];

export default function Home() {
  // Interactive page states for pricing and FAQs
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // first open by default
  const [selectedPlanFeedback, setSelectedPlanFeedback] = useState('');

  // Plan select handler
  const handlePlanSelect = (planName) => {
    setSelectedPlanFeedback(
      `You selected the ${planName} plan! All core opportunity applications remain 100% free for students.`
    );
    setTimeout(() => {
      setSelectedPlanFeedback('');
    }, 4500);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Ambient background glows */}
      <div className={styles.glowOrbTop} aria-hidden="true" />
      <div className={styles.glowOrbMid} aria-hidden="true" />

      {/* Global Navbar */}
      <Navbar />

      {/* Plan selection feedback notification banner */}
      {selectedPlanFeedback && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-indigo-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>{selectedPlanFeedback}</span>
          <button
            onClick={() => setSelectedPlanFeedback('')}
            className="ml-2 text-indigo-300 hover:text-white font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className={styles.section} id="hero">
        <div className={styles.heroGrid}>
          {/* Left Column: Headlines & Call to Action */}
          <div className={styles.heroContent}>
            {/* Trust badge */}
            <div className={styles.heroTrustTag}>
              <span role="img" aria-label="rocket">🚀</span>
              <span>India&apos;s #1 Career Platform for Freshers</span>
            </div>

            {/* Main Value Headline */}
            <h1 className={styles.heroHeadline}>
              Find your next <span className={styles.heroHighlight}>internship</span> or job, faster.
            </h1>

            {/* Supporting Subtext */}
            <p className={styles.heroLead}>
              Discover curated early-career roles, connect with high-growth tech companies, and launch your professional journey with confidence.
            </p>

            {/* Action Buttons */}
            <div className={styles.heroCtaGroup}>
              <Link to="/opportunities" className={styles.btnPrimary}>
                <span>Explore Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#features" className={styles.btnSecondary}>
                <span>Learn More</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Featured Opportunity Card Preview */}
          <div className="w-full">
            <div className={styles.mockCard} id="opportunity-card">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-bold text-lg flex items-center justify-center shadow-sm">
                    R
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-900 text-base">Razorpay</span>
                      <span className="inline-flex items-center text-indigo-600" title="Verified Employer">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">Bangalore / Remote</span>
                  </div>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  Featured Role
                </span>
              </div>

              {/* Title & Stipend */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  Frontend Developer Intern
                </h3>
                <p className="text-sm font-semibold text-cyan-700 mt-0.5">
                  ₹35,000 / month • 6 Months
                </p>
              </div>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-medium text-xs">
                  React
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-medium text-xs">
                  TypeScript
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-medium text-xs">
                  Tailwind CSS
                </span>
              </div>

              {/* Card Footer with Applicant stats & CTA */}
              <div className="pt-2 flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 mt-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <UserCheck className="w-4 h-4 text-slate-400" />
                  <span><strong>140+</strong> applicants</span>
                </div>

                <Link
                  to="/opportunities"
                  className="h-9 px-4 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95"
                >
                  <span>Explore Roles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK STATS ROW */}
      <section className={styles.section} style={{ paddingTop: '0', paddingBottom: '2.5rem' }}>
        <div className={styles.statsGrid}>
          {/* Stat 1 */}
          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <Briefcase className="w-5 h-5" />
            </div>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Opportunities Live</span>
          </div>

          {/* Stat 2 */}
          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <Building2 className="w-5 h-5" />
            </div>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Partner Companies</span>
          </div>

          {/* Stat 3 */}
          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <Layers className="w-5 h-5" />
            </div>
            <span className={styles.statNumber}>5 Core</span>
            <span className={styles.statLabel}>Tech &amp; Business Tracks</span>
          </div>

          {/* Stat 4 */}
          <div className={styles.statCard}>
            <div className={styles.statIconWrap}>
              <Check className="w-5 h-5" />
            </div>
            <span className={styles.statNumber}>100% Free</span>
            <span className={styles.statLabel}>For Students &amp; Freshers</span>
          </div>
        </div>
      </section>

      {/* 3. ABOUT / VALUE PROPOSITION ("What is Rooklet?") */}
      <section className={styles.section} id="about">
        <div className={styles.sectionHeader}>
          <span className={styles.pillBadge}>Democratizing Internships</span>
          <h2 className={styles.sectionTitle}>What is Rooklet?</h2>
          <p className={styles.sectionSubtitle}>
            Built intentionally for undergraduates, fresh graduates, and career starters to eliminate friction, ghosting, and confusing hiring portals.
          </p>
        </div>

        <div className={styles.valueGrid}>
          {/* Card 1 */}
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Curated for Early Talent</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every listing caters to students and fresh graduates. Never encounter a junior role demanding 5+ years of prior work experience.
            </p>
          </div>

          {/* Card 2 */}
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Zero Clutter, Real Verified Roles</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Direct partnerships with verified startup founders and hiring managers. Guaranteed stipends, clear responsibilities, and zero spam.
            </p>
          </div>

          {/* Card 3 */}
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Transparent Career Journey</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Clean requirements and prompt clarity on interview milestones to help you focus on showing your skills.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CORE PLATFORM FEATURES (6 DISTINCT CARDS) */}
      <section className={styles.section} id="features">
        <div className={styles.sectionHeader}>
          <span className={styles.pillBadge}>Core Platform</span>
          <h2 className={styles.sectionTitle}>Tools made for modern job hunting</h2>
          <p className={styles.sectionSubtitle}>
            Everything you need to discover, review, and follow opportunities in one unified portal.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {/* Feature 1 */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">1. Search by title</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant autocomplete, keyword matches, and role aliases tuned to campus terminology.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">2. Filter by domain</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Effortlessly filter across Web Development, UI/UX, Data &amp; AI, and Marketing tracks.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">3. Detailed job pages</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transparent stipends, exact office locations, day-to-day requirements, and mentor details.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">4. Easy in-app apply</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                One-click profile dispatch without filling redundant 10-page external ATS application forms.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Hash className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">5. Unique application ID</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trackable candidate reference hash for every dispatch to verify employer reception.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">6. Candidate Dashboard</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Centralized dashboard showing when your submission is viewed, shortlisted, or scheduled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (4 NUMBERED STEPS) */}
      <section className={styles.section} id="how-it-works">
        <div className={styles.sectionHeader}>
          <span className={styles.pillBadge}>Simple Process</span>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionSubtitle}>
            From exploration to your dream internship in 4 straightforward moves.
          </p>
        </div>

        <div className={styles.stepperContainer}>
          {/* Step 1 */}
          <div className={styles.stepCard}>
            <div className={styles.stepBadge}>1</div>
            <h3 className="font-bold text-slate-900 text-base">Browse openings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore verified student-friendly listings filtered by stipend, location preferences, and skill tags.
            </p>
          </div>

          {/* Step 2 */}
          <div className={styles.stepCard}>
            <div className={styles.stepBadge}>2</div>
            <h3 className="font-bold text-slate-900 text-base">Review requirements</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open comprehensive role briefs detailing day-to-day responsibilities, learning outcomes, and expectations.
            </p>
          </div>

          {/* Step 3 */}
          <div className={styles.stepCard}>
            <div className={styles.stepBadge}>3</div>
            <h3 className="font-bold text-slate-900 text-base">Apply with short form</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Express interest directly with your portfolio link, GitHub showcase, and contact info in one easy form.
            </p>
          </div>

          {/* Step 4 */}
          <div className={styles.stepCard}>
            <div className={styles.stepBadge}>4</div>
            <h3 className="font-bold text-slate-900 text-base">Get your application ID</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive instant receipt confirmation, status alerts, and transparent feedback stages.
            </p>
          </div>
        </div>
      </section>

      {/* 6. ONBOARDING CTA BANNER */}
      <section className={styles.section}>
        <div className={styles.onboardingCard}>
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Rocket className="w-6 h-6" />
          </div>

          <div className="max-w-md">
            <h3 className="font-bold text-slate-900 text-2xl mb-1">
              Ready to start applying?
            </h3>
            <p className="text-sm text-slate-600">
              Your journey takes less than a minute. Browse curated opportunities and apply right now.
            </p>
          </div>

          {/* 3-Step Milestone Pill */}
          <div className="w-full max-w-md py-2.5 px-4 rounded-xl bg-white/80 border border-indigo-100 shadow-2xs flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="text-indigo-600">1. Explore Roles</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-indigo-600">2. Review Brief</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-indigo-600">3. Apply Directly</span>
          </div>

          <Link to="/opportunities" className={styles.btnPrimary}>
            <span>Browse Active Roles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>No credit card required • 100% Free for students</span>
          </div>
        </div>
      </section>

      {/* 7. PRICING PLANS SECTION */}
      <section className={styles.section} id="pricing">
        <div className={styles.sectionHeader}>
          <span className={styles.pillBadge}>Transparent Subscriptions</span>
          <h2 className={styles.sectionTitle}>Invest in your career growth</h2>
          <p className={styles.sectionSubtitle}>
            Start free forever or unlock competitive intelligence and personal mentor reviews.
          </p>

          {/* Billing Cycle Switcher */}
          <div className={styles.pricingToggleWrapper}>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`${styles.pricingToggleButton} ${
                billingCycle === 'monthly' ? styles.pricingToggleActive : ''
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`${styles.pricingToggleButton} ${
                billingCycle === 'annual' ? styles.pricingToggleActive : ''
              }`}
            >
              <span>Annual</span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-bold">
                SAVE 30%
              </span>
            </button>
          </div>
        </div>

        <div className={styles.pricingGrid}>
          {/* PLAN 1: Free */}
          <div className={styles.pricingCard}>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Starter
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">Free</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-extrabold text-slate-900">₹0</span>
                <span className="text-xs text-slate-500">/ forever</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Essential access for every student looking for internships.
              </p>

              <div className="flex flex-col gap-2 pt-6 border-t border-slate-100 mt-6">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Browse all opportunities</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Search by title &amp; keywords</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Filter by domain &amp; location</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Apply to active opportunities</span>
                </div>
              </div>
            </div>

            <Link
              to="/opportunities"
              className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center mt-6 transition-colors"
            >
              Start Free
            </Link>
          </div>

          {/* PLAN 2: Pro */}
          <div className={styles.pricingCard}>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Fast-Track
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">Pro</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-extrabold text-slate-900">
                  {billingCycle === 'annual' ? '₹199' : '₹299'}
                </span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Advanced management and priority dispatch for active seekers.
              </p>

              <div className="flex flex-col gap-2 pt-6 border-t border-slate-100 mt-6">
                <span className="text-[11px] font-semibold text-slate-400">Everything in Free, plus:</span>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Save unlimited opportunities</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Comprehensive application history</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Priority apply candidate badge</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Instant email job alerts</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handlePlanSelect('Pro')}
              className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center mt-6 shadow-sm active:scale-95 transition-all"
            >
              Choose Pro
            </button>
          </div>

          {/* PLAN 3: Premium */}
          <div className={styles.pricingCard}>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Candidate Edge
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">Premium</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-extrabold text-slate-900">
                  {billingCycle === 'annual' ? '₹499' : '₹699'}
                </span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Full intelligence toolkit with analytics and early access privileges.
              </p>

              <div className="flex flex-col gap-2 pt-6 border-t border-slate-100 mt-6">
                <span className="text-[11px] font-semibold text-slate-400">Everything in Pro, plus:</span>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>AI resume score &amp; review</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Interview tips &amp; company insights</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Early access to listings (12h ahead)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Cover letter templates &amp; alerts</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handlePlanSelect('Premium')}
              className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center mt-6 shadow-sm active:scale-95 transition-all"
            >
              Choose Premium
            </button>
          </div>

          {/* PLAN 4: Annual Deal */}
          <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
            <span className={styles.featuredRibbon}>⭐ Best Value</span>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Full Mentorship
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">Annual Deal</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-extrabold text-indigo-600">₹4,999</span>
                <span className="text-xs text-slate-400 line-through">₹8,388</span>
                <span className="text-xs text-slate-500">/ year</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Guidance paired with industry engineers and senior reviewers.
              </p>

              <div className="flex flex-col gap-2 pt-6 border-t border-indigo-100 mt-6">
                <span className="text-[11px] font-semibold text-indigo-900">Everything in Premium, plus:</span>
                <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>1-on-1 Mentoring Session (60m)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Live LinkedIn Profile Overhaul</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Comprehensive Mock Interview</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Exclusive Annual Webinars</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handlePlanSelect('Annual Mentorship')}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold text-sm flex items-center justify-center mt-6 shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
            >
              Get Annual Deal
            </button>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className={styles.section} id="faq">
        <div className={styles.sectionHeader}>
          <span className={styles.pillBadge}>Common Inquiries</span>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p className={styles.sectionSubtitle}>
            Have questions about applications, stipends, or tracking? Find quick answers here.
          </p>
        </div>

        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className={styles.faqItem}>
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  className={styles.faqQuestionBtn}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className={styles.faqAnswer}>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION BANNER */}
      <section className={styles.section}>
        <div className={styles.ctaBanner}>
          <div className={styles.ctaGlow} aria-hidden="true" />
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-indigo-300">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
              Ready to start your career journey?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Join thousands of ambitious students landing dream internships and kickoff roles today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              to="/opportunities"
              className="h-12 px-8 rounded-xl bg-white text-slate-900 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-100 active:scale-95 transition-all shadow-lg"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />

      {/* 10. NATIVE MOBILE BOTTOM NAVIGATION BAR */}
      <nav className={styles.mobileBottomNav} aria-label="Mobile Navigation">
        <Link to="/" className={`${styles.mobileBottomNavItem} ${styles.mobileBottomNavItemActive}`}>
          <Compass className="w-5 h-5" />
          <span>Discover</span>
        </Link>
        <Link to="/opportunities" className={styles.mobileBottomNavItem}>
          <Briefcase className="w-5 h-5" />
          <span>Roles</span>
        </Link>
        <Link to="/dashboard" className={styles.mobileBottomNavItem}>
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link to="/admin/login" className={styles.mobileBottomNavItem}>
          <ShieldCheck className="w-5 h-5" />
          <span>Admin</span>
        </Link>
      </nav>
    </div>
  );
}
