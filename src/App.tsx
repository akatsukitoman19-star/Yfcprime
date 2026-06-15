import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, 
  Dumbbell, 
  Award, 
  HeartPulse, 
  Activity, 
  ChevronUp, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Calculator, 
  TrendingUp, 
  User, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck, 
  Scale, 
  Droplet,
  Users,
  Search,
  Check,
  Zap,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TRAINERS, 
  EQUIPMENT, 
  PLANS, 
  TESTIMONIALS, 
  CLASSES, 
  FITNESS_PLAN_MATRIX,
  GoalOutput
} from './data';

export default function App() {
  // Loading state
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Layout states
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);

  // 1. Stats counter state triggered on visibility
  const [counts, setCounts] = useState({ members: 0, transformations: 0, trainers: 0, rating: 0 });
  const statsRef = useRef<HTMLDivElement>(null);

  // 2. BMI state
  const [bmiWeight, setBmiWeight] = useState<string>('72');
  const [bmiHeight, setBmiHeight] = useState<string>('175');
  const [bmiAge, setBmiAge] = useState<string>('24');
  const [bmiGender, setBmiGender] = useState<'Male' | 'Female'>('Male');
  const [bmiActivity, setBmiActivity] = useState<string>('moderate');
  const [bmiResult, setBmiResult] = useState<{
    bmi: number;
    category: string;
    categoryColor: string;
    calories: number;
    water: number;
  } | null>(null);



  // 4. Equipment filtering state
  const [selectedEquipCat, setSelectedEquipCat] = useState<string>('All');

  // 5. Fitness blueprint generated goals
  const [blueprintGoal, setBlueprintGoal] = useState<'fat_loss' | 'muscle_gain' | 'strength_power' | 'general_fitness'>('fat_loss');
  const [completedBlueprintTasks, setCompletedBlueprintTasks] = useState<Record<string, boolean>>({});

  // 6. Interactive plan builder states
  const [selectedPlanBase, setSelectedPlanBase] = useState<string>('p_pro');
  const [commitmentMonths, setCommitmentMonths] = useState<number>(3); // 1, 3, 6, 12
  const [addOnDiet, setAddOnDiet] = useState(false);
  const [addOnLocker, setAddOnLocker] = useState(false);
  const [addOnZumba, setAddOnZumba] = useState(false);

  // 7. Weekly Schedule state
  const [selectedScheduleDay, setSelectedScheduleDay] = useState<string>('All');

  // 8. Contact booking state & guest pass generator
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    targetGoal: 'Fat Loss',
    tier: 'Pro Athlete Plan',
    acceptedTerms: true,
  });
  const [guestPass, setGuestPass] = useState<{
    code: string;
    holder: string;
    passType: string;
    expiresAt: string;
    timestamp: string;
  } | null>(null);

  // Fake Progress Bar Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 10;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Handle Scroll and Counter initiation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setBackToTopVisible(window.scrollY > 400);

      // Check stats visibility
      if (statsRef.current) {
        const top = statsRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight && counts.members === 0) {
          // Trigger Counter animation
          animateCounters();
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [counts.members]);

  const animateCounters = () => {
    let startMembers = 0;
    let startTransformations = 0;
    let startTrainers = 0;
    let startRating = 0;

    const duration = 1500;
    const steps = 40;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      startMembers += Math.ceil(2500 / steps);
      startTransformations += Math.ceil(100 / steps);
      startTrainers += Math.ceil(15 / steps);
      startRating += 4.9 / steps;

      let finished = false;
      if (startMembers >= 2500) {
        startMembers = 2500;
        finished = true;
      }
      if (startTransformations >= 100) startTransformations = 100;
      if (startTrainers >= 15) startTrainers = 15;
      if (startRating >= 4.9) startRating = 4.9;

      setCounts({
        members: startMembers,
        transformations: startTransformations,
        trainers: startTrainers,
        rating: Number(startRating.toFixed(1))
      });

      if (finished) clearInterval(timer);
    }, intervalTime);
  };

  // Perform BMI and metabolism formula
  useEffect(() => {
    calculateBmi();
  }, [bmiWeight, bmiHeight, bmiAge, bmiGender, bmiActivity]);

  const calculateBmi = () => {
    const w = parseFloat(bmiWeight);
    const h = parseFloat(bmiHeight) / 100;
    const a = parseFloat(bmiAge);
    if (!w || !h || !a) return;

    // Body Mass Index
    const bmiVal = w / (h * h);
    let cat = 'Healthy Weight';
    let catColor = 'text-emerald-500';

    if (bmiVal < 18.5) {
      cat = 'Underweight';
      catColor = 'text-sky-400';
    } else if (bmiVal >= 18.5 && bmiVal < 25) {
      cat = 'Healthy Weight';
      catColor = 'text-emerald-400';
    } else if (bmiVal >= 25 && bmiVal < 30) {
      cat = 'Overweight';
      catColor = 'text-amber-400';
    } else {
      cat = 'Obese';
      catColor = 'text-primary';
    }

    // Basal Metabolic Rate (Mifflin-St Jeor Equation)
    let bmr = 0;
    if (bmiGender === 'Male') {
      bmr = 10 * w + 6.25 * (parseFloat(bmiHeight)) - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * (parseFloat(bmiHeight)) - 5 * a - 161;
    }

    // TDEE (Total Daily Energy Expenditure) multipliers
    let multiplier = 1.2; // Sedentary
    if (bmiActivity === 'light') multiplier = 1.375;
    if (bmiActivity === 'moderate') multiplier = 1.55;
    if (bmiActivity === 'active') multiplier = 1.725;
    if (bmiActivity === 'extreme') multiplier = 1.9;

    const tdee = Math.round(bmr * multiplier);
    
    // Baseline Daily Water suggestions: Weight in kg * 35 ml
    const waterLitres = Number(((w * 35) / 1000).toFixed(1));

    setBmiResult({
      bmi: Number(bmiVal.toFixed(1)),
      category: cat,
      categoryColor: catColor,
      calories: tdee,
      water: waterLitres
    });
  };



  // Add-on discounts and totals builder calculations
  const calculatePlanPrisingAndDiscount = () => {
    const basePlanObj = PLANS.find(p => p.id === selectedPlanBase);
    if (!basePlanObj) return { base: 0, addOns: 0, discount: 0, total: 0, netMonthly: 0 };

    let pricePerMonth = basePlanObj.price;
    let addOnsSum = 0;

    if (addOnDiet) addOnsSum += 499;
    if (addOnLocker) addOnsSum += 199;
    if (addOnZumba) addOnsSum += 299;

    const subtotalMonthly = pricePerMonth + addOnsSum;
    const totalLumpRaw = subtotalMonthly * commitmentMonths;

    let discountPercent = 0;
    if (commitmentMonths === 3) discountPercent = 10; // 10% Off
    if (commitmentMonths === 6) discountPercent = 15; // 15% Off
    if (commitmentMonths === 12) discountPercent = 25; // 25% Off

    const discountAmount = Math.round(totalLumpRaw * (discountPercent / 100));
    const netTotalPayable = totalLumpRaw - discountAmount;
    const netMonthlyEquivalent = Math.round(netTotalPayable / commitmentMonths);

    return {
      base: pricePerMonth,
      addOns: addOnsSum,
      discount: discountAmount,
      total: netTotalPayable,
      netMonthly: netMonthlyEquivalent,
      discountPercent
    };
  };

  const pricingSummary = calculatePlanPrisingAndDiscount();

  // Handle guest booking submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const uppercaseCode = 'YFCP-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date();
    dateStr.setDate(dateStr.getDate() + 3); // Valid 3 days from now
    
    setGuestPass({
      code: uppercaseCode,
      holder: formData.name,
      passType: formData.tier,
      expiresAt: dateStr.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    });
  };

  const toggleBlueprintTask = (taskName: string) => {
    setCompletedBlueprintTasks(prev => ({
      ...prev,
      [taskName]: !prev[taskName]
    }));
  };

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  // Equipment categories
  const equipCategories = ['All', 'Cardio', 'Strength', 'Power', 'Free Weights', 'Functional'];
  const filteredEquipment = selectedEquipCat === 'All' 
    ? EQUIPMENT 
    : EQUIPMENT.filter(eq => eq.category === selectedEquipCat);

  // Filter schedules
  const scheduleDays = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const filteredSchedule = selectedScheduleDay === 'All'
    ? CLASSES
    : CLASSES.filter(cl => cl.day === selectedScheduleDay);

  const selectedGoalData = FITNESS_PLAN_MATRIX[blueprintGoal];

  return (
    <div className="bg-black text-white relative min-h-screen selection:bg-primary selection:text-white">
      
      {/* ==================== ANIME LOADING SCREEN ==================== */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            id="loader"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center gap-6 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="font-display text-5xl md:text-7xl tracking-widest text-white">
                YFC <span className="text-primary italic animate-pulse">PRIME</span>
              </h1>
              <p className="font-sans text-xs tracking-widest text-zinc-500 uppercase mt-2">Bigger. Better. Stronger.</p>
            </motion.div>
            
            {/* ProgressBar */}
            <div className="w-56 h-[3px] bg-zinc-900 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            
            <p className="text-[10px] font-mono text-zinc-400 mt-2">LOADING DEF-SYSTEMS {loadingProgress}%</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== NAVIGATION BAR ==================== */}
      <nav 
        id="navbar" 
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 flex items-center justify-between px-6 md:px-12 ${
          scrolled 
            ? 'bg-black/95 backdrop-blur-md border-b border-primary/25 shadow-lg shadow-black/80' 
            : 'bg-transparent'
        }`}
      >
        <span 
          onClick={() => scrollToSection('hero')} 
          className="font-display text-2xl md:text-3xl tracking-widest cursor-pointer group"
          id="nav-logo"
        >
          YFC <span className="text-primary group-hover:text-primary-bright transition-colors">PRIME</span>
        </span>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {['about', 'why', 'equipment', 'trainers', 'blueprint', 'membership', 'schedule', 'location'].map((sec) => (
            <span 
              key={sec} 
              onClick={() => scrollToSection(sec)}
              className="text-xs font-semibold tracking-wider uppercase text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
            >
              {sec === 'why' ? 'Why Us' : sec === 'blueprint' ? 'Plan Builder' : sec}
            </span>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <span className="text-xs font-mono text-zinc-400 border border-zinc-800 bg-zinc-900/30 px-3 py-1.5 rounded flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            REOPENED AT Wadiya Colony
          </span>
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-primary hover:bg-primary-bright text-white uppercase text-xs font-bold tracking-wider px-5 py-2.5 rounded transition-transform active:scale-95 duration-200 cursor-pointer"
          >
            Join VIP
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
          id="hamburger"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu links */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-xl pt-24 px-8 flex flex-col gap-6 lg:hidden"
            id="mobile-menu"
          >
            {['about', 'why', 'equipment', 'trainers', 'blueprint', 'membership', 'schedule', 'location'].map((sec) => (
              <span 
                key={sec} 
                onClick={() => scrollToSection(sec)}
                className="text-lg font-semibold tracking-widest text-zinc-100 uppercase border-b border-zinc-900 pb-2 cursor-pointer"
              >
                {sec === 'why' ? 'Why Us' : sec === 'blueprint' ? 'Plan Builder' : sec}
              </span>
            ))}
            <div className="flex flex-col gap-4 mt-4">
              <span className="text-xs font-mono text-zinc-500 self-start">
                📍 Udaipur-Dungarpur Link Road, Banswara
              </span>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-primary text-white text-center font-bold tracking-widest py-3.5 rounded uppercase mt-2 w-full"
              >
                Book Free Trial
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== HERO SECTION ==================== */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1920&q=80" 
            alt="Gym Ambient" 
            className="w-full h-full object-cover brightness-[0.25] saturate-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>
        </div>

        {/* Diagonal slash vector design as requested in HTML */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary/5 border-l border-primary/20 skew-x-[-12deg] transform translate-x-24 pointer-events-none hidden md:block" />

        <div className="relative z-10 max-w-5xl px-6 md:px-12 pt-12 md:pt-4">
          <div className="inline-flex items-center gap-2 mb-4 bg-primary/10 border border-primary/30 px-3.5 py-1 rounded">
            <Flame className="text-primary w-4 h-4 animate-bounce" />
            <span className="text-xs font-display tracking-widest text-primary uppercase">Banswara's Finest Fitness Destination</span>
          </div>

          <h1 className="font-display text-7xl md:text-9xl font-bold leading-[0.88] tracking-tight uppercase select-none mb-4">
            Bigger.<br />
            <span className="text-primary italic relative">Better.</span><br />
            Stronger.
          </h1>

          <p className="text-sm md:text-base text-zinc-400 font-light tracking-wider max-w-xl border-l-2 border-primary pl-4 mb-8">
            YFC Prime has reopened at a bold new location — redesigned from the ground up to deliver luxury interiors, elite imported strength weaponry, and an immersive energetic environment.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <button 
              onClick={() => scrollToSection('membership')}
              className="px-8 py-3.5 bg-primary hover:bg-primary-bright text-white uppercase text-xs font-bold tracking-widest rounded-sm transition-all duration-200 shadow-lg shadow-primary/20 cursor-pointer active:scale-95"
            >
              Explore Plans
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-500 text-white uppercase text-xs font-bold tracking-widest rounded-sm transition-all cursor-pointer"
            >
              Get Free Tour Pass
            </button>
          </div>

          {/* Counters Widget */}
          <div 
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 border-t border-zinc-900 pt-8"
          >
            <div>
              <div className="font-display text-4xl md:text-5xl font-semibold leading-none tracking-wide">
                {counts.members || '2500'}<span className="text-primary font-sans text-2xl">+</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mt-2">Active Members</p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-semibold leading-none tracking-wide">
                {counts.transformations || '100'}<span className="text-primary font-sans text-2xl">+</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mt-2">Transformations</p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-semibold leading-none tracking-wide">
                {counts.trainers || '15'}<span className="text-primary font-sans text-2xl">+</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mt-2">Expert Coaches</p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-semibold leading-none tracking-wide">
                {counts.rating || '4.9'}<span className="text-primary font-sans text-2xl">★</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mt-2">Google Rating</p>
            </div>
          </div>
        </div>

        {/* Decorative subtle ambient bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-charcoal-1 to-transparent"></div>
      </section>

      {/* ==================== OUR STORY / ABOUT ==================== */}
      <section id="about" className="py-24 bg-charcoal-1 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle background items */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary/2.5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Image stack */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full rounded overflow-hidden border border-zinc-800 shadow-2xl group z-10">
                <img 
                  src="https://images.pexels.com/photos/29224211/pexels-photo-29224211.jpeg" 
                  alt="YFC Interior Premium" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-primary text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded shadow-lg">
                    Est. 2024 — Brand New Facility
                  </span>
                </div>
              </div>
              
              {/* Back Accent Border frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-primary/40 rounded z-0 pointer-events-none" />
            </div>

            {/* Right Column Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                The Rebirth Of Banswara Power
              </span>
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight uppercase mb-6">
                A New Chapter<br />
                of <span className="text-primary italic">Excellence</span>
              </h2>

              <div className="space-y-4 text-zinc-400 text-sm md:text-base leading-relaxed">
                <p>
                  YFC Prime has officially reopened at a major bold new location! Redesigned structurally from the scratch to introduce an international standards fitness experience Banswara has never seen before.
                </p>
                <p>
                  Spanning high ceiling ventilation, luxury aesthetics, high strength rubber flooring, and an elite energetic client vibe, our environment is meticulously engineered for serious body and state of mind results.
                </p>
                <p className="text-white font-medium italic border-l-2 border-primary pl-4">
                  "This isn&apos;t simply a gym floor registration. It&apos;s a major personal statement."
                </p>
              </div>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-2.5 mt-8">
                {['Premium Facility', 'Luxury Aesthetics', 'Pro Strength Gear', 'Safe Female Environment', 'Certified Coaching'].map((pill) => (
                  <span 
                    key={pill} 
                    className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-primary border border-primary/25 bg-primary/5 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-all duration-200 hover:border-primary"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE / bento indicators ==================== */}
      <section id="why" className="py-24 bg-black px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 inline-block">Why YFC Prime</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight">
              Built For <span className="text-primary italic">Champions</span>
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-wider uppercase mt-2">Every feature optimized for maximal performance outputs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-charcoal-2 border border-zinc-900 p-8 rounded-sm hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded bg-primary/10 border border-primary/25 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <Dumbbell className="text-primary w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-semibold uppercase tracking-wide mb-3">Premium Arsenal</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Imported commercial grade machines with biomechanically synchronized pathways, loaded plates, and solid iron weights.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-charcoal-2 border border-zinc-900 p-8 rounded-sm hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded bg-primary/10 border border-primary/25 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <Award className="text-primary w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-semibold uppercase tracking-wide mb-3">Certified Coaches</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Elite resident team holding premium nutrition, rehabilitation and weight training credentials to secure actual results.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-charcoal-2 border border-zinc-900 p-8 rounded-sm hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded bg-primary/10 border border-primary/25 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <Flame className="text-primary w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-semibold uppercase tracking-wide mb-3">Strength focus Zone</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Specifically configured steel deadlift platforms, safety cages, elite barbells, and massive dumbbells up to 50 kg.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-charcoal-2 border border-zinc-900 p-8 rounded-sm hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded bg-primary/10 border border-primary/25 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <Activity className="text-primary w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-semibold uppercase tracking-wide mb-3">Smart Cardio Suite</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Fitted with individual entertainment screens, cross-fit air bikes, elliptical gliders, and progressive high speed treadmills.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-charcoal-2 border border-zinc-900 p-8 rounded-sm hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded bg-primary/10 border border-primary/25 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <TrendingUp className="text-primary w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-semibold uppercase tracking-wide mb-3">Progress Assessments</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Periodic comprehensive body scanner (InBody) measurements, lean muscle calculations, and progressive calorie audits.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-charcoal-2 border border-zinc-900 p-8 rounded-sm hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded bg-primary/10 border border-primary/25 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <CheckCircle2 className="text-primary w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-semibold uppercase tracking-wide mb-3">Safe & Inclusive Community</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Welcoming, zero-judgment atmosphere. Fully surveillance secured, specialized slots, and highly supportive gym manners.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== INTERACTIVE EXPERT TRAINING BLUEPRINT (DYNAMIC ADVISOR) ==================== */}
      <section id="blueprint" className="py-24 bg-charcoal-1 border-y border-zinc-900 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 inline-block">Interactive Goal Planner</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight">
              Aesthetic <span className="text-primary italic">Blueprints</span>
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed mt-2">
              Select your individual target to unlock a custom curated typical 1-day weight training layout and elite lifestyle nutrition guidelines template!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Goal selection tab pillar */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-1">SELECT YOUR TARGET GOAL</p>
              
              {[
                { id: 'fat_loss', label: 'Fat Loss & Shred', tag: 'Fast metabolic weight loss focus' },
                { id: 'muscle_gain', label: 'Hypertrophy Muscle Gain', tag: 'Lean sarcoplasmic mass bulk' },
                { id: 'strength_power', label: 'Strength & Power lifting', tag: 'Neurological max compound density' },
                { id: 'general_fitness', label: 'General Health & Mobility', tag: 'Cardiovascular wellness & endurance' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setBlueprintGoal(item.id as any);
                    setCompletedBlueprintTasks({});
                  }}
                  className={`text-left p-4 rounded border transition-all relative ${
                    blueprintGoal === item.id 
                      ? 'bg-neutral-900 border-primary text-white shadow-md' 
                      : 'bg-zinc-900/50 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${blueprintGoal === item.id ? 'bg-primary' : 'bg-zinc-650'}`} />
                    <div>
                      <h4 className="font-medium text-sm md:text-base">{item.label}</h4>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.tag}</p>
                    </div>
                  </div>
                  {blueprintGoal === item.id && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                  )}
                </button>
              ))}

              <div className="bg-zinc-900/30 border border-zinc-900/50 rounded p-4 mt-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    These are verified base splits designed by HEAD coach <span className="text-white font-medium">Rahul Mehta</span>. Sign up for our professional plans below to acquire real weekly variations.
                  </p>
                </div>
              </div>
            </div>

            {/* Curated Results Panel */}
            <div className="lg:col-span-8 bg-charcoal-2 border border-zinc-900 rounded p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-5 mb-6 gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">
                    ACTIVE DESIGN BLUEPRINT
                  </span>
                  <h3 className="font-display text-3xl font-semibold uppercase tracking-wide text-white mt-1.5">
                    {blueprintGoal === 'fat_loss' && 'Fat Shred & Conditioning'}
                    {blueprintGoal === 'muscle_gain' && 'Mass Hypertrophy Development'}
                    {blueprintGoal === 'strength_power' && 'Absolute Powerlift Structure'}
                    {blueprintGoal === 'general_fitness' && 'Resilient Core & Mobility Routine'}
                  </h3>
                </div>
                <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded px-3 py-1.5 shrink-0">
                  <Activity className="text-primary w-4 h-4 animate-pulse" />
                  <span className="text-xs font-mono text-zinc-300">100% Client Success Ratio</span>
                </div>
              </div>

              {/* Workout List */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Dumbbell size={14} className="text-primary" />
                  Suggested 1-Day Workout Lift Split
                </h4>
                <div className="space-y-3">
                  {selectedGoalData.exercises.map((ex, index) => (
                    <div 
                      key={index}
                      onClick={() => toggleBlueprintTask(ex.name)}
                      className={`flex items-start justify-between p-3.5 rounded border text-left cursor-pointer transition-colors ${
                        completedBlueprintTasks[ex.name] 
                          ? 'bg-zinc-900/40 border-zinc-800 text-zinc-500 line-through' 
                          : 'bg-zinc-900/80 border-zinc-900 hover:border-zinc-800'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 pr-4">
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                          completedBlueprintTasks[ex.name] 
                            ? 'border-zinc-700 bg-zinc-800 text-zinc-650' 
                            : 'border-primary bg-primary/10 text-primary'
                        }`}>
                          {completedBlueprintTasks[ex.name] ? <Check size={10} /> : index + 1}
                        </span>
                        <div>
                          <p className={`text-xs md:text-sm font-semibold transition-colors ${
                            completedBlueprintTasks[ex.name] ? 'text-zinc-600' : 'text-zinc-100'
                          }`}>
                            {ex.name}
                          </p>
                          <p className={`text-[11px] mt-1 ${completedBlueprintTasks[ex.name] ? 'text-zinc-700' : 'text-zinc-500'}`}>
                            💡 {ex.tip}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-mono uppercase bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                          {ex.sets} × {ex.reps}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition Blueprint */}
              <div className="bg-zinc-950/70 border border-zinc-900 rounded p-5">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sparkles size={14} className="text-primary" />
                  Macro Alignment & Nutrition Guide
                </h4>
                {selectedGoalData.diet.map((dietDetail, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-zinc-900/80 p-3 rounded border border-zinc-900">
                        <p className="text-[10px] uppercase font-bold text-zinc-500">Target Focus</p>
                        <p className="text-xs font-semibold text-white mt-1 capitalize">{dietDetail.focus}</p>
                      </div>
                      <div className="bg-zinc-900/80 p-3 rounded border border-zinc-900">
                        <p className="text-[10px] uppercase font-bold text-zinc-500">Protein Multiplier</p>
                        <p className="text-xs font-semibold text-emerald-400 mt-1">{dietDetail.protein}</p>
                      </div>
                      <div className="bg-zinc-900/80 p-3 rounded border border-zinc-900">
                        <p className="text-[10px] uppercase font-bold text-zinc-500">Source Priority</p>
                        <p className="text-xs font-semibold text-zinc-300 mt-1">{dietDetail.carbs} carbs</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">Recommended Meal Sample</p>
                      <p className="text-xs text-zinc-400 border-l border-zinc-800 pl-3 leading-relaxed">
                        {dietDetail.mealSample}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================== VIRTUAL ARSENAL / SHOWCASE CARDS ==================== */}
      <section id="equipment" className="py-24 bg-charcoal-1 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 inline-block">The World-Class Arsenal</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight">
              Elite <span className="text-primary italic">Equipment</span>
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-wider uppercase mt-2">
              Imported state of the art machines from certified premium providers
            </p>
          </div>

          {/* Filter Categories Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-zinc-900 pb-6">
            {equipCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedEquipCat(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest border transition-all rounded ${
                  selectedEquipCat === cat 
                    ? 'bg-primary border-primary text-white scale-105' 
                    : 'bg-zinc-900/50 border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid list of gears */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredEquipment.map((eq) => (
                <motion.div
                  key={eq.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-charcoal-2 border border-zinc-900 rounded overflow-hidden flex flex-col hover:border-primary/40 group transition-all"
                >
                  {/* Image container */}
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                    <img 
                      src={eq.imageUrl} 
                      alt={eq.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-[0.75]"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-zinc-950/80 border border-zinc-850 text-primary text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {eq.category}
                    </span>
                  </div>

                  {/* Body details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-xl tracking-wide uppercase font-semibold text-zinc-100 group-hover:text-white transition-colors">
                        {eq.name}
                      </h3>
                      <p className="text-zinc-500 text-xs leading-relaxed mt-2 line-clamp-3">
                        {eq.description}
                      </p>
                    </div>
                    
                    <div className="border-t border-zinc-900 pt-3 mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500">BIO-PATH SYNC</span>
                      <span className="text-[10px] font-bold text-primary flex items-center gap-1">
                        High Load Limit <Zap size={10} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ==================== INTERACTIVE BODY BMI & HEALTH CALCULATOR ==================== */}
      <section id="bmi-calculator" className="py-24 bg-black px-6 md:px-12 relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left information Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold tracking-widest text-primary uppercase inline-block">Science-Backed Performance</span>
              <h2 className="font-display text-5xl md:text-7xl font-bold uppercase leading-[0.95] tracking-tight text-white">
                Metabolic <span className="text-primary italic">Calculator</span>
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Determine your baseline body composition parameters instantly. Find out your current estimated Mass Category, recommended fluid intake level, and active TDEE (Total Daily Energy Expenditure) to strategically build muscle or drop fat.
              </p>
              
              <div className="border-l-2 border-primary/50 pl-4 space-y-4 py-2">
                <div className="flex gap-3">
                  <Scale className="text-primary shrink-0 w-5 h-5 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold uppercase text-zinc-300">Mifflin-St Jeor Precision</h5>
                    <p className="text-xs text-zinc-500 mt-0.5">Calculates active metabolic burn ratios based on real activity levels.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Droplet className="text-primary shrink-0 w-5 h-5 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold uppercase text-zinc-300">Water Intake Estimators</h5>
                    <p className="text-xs text-zinc-500 mt-0.5">Calculates ideal cellular body water metrics to prevent lifting exhaustion.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form and dynamic output panels */}
            <div className="lg:col-span-7 bg-charcoal-2 border border-zinc-900 rounded p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Calculator Inputs (6 cols) */}
              <div className="md:col-span-6 space-y-4">
                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">INPUT METRIC METRICS</p>
                
                {/* Gender toggle */}
                <div className="flex bg-zinc-950 border border-zinc-900 p-1 rounded-sm">
                  <button 
                    onClick={() => setBmiGender('Male')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-sm transition-all uppercase cursor-pointer ${
                      bmiGender === 'Male' ? 'bg-primary text-white shadow-md' : 'text-zinc-550 hover:text-zinc-300'
                    }`}
                  >
                    MALE
                  </button>
                  <button 
                    onClick={() => setBmiGender('Female')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-sm transition-all uppercase cursor-pointer ${
                      bmiGender === 'Female' ? 'bg-primary text-white shadow-md' : 'text-zinc-550 hover:text-zinc-300'
                    }`}
                  >
                    FEMALE
                  </button>
                </div>

                {/* Weight Input */}
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-2">
                    Weight (kg): <span className="text-white">{bmiWeight} kg</span>
                  </label>
                  <input 
                    type="range"
                    min="40"
                    max="150"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(e.target.value)}
                    className="w-full accent-primary bg-zinc-950 h-2.5 rounded-lg border border-zinc-900 cursor-pointer"
                  />
                </div>

                {/* Height Input */}
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-2">
                    Height (cm): <span className="text-white">{bmiHeight} cm</span>
                  </label>
                  <input 
                    type="range"
                    min="120"
                    max="220"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(e.target.value)}
                    className="w-full accent-primary bg-zinc-950 h-2.5 rounded-lg border border-zinc-900 cursor-pointer"
                  />
                </div>

                {/* Age Input */}
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-2">
                    Age : <span className="text-white">{bmiAge} yrs</span>
                  </label>
                  <input 
                    type="range"
                    min="15"
                    max="75"
                    value={bmiAge}
                    onChange={(e) => setBmiAge(e.target.value)}
                    className="w-full accent-primary bg-zinc-950 h-2.5 rounded-lg border border-zinc-900 cursor-pointer"
                  />
                </div>

                {/* Activity level selector */}
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1.5">
                    Activity Factor
                  </label>
                  <select 
                    value={bmiActivity}
                    onChange={(e) => setBmiActivity(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 p-2.5 rounded text-white text-xs font-medium focus:border-primary focus:outline-none"
                  >
                    <option value="sedentary">Sedentary (No Exercise)</option>
                    <option value="light">Lightly Active (1-2 days/wk)</option>
                    <option value="moderate">Moderately Active (3-5 days/wk)</option>
                    <option value="active">Very Active (6-7 days/wk)</option>
                    <option value="extreme">Extreme Athletic (Double Workouts)</option>
                  </select>
                </div>

              </div>

              {/* Dynamic Outputs (6 cols) */}
              <div className="md:col-span-6 bg-zinc-950 rounded p-5 flex flex-col justify-between border border-zinc-900">
                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4">DYNAMIC ESTIMATES</p>
                
                {bmiResult ? (
                  <div className="space-y-5 flex-1 flex flex-col justify-around">
                    
                    {/* BMI Score */}
                    <div className="grid grid-cols-2 gap-2 border-b border-zinc-900 pb-3">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-zinc-500">BMI SCORE</p>
                        <p className="text-3xl font-display font-semibold tracking-wide text-white mt-1">
                          {bmiResult.bmi}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold text-zinc-500">CLASSIFICATION</p>
                        <p className={`text-xs font-bold mt-2.5 uppercase tracking-wider ${bmiResult.categoryColor}`}>
                          {bmiResult.category}
                        </p>
                      </div>
                    </div>

                    {/* Daily Target Calories */}
                    <div className="border-b border-zinc-900 pb-3">
                      <p className="text-[10px] uppercase font-bold text-zinc-500">DAILY MAINTENANCE CALORIES (TDEE)</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <p className="text-3xl font-display font-semibold tracking-wide text-primary">
                          {bmiResult.calories}
                        </p>
                        <p className="text-[10px] font-mono text-zinc-500">Kcal / Day</p>
                      </div>
                      <p className="text-[9px] text-zinc-600 mt-0.5 font-sans leading-relaxed">
                        To cut fat eat around {bmiResult.calories - 450} Kcal. To build mass bulk around {bmiResult.calories + 350} Kcal.
                      </p>
                    </div>

                    {/* Daily Water suggestions */}
                    <div>
                      <p className="text-[10px] uppercase font-bold text-zinc-500">MINIMUM DAILY HYDRATION</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <p className="text-2xl font-display font-semibold tracking-wide text-white">
                          {bmiResult.water}
                        </p>
                        <p className="text-[10px] font-mono text-primary">Litres / Day</p>
                      </div>
                    </div>

                  </div>
                ) : (
                  <p className="text-zinc-500 text-xs mt-8">Calculating metrics...</p>
                )}

                <button 
                  onClick={() => {
                    setBlueprintGoal(
                      bmiResult && bmiResult.bmi >= 25 
                        ? 'fat_loss' 
                        : bmiResult && bmiResult.bmi < 19 
                          ? 'muscle_gain' 
                          : 'general_fitness'
                    );
                    scrollToSection('blueprint');
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white uppercase text-[10px] font-bold py-2.5 tracking-widest rounded transition-all hover:bg-white hover:text-black mt-6 cursor-pointer"
                >
                  Apply To Exercise Split
                </button>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================== THE COACHING TEAM ==================== */}
      <section id="trainers" className="py-24 bg-charcoal-1 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 inline-block">The Coaching Team</span>
              <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight">
                Meet Your <span className="text-primary italic">Coaches</span>
              </h2>
            </div>
            <div className="bg-primary/5 border border-primary/25 rounded px-4 py-2 cursor-pointer uppercase text-xs tracking-widest font-mono text-zinc-300">
              STAFF RATIO : 1 Coach to 15 Members
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINERS.map((cur) => (
              <div 
                key={cur.id}
                className="bg-charcoal-2 border border-zinc-900 rounded-lg overflow-hidden group select-none hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
              >
                
                {/* Image panel */}
                <div className="aspect-[3/4] overflow-hidden relative w-full">
                  <img 
                    src={cur.imageUrl} 
                    alt={cur.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0 filter saturate-[0.8]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  
                  {/* Absolute positioning badge */}
                  <div className="absolute top-4 right-4 bg-zinc-950/80 border border-zinc-800 px-3 py-1 rounded">
                    <span className="text-[9px] font-mono uppercase text-zinc-400 font-semibold">{cur.experience}</span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                      {cur.role}
                    </p>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                      {cur.name}
                    </h3>
                  </div>
                </div>

                {/* Sub details description */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-zinc-400 text-xs leading-relaxed italic">
                    &quot;{cur.bio}&quot;
                  </p>

                  <div className="border-t border-zinc-950 pt-4 mt-4">
                    <p className="text-[10px] uppercase font-bold text-zinc-500 mb-2">Specializations</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cur.specialties.map((spec) => (
                        <span 
                          key={spec} 
                          className="bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 uppercase px-2 py-0.5 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== DYNAMIC PLAN BUILDER & CALCULATOR ==================== */}
      <section id="blueprint" className="py-24 bg-black px-6 md:px-12 relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 inline-block">VIP Customizer Tool</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight">
              Interactive <span className="text-primary italic">Plan Customizer</span>
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-wider uppercase mt-2">
              Construct your custom packages, extend targets, and calculate optimal discounts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Control Panel (7 cols) */}
            <div className="lg:col-span-7 bg-charcoal-2 border border-zinc-900 p-6 md:p-8 rounded space-y-6">
              
              {/* Step 1: Base Tier select */}
              <div>
                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3">1. SELECT MEMBERSHIP LEVEL</p>
                <div className="grid grid-cols-3 gap-3">
                  {PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlanBase(plan.id)}
                      className={`p-4 rounded border text-left cursor-pointer transition-all ${
                        selectedPlanBase === plan.id
                          ? 'bg-neutral-900 border-primary shadow-lg shadow-primary/5'
                          : 'bg-zinc-900/50 border-zinc-905 text-zinc-400 hover:border-zinc-800'
                      }`}
                    >
                      <h4 className={`font-display text-xl uppercase ${selectedPlanBase === plan.id ? 'text-primary' : 'text-white'}`}>
                        {plan.name.split(' ')[0]}
                      </h4>
                      <p className="text-xs font-semibold text-zinc-200 mt-1">₹{plan.price}<span className="text-[10px] font-normal text-zinc-500">/mo</span></p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Commitment level */}
              <div>
                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3">
                  2. EXTEND TO COMMITMENT SAVINGS (EARN DISCOUNTS)
                </p>
                <div className="grid grid-cols-4 gap-2.5">
                  {[
                    { value: 1, label: '1 Month', off: 'No Discount' },
                    { value: 3, label: '3 Months', off: '10% OFF' },
                    { value: 6, label: '6 Months', off: '15% OFF' },
                    { value: 12, label: '12 Months', off: '25% OFF' },
                  ].map((sub) => (
                    <button
                      key={sub.value}
                      onClick={() => setCommitmentMonths(sub.value)}
                      className={`p-3 rounded border text-center transition-all cursor-pointer ${
                        commitmentMonths === sub.value
                          ? 'bg-primary/10 border-primary text-white shadow-md'
                          : 'bg-zinc-900/80 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-white'
                      }`}
                    >
                      <p className="text-xs md:text-sm font-semibold">{sub.label}</p>
                      <p className={`text-[9px] font-mono mt-0.5 uppercase font-bold ${commitmentMonths === sub.value ? 'text-primary' : 'text-zinc-500'}`}>
                        {sub.off}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Performance Add-ons */}
              <div>
                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3">3. ACCELERATE OPTIONAL LIFESTYLE ADD-ONS</p>
                <div className="space-y-3">
                  
                  {/* Food coach */}
                  <label className="flex items-center justify-between p-3.5 bg-zinc-900/40 rounded border border-zinc-900 cursor-pointer select-none hover:border-zinc-800">
                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        checked={addOnDiet}
                        onChange={(e) => setAddOnDiet(e.target.checked)}
                        className="accent-primary h-4 w-4 rounded border-zinc-800 mt-0.5 cursor-pointer"
                      />
                      <div>
                        <h5 className="text-xs font-semibold text-zinc-200">Personal Nutritional Diet Blueprint Coaching</h5>
                        <p className="text-[10px] text-zinc-500 mt-0.5">Bi-weekly tailored eating macros from our certified nutritionists.</p>
                      </div>
                    </div>
                    <span className="text-xs font-code font-bold text-primary shrink-0 pl-3">+₹499/mo</span>
                  </label>

                  {/* VIP Lockers */}
                  <label className="flex items-center justify-between p-3.5 bg-zinc-900/40 rounded border border-zinc-900 cursor-pointer select-none hover:border-zinc-800">
                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        checked={addOnLocker}
                        onChange={(e) => setAddOnLocker(e.target.checked)}
                        className="accent-primary h-4 w-4 rounded border-zinc-800 mt-0.5 cursor-pointer"
                      />
                      <div>
                        <h5 className="text-xs font-semibold text-zinc-200">VIP Individual Secure Locker & Clean Towel Access</h5>
                        <p className="text-[10px] text-zinc-500 mt-0.5">Retain your keys and belongings safe, fully sanitised clean towel upon every walk-in.</p>
                      </div>
                    </div>
                    <span className="text-xs font-code font-bold text-primary shrink-0 pl-3">+₹199/mo</span>
                  </label>

                  {/* Zumba Yoga passes */}
                  <label className="flex items-center justify-between p-3.5 bg-zinc-900/40 rounded border border-zinc-900 cursor-pointer select-none hover:border-zinc-800">
                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        checked={addOnZumba}
                        onChange={(e) => setAddOnZumba(e.target.checked)}
                        className="accent-primary h-4 w-4 rounded border-zinc-800 mt-0.5 cursor-pointer"
                    />
                      <div>
                        <h5 className="text-xs font-semibold text-zinc-200">Zumba Dance, Aerobics & Yin Yoga Group Passes</h5>
                        <p className="text-[10px] text-zinc-500 mt-0.5">Unlimited entry to morning zumba and flexibility yoga slots.</p>
                      </div>
                    </div>
                    <span className="text-xs font-code font-bold text-primary shrink-0 pl-3">+₹299/mo</span>
                  </label>

                </div>
              </div>

            </div>

            {/* Results Output Invoice (5 cols) */}
            <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-sm p-6 space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                  VIP SYSTEM CONTRACT TICKET
                </span>
                <h3 className="font-display text-3xl font-semibold uppercase tracking-wide text-zinc-100 mt-2">
                  Membership Estimate
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">Dynamic contract calculation for Banswara resident</p>
              </div>

              {/* Pricing Math lines */}
              <div className="space-y-3.5 border-y border-zinc-900 py-5 font-mono text-xs">
                
                <div className="flex justify-between">
                  <span className="text-zinc-500">Selected Level:</span>
                  <span className="text-white font-semibold">
                    {PLANS.find(p => p.id === selectedPlanBase)?.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Commitment Period:</span>
                  <span className="text-white font-semibold">
                    {commitmentMonths} Month{commitmentMonths > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Base Unit Rate:</span>
                  <span className="text-zinc-300">₹{pricingSummary.base}/month</span>
                </div>

                {pricingSummary.addOns > 0 && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Optional Add-ons:</span>
                    <span className="text-primary font-bold">+₹{pricingSummary.addOns}/month</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-zinc-900 pt-3 italic">
                  <span className="text-zinc-500">Subtotal Monthly:</span>
                  <span className="text-zinc-300">₹{pricingSummary.base + pricingSummary.addOns}/mo</span>
                </div>

                {pricingSummary.discount > 0 && (
                  <div className="flex justify-between bg-emerald-900/15 border border-emerald-950 p-2 rounded">
                    <span className="text-emerald-500 font-bold uppercase">{pricingSummary.discountPercent}% Savings Activated:</span>
                    <span className="text-emerald-400 font-bold">-₹{pricingSummary.discount} Saved</span>
                  </div>
                )}

              </div>

              {/* Total final sums */}
              <div className="flex justify-between items-baseline font-mono">
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-550">NET PAYABLE LUMP-SUM</p>
                  <p className="text-sm text-zinc-500 mt-0.5">For {commitmentMonths} months contract</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-display font-semibold text-white">
                    ₹{pricingSummary.total}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Equivalent to ₹{pricingSummary?.netMonthly}/mo</p>
                </div>
              </div>

              <div className="bg-charcoal-2 border border-zinc-900 rounded p-4">
                <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="text-emerald-500 w-4 h-4" />
                  YFC Contract Protection Policy
                </p>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-sans">
                  No activation setups or processing fees. Cancel or relocate freeze active for up to 2 weeks for business travel or medical concerns.
                </p>
              </div>

              <button 
                onClick={() => {
                  const activePlanName = PLANS.find(p => p.id === selectedPlanBase)?.name || 'Custom Plan';
                  setFormData(prev => ({
                    ...prev,
                    tier: `${activePlanName} (${commitmentMonths} Months Booking)`
                  }));
                  scrollToSection('contact');
                }}
                className="w-full bg-primary hover:bg-primary-bright text-white uppercase text-xs font-bold py-3.5 tracking-widest rounded transition-all shadow-md active:scale-95 duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                Assemble This Custom Contract
                <ChevronRight size={14} />
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* ==================== ORIGINAL PRICING MATRIX STATIC REFERENCE ==================== */}
      <section id="membership" className="py-24 bg-charcoal-1 px-6 md:px-12 relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 inline-block">Official Base Tariffs</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight">
              Pricing <span className="text-primary italic">Tariffs</span>
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-wider uppercase mt-2">
              Simple flat rates without surprise surcharges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`border rounded-lg p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.featured 
                    ? 'border-primary/60 bg-[#070000] shadow-xl shadow-primary/5 hover:border-primary scale-102' 
                    : 'border-zinc-900 bg-charcoal-2 hover:border-zinc-700'
                }`}
              >
                {/* Popular badge */}
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-lg">
                    MOST POPULAR BLUEPRINT
                  </span>
                )}

                <div>
                  <h3 className="font-display text-3xl font-semibold uppercase tracking-wider text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-zinc-500 tracking-wider mb-6 leading-relaxed">
                    {plan.tagline}
                  </p>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1.5 mb-8 border-b border-zinc-900 pb-6">
                    <span className="text-xl font-bold text-zinc-400">₹</span>
                    <span className="text-5xl font-display font-semibold tracking-wide text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-500 uppercase font-mono">/ {plan.period}</span>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-zinc-400 text-xs leading-relaxed">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.featured ? 'text-primary' : 'text-zinc-650'}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => {
                    setFormData(prev => ({ ...prev, tier: plan.name }));
                    scrollToSection('contact');
                  }}
                  className={`w-full py-3 text-xs font-bold uppercase tracking-widest rounded transition-all duration-200 cursor-pointer ${
                    plan.featured 
                      ? 'bg-primary hover:bg-primary-bright text-white shadow-md' 
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
                  }`}
                >
                  Acquire {plan.name.split(' ')[0]} Now
                </button>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== WEEKLY CLASS SCHEDULE PLANNER ==================== */}
      <section id="schedule" className="py-24 bg-black px-6 md:px-12 relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 inline-block">Active High-Energy Community</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight">
              Class <span className="text-primary italic">Schedule</span>
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-wider uppercase mt-2">
              Choose your sessions and fuel metabolic stamina
            </p>
          </div>

          {/* Filter Days */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-10 border-b border-zinc-900 pb-6">
            {scheduleDays.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedScheduleDay(day)}
                className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest border transition-all rounded ${
                  selectedScheduleDay === day 
                    ? 'bg-zinc-100 border-zinc-100 text-black scale-102' 
                    : 'bg-zinc-900/60 border-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule Table Grid */}
          <div className="bg-charcoal-2 border border-zinc-900 rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px] text-zinc-300">
                
                <thead>
                  <tr className="bg-zinc-950 font-mono text-[10px] text-zinc-400 uppercase tracking-widest border-b border-zinc-900">
                    <th className="py-4.5 px-6">Class Program</th>
                    <th className="py-4.5 px-6">Timing Schedule</th>
                    <th className="py-4.5 px-6">Lead Instructor</th>
                    <th className="py-4.5 px-6">Target Day</th>
                    <th className="py-4.5 px-6">Workout Intensity</th>
                    <th className="py-4.5 px-6 text-right">Join Protocols</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-900 text-xs">
                  {filteredSchedule.map((cl) => (
                    <tr key={cl.id} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-4 px-6 md:py-5.5 font-bold text-white flex items-center gap-2.5">
                        <Flame size={13} className="text-primary" />
                        {cl.className}
                      </td>
                      <td className="py-4 px-6 md:py-5.5 font-mono text-zinc-400">
                        {cl.time}
                      </td>
                      <td className="py-4 px-6 md:py-5.5">
                        {cl.trainer}
                      </td>
                      <td className="py-4 px-6 md:py-5.5 uppercase font-mono text-[10px] text-zinc-400">
                        {cl.day}
                      </td>
                      <td className="py-4 px-6 md:py-5.5">
                        <span className={`px-2.5 py-0.5 text-[9px] font-mono rounded font-bold uppercase ${
                          cl.intensity === 'Extreme' 
                            ? 'bg-primary/20 text-primary border border-primary/22' 
                            : cl.intensity === 'High' 
                              ? 'bg-amber-900/20 text-amber-500 border border-amber-900/22' 
                              : 'bg-emerald-900/20 text-emerald-400 border border-emerald-900/22'
                        }`}>
                          {cl.intensity}
                        </span>
                      </td>
                      <td className="py-4 px-6 md:py-5.5 text-right">
                        <span 
                          onClick={() => {
                            setFormData(prev => ({ ...prev, targetGoal: cl.className }));
                            scrollToSection('contact');
                          }}
                          className="text-[10px] font-mono font-bold tracking-wider text-primary border border-primary/22 hover:bg-primary hover:text-white px-2.5 py-1 rounded cursor-pointer transition-all duration-200"
                        >
                          REGISTER PASS
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredSchedule.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-zinc-500 font-mono">
                        No official group slots configured on this day layout.
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
            
            <div className="bg-zinc-950 border-t border-zinc-900 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] text-zinc-500 font-sans">
              <p>📌 Bring dry sport shoes of gym layout standard. Clean towels are issued in the VIP shower zone.</p>
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Zumba GRP Slots</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Hypertrophy Classes</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Heavy Duty Squat squad</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== MEMBER TESTIMONIALS SLIDER SECTION ==================== */}
      <section id="testimonials" className="py-24 bg-charcoal-1 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 inline-block">Member Trust Reviews</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight">
              Aesthetic <span className="text-primary italic">Reviews</span>
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-wider uppercase mt-2">
              Read real testaments from verified Banswara fitness members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id}
                className="bg-charcoal-2 border border-zinc-900 rounded p-6 md:p-8 flex flex-col justify-between hover:border-primary/30 group transition-all duration-350 relative overflow-hidden"
              >
                {/* Large quote watermark */}
                <span className="absolute -top-3.5 right-4 font-display text-8xl text-primary/5 select-none leading-none pointer-events-none">
                  “
                </span>

                <div>
                  {/* Rating stars */}
                  <div className="flex items-center gap-1 text-primary text-xs mb-4">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed italic mb-8">
                    &quot;{test.text}&quot;
                  </p>
                </div>

                {/* Author row */}
                <div className="flex items-center gap-3 border-t border-zinc-900/45 pt-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/40 shrink-0">
                    <img 
                      src={test.avatarUrl} 
                      alt={test.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">{test.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{test.meta}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== VIRTUAL MAP & HOURS SPECIFICS ==================== */}
      <section id="location" className="py-24 bg-black px-6 md:px-12 relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Find us details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold tracking-widest text-primary uppercase inline-block">Banswara Flagship Location</span>
              <h2 className="font-display text-5xl md:text-7xl font-bold uppercase leading-[0.95] tracking-tight text-white animate-pulse">
                Find <span className="text-primary italic">Us</span>
              </h2>
              
              <div className="space-y-1.5 font-sans">
                <h3 className="text-lg font-bold text-white tracking-widest uppercase">YFC PRIME ATHLETICS</h3>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                  Udaipur-Dungarpur Link Road,<br />
                  Near Maharana Pratap Circle, Wadiya Colony,<br />
                  Banswara, Rajasthan 327001
                </p>
              </div>

              {/* Gym timings list */}
              <div className="bg-charcoal-2 border border-zinc-900 p-5 rounded space-y-3">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <Clock size={13} />
                  Operational Hours
                </h4>
                
                <div className="space-y-2 text-xs divide-y divide-zinc-900">
                  <div className="flex justify-between py-1.5">
                    <span className="text-zinc-450 font-medium">Monday – Friday</span>
                    <span className="font-mono text-white text-[11px] font-semibold">05:00 AM – 10:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1.5 pt-2">
                    <span className="text-zinc-450 font-medium">Saturday</span>
                    <span className="font-mono text-white text-[11px] font-semibold">06:00 AM – 09:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1.5 pt-2">
                    <span className="text-zinc-450 font-medium">Sunday</span>
                    <span className="font-mono text-primary text-[11px] font-bold">06:00 AM – 11:00 AM</span>
                  </div>
                </div>
              </div>

              {/* Quick instructions */}
              <div className="bg-primary/5 border border-primary/20 p-4 rounded text-xs text-zinc-300 flex items-start gap-3">
                <MapPin className="text-primary shrink-0 w-5 h-5 mt-0.5" />
                <p className="leading-relaxed">
                  Excellent direct roadside parking facility suitable for both high clearance sport cars and motorbikes. Directly opposing Wadiya colony blocks.
                </p>
              </div>
            </div>

            {/* Google Maps visual representation (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative border border-zinc-900 rounded-lg overflow-hidden bg-zinc-900 shadow-2xl h-[360px]">
                {/* Embed Map centered on Banswara, Rajasthan */}
                <iframe 
                  src="https://maps.google.com/maps?q=Maharana%20Pratap%20Circle,%20Wadiya%20Colony,%20Banswara,%20Rajasthan%20327001&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full border-0 brightness-[0.7] contrast-105 invert-[0.9] hue-rotate-[190deg]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="YFC Prime Location Map Frame"
                  id="g-map-frame"
                />
                
                {/* Map Floating badge indicator */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/95 border border-zinc-800 text-white font-sans text-xs px-4 py-3 rounded shadow-xl flex items-center justify-between gap-3 z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping inline-block" />
                    <p className="font-bold text-[11px] uppercase tracking-wider">
                      📍 YFC PRIME FLAGSHIP
                    </p>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Maharana+Pratap+Circle,+Wadiya+Colony,+Banswara" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono hover:underline text-primary font-bold shrink-0 uppercase"
                  >
                    Open Directions
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== CONTACT GATEWAY & PASS BLUEPRINT GENERATOR ==================== */}
      <section id="contact" className="py-24 bg-charcoal-1 border-y border-zinc-900 px-6 md:px-12 relative">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 inline-block">Contact Registration Portal</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight">
              Start Your <span className="text-primary italic">Journey</span>
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-wider uppercase mt-2">
              Ready to construct a transformation? Complete the layout below to instantly build your VIP pass
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Form Column (12 to 7 cols) */}
            <div className="lg:col-span-7">
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Your Full Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="w-full bg-zinc-950 border border-zinc-900 p-3 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-sans"
                  />
                </div>

                {/* Sub row: Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Contact Mobile Number *
                    </label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="e.g. +91 9xxxx xxxxx"
                      className="w-full bg-zinc-950 border border-zinc-900 p-3 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-sans"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full bg-zinc-950 border border-zinc-900 p-3 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-sans"
                    />
                  </div>

                </div>

                {/* Preferred Plan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Ideal Target Plan
                    </label>
                    <select 
                      value={formData.tier}
                      onChange={(e) => setFormData(prev => ({ ...prev, tier: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-900 p-3 rounded text-xs text-white focus:outline-none focus:border-primary font-sans"
                    >
                      <option value="Basic Plan">Basic Plan (₹999/mo)</option>
                      <option value="Pro Athlete Plan">Pro Athlete Plan (₹1799/mo)</option>
                      <option value="Elite Transformation">Elite Transformation (₹2999/mo)</option>
                      <option value="Custom Extended Period">Custom Tailored Plan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Primary Fitness Goal
                    </label>
                    <select 
                      value={formData.targetGoal}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetGoal: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-900 p-3 rounded text-xs text-white focus:outline-none focus:border-primary font-sans"
                    >
                      <option value="Fat Loss">Fat Loss & Leanness</option>
                      <option value="Muscle Hypertrophy">Muscle Hypertrophy & Bulk</option>
                      <option value="Neurological Strength">Strength Lifting & Competitions</option>
                      <option value="General Wellness">General Wellness & Posture</option>
                    </select>
                  </div>

                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-[10px] text-zinc-500 leading-relaxed font-sans cursor-pointer">
                    <input 
                      type="checkbox" 
                      required
                      checked={formData.acceptedTerms}
                      onChange={(e) => setFormData(prev => ({ ...prev, acceptedTerms: e.target.checked }))}
                      className="accent-primary h-3.5 w-3.5 rounded mt-0.5 border-zinc-800"
                    />
                    <span>
                      Agree to construct standard security guidelines. Confirming that I will carry dedicated neat sport shoes strictly for gym flooring usage.
                    </span>
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4.5 bg-primary hover:bg-primary-bright text-white uppercase text-xs font-bold tracking-widest rounded transition-all active:scale-[0.99] shadow-lg shadow-primary/20 mt-4 cursor-pointer"
                >
                  Generate VIP Guest Pass Code
                </button>

              </form>
            </div>

            {/* Guest Pass Output Display (12 to 5 cols) */}
            <div className="lg:col-span-5 font-mono">
              <AnimatePresence mode="wait">
                {guestPass ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-zinc-950 border-2 border-dashed border-primary/50 rounded-sm p-5 space-y-4 shadow-xl text-xs relative select-none"
                    id="guest-pass-card"
                  >
                    {/* Top Notch design */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-12 bg-charcoal-1 border-b border-x border-zinc-850 rounded-b" />
                    
                    <div className="text-center pt-3 pb-1 border-b border-zinc-900">
                      <h4 className="font-display text-2xl tracking-widest text-primary font-bold">YFC PASS-TICKET</h4>
                      <p className="text-[9px] uppercase tracking-wider text-zinc-500 mt-0.5">VIP PASS VALID FOR 3 DAYS</p>
                    </div>

                    <div className="space-y-3 pt-2 font-mono">
                      
                      <div>
                        <span className="text-[9px] uppercase text-zinc-500">PASS CODE</span>
                        <p className="text-lg font-bold text-white tracking-widest bg-zinc-900 border border-zinc-850 p-2.5 text-center rounded-sm select-all mt-1">
                          {guestPass.code}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-2 text-[10px]">
                        <div>
                          <span className="text-[9px] uppercase text-zinc-500 text-left block">PASS HOLDER</span>
                          <span className="text-zinc-200 block truncate font-bold uppercase mt-1">{guestPass.holder}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] uppercase text-zinc-500 block">TIER GOAL</span>
                          <span className="text-zinc-200 block font-bold uppercase mt-1 truncate">{guestPass.passType.split(' ')[0]}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                        <div>
                          <span className="text-[9px] uppercase text-zinc-500 text-left block">EXPIRES ON</span>
                          <span className="text-primary block font-bold mt-1 uppercase">{guestPass.expiresAt}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] uppercase text-zinc-555 block">GENERATED AT</span>
                          <span className="text-zinc-400 block font-medium mt-1">{guestPass.timestamp} (IST)</span>
                        </div>
                      </div>

                    </div>

                    <div className="border-t border-zinc-900 pb-2 pt-4 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold mb-1.5 font-sans">
                        <ShieldCheck size={14} className="animate-pulse" />
                        <span>Pass Registered Securely</span>
                      </div>
                      <p className="text-[9px] leading-relaxed text-zinc-500 font-light font-sans">
                        Take a screenshot or note the unique pass code. Walk in directly at the Udaipur-Dungarpur Ring Link Road and present to the front managers.
                      </p>
                    </div>

                    {/* Quick WhatsApp Share link */}
                    <a 
                      href={`https://wa.me/919876543210?text=Hi%20YFC%20Prime%2C%20I%20have%20generated%20VIP%20Guest%20Pass%3A%20${guestPass.code}%20for%20${guestPass.holder}!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-bold py-2 rounded-sm transition-colors mt-4 select-none font-sans"
                    >
                      🚀 Send Code to official WhatsApp
                    </a>

                  </motion.div>
                ) : (
                  <div className="bg-zinc-950/40 border border-zinc-900 rounded p-6 text-center text-zinc-600 h-full flex flex-col justify-center items-center py-16 gap-3">
                    <User size={30} className="text-zinc-700 animate-pulse" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Awaiting Pass Inputs</p>
                      <p className="text-[10px] text-zinc-500 leading-normal max-w-xs mx-auto mt-1">
                        Fill your name and preferred goal targets in the registration portal to instantly construct your digital access pass.
                      </p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Quick contact buttons as in user's layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 max-w-2xl mx-auto border-t border-zinc-900/40 pt-12">
            <a 
              href="tel:+919876543210" 
              className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 p-4 rounded text-zinc-300 hover:text-white hover:border-zinc-500 transition-all font-sans text-xs uppercase font-bold tracking-widest text-center"
            >
              <Phone size={16} className="text-primary" />
              Call Support: +91 98765 43210
            </a>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 p-4 rounded text-[#25D366] hover:bg-[#25D366]/20 transition-all font-sans text-xs uppercase font-bold tracking-widest text-center"
            >
              <MessageCircle size={16} />
              WhatsApp Direct Chat
            </a>
          </div>

        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-black border-t border-zinc-950 py-12 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span 
            onClick={() => scrollToSection('hero')} 
            className="font-display text-2xl tracking-widest cursor-pointer"
          >
            YFC <span className="text-primary">PRIME</span>
          </span>
          <p className="text-[10px] text-zinc-650 mt-1 uppercase tracking-widest font-mono">Bigger. Better. Stronger.</p>
        </div>

        <div className="text-center sm:text-right space-y-1">
          <p className="text-[10px] text-zinc-500 font-mono">
            &copy; {new Date().getFullYear()} YFC Prime Gym Banswara. All permissions registered under licensing regulations.
          </p>
          <p className="text-[9px] text-zinc-600">
            Pristine layout designed in Rajasthan, India. Handled securely by standard systems.
          </p>
        </div>
      </footer>

      {/* ==================== FLOATING WHATSAPP BUTTON ==================== */}
      <div id="wa-float" className="fixed bottom-6 right-6 z-40">
        <a 
          href="https://wa.me/919876543210?text=Hi%20YFC%20Prime%2C%20I%20visited%20your%20website%20and%20interested%20to%20know%20more!" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-transform duration-200"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulse ring indicators as in user layout */}
          <span className="absolute -inset-1.5 rounded-full border-2 border-[#25D366]/40 animate-ping pointer-events-none" />
          <span className="absolute -inset-3 rounded-full border border-[#25D366]/20 animate-pulse pointer-events-none" />
          <MessageCircle size={28} className="fill-white" />
        </a>
      </div>

      {/* ==================== BACK TO TOP CONTROLLER ==================== */}
      <AnimatePresence>
        {backToTopVisible && (
          <motion.button 
            id="back-top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-40 w-11 h-11 bg-primary hover:bg-primary-bright text-white flex items-center justify-center rounded-sm transition-transform active:scale-90 shadow-lg shadow-primary/20 pointer-events-auto border-none cursor-pointer"
            aria-label="Back to Top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
