"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Dumbbell,
  Flame,
  Sparkles,
  Shield,
  Timer,
  CheckCircle2,
  ArrowRight, 
  Mail,
  Phone,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*************************************************
 * COMMERCE / SCHEDULING CONFIG
 *************************************************/
const STRIPE = {
  FOUNDATIONS: "https://buy.stripe.com/7sY8wP2vz8Gv8tggAldby08",
  ELITE: "https://buy.stripe.com/8x23cvfil8Gv10O97Tdby09",
  POWERCUT: "https://buy.stripe.com/6oUdR98TX4qfbFs1Frdby0a",
};
// Example: https://calendly.com/<handle>/consultation-15
const CALENDLY = "https://calendly.com/danielislam/1-1-coaching-pow-wow";

/*************************************************
 * UTILITIES
 *************************************************/
const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const TRANSITION_CLASS = "transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]";
const MOTION_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
const fadeUpVariant = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};
const heroImageVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.08 },
  },
};
const MAGNETIC_SPRING = { stiffness: 320, damping: 26, mass: 0.7 };

function useMagnetic<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, MAGNETIC_SPRING);
  const springY = useSpring(y, MAGNETIC_SPRING);
  const innerX = useTransform(springX, (value) => value * 0.1);
  const innerY = useTransform(springY, (value) => value * 0.1);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!active || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);

      x.set(offsetX * 0.04);
      y.set(offsetY * 0.04);
    },
    [active, x, y]
  );

  const handlePointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x: springX, y: springY, innerX, innerY, handlePointerMove, handlePointerLeave };
}

/*************************************************
 * SMALL, REUSABLE UI BITS (unstyled -> Tailwind only)
 *************************************************/
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: false;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
};
function Button({
  variant = "solid",
  size = "md",
  className = "",
  magnetic = false,
  children,
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: ButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const active = magnetic && !prefersReducedMotion;
  const { ref, x, y, innerX, innerY, handlePointerMove, handlePointerLeave } = useMagnetic<HTMLButtonElement>(active);
  const base =
    `${TRANSITION_CLASS} inline-flex items-center justify-center rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-2`;
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  }[size];
  const variants = {
    solid:
      "bg-black text-white hover:bg-[#383838] dark:bg-white dark:text-black dark:hover:bg-[#ccc] focus:ring-black/30 dark:focus:ring-white/40",
    outline:
      "border border-black/15 bg-white text-black hover:text-blue-600 dark:border-white/20 dark:bg-transparent dark:text-white",
  }[variant];

  const motionStyle = active ? ({ ...(style ?? {}), x, y } as any) : style;
  const contentClass = "relative inline-flex items-center gap-2";
  const content = active ? (
    <motion.span style={{ x: innerX, y: innerY }} className={contentClass}>
      {children}
    </motion.span>
  ) : (
    <span className={contentClass}>{children}</span>
  );

  const { onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, onAnimationIteration, ...motionProps } = props;

  return (
    <motion.button
      ref={ref}
      className={`${base} ${sizes} ${variants} ${className} ${active ? "relative overflow-hidden" : ""}`}
      style={motionStyle}
      onPointerMove={(event) => {
        if (active) handlePointerMove(event);
        onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        if (active) handlePointerLeave();
        onPointerLeave?.(event);
      }}
      whileHover={active ? { scale: 1.02 } : undefined}
      whileTap={active ? { scale: 0.98 } : undefined}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}

function AnchorButton({
  href,
  children,
  variant = "solid",
  size = "md",
  className = "",
  magnetic = false,
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  magnetic?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const prefersReducedMotion = useReducedMotion();
  const active = magnetic && !prefersReducedMotion;
  const { ref, x, y, innerX, innerY, handlePointerMove, handlePointerLeave } = useMagnetic<HTMLAnchorElement>(active);
  const base =
    `${TRANSITION_CLASS} inline-flex items-center justify-center rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-2`;
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  }[size];
  const variants = {
    solid:
      "bg-black text-white hover:bg-[#383838] dark:bg-white dark:text-black dark:hover:bg-[#ccc] focus:ring-black/30 dark:focus:ring-white/40",
    outline:
      "border border-black/15 bg-white text-black hover:text-blue-600 dark:border-white/20 dark:bg-transparent dark:text-white",
  }[variant];

  // Filter out HTML drag events and animation events that conflict with Framer Motion
  const { onDrag, onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDrop, onAnimationStart, onAnimationEnd, onAnimationIteration, ...motionProps } = rest;

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`${base} ${sizes} ${variants} ${className} ${active ? "relative overflow-hidden" : ""}`}
      style={active ? ({ ...(style ?? {}), x, y } as any) : style}
      onPointerMove={(event) => {
        if (active) handlePointerMove(event);
        onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        if (active) handlePointerLeave();
        onPointerLeave?.(event);
      }}
      whileHover={active ? { scale: 1.015 } : undefined}
      whileTap={active ? { scale: 0.985 } : undefined}
      {...motionProps}
    >
      {active ? (
        <motion.span style={{ x: innerX, y: innerY }} className="relative inline-flex items-center gap-2">
          {children}
        </motion.span>
      ) : (
        <span className="relative inline-flex items-center gap-2">{children}</span>
      )}
    </motion.a>
  );
}

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-xs font-medium tracking-wide text-slate-200">
    {children}
  </span>
);

const Feature = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2">
    <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-300" />
    <p className="text-sm leading-relaxed text-slate-300">{children}</p>
  </div>
);

/*************************************************
 * BASIC CARD & FORM INPUTS (Tailwind only)
 *************************************************/
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`${TRANSITION_CLASS} rounded-2xl border border-white/10 bg-slate-900/60 ${className}`}>{children}</div>;
}
function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="p-5">{children}</div>;
}
function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}
function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-5 pb-5 ${className}`}>{children}</div>;
}
function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="px-5 pb-5">{children}</div>;
}

function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      className={`h-11 w-full rounded-lg border border-white/15 bg-transparent px-3 text-white placeholder-zinc-400 outline-none transition focus:border-white/40 ${className}`}
      {...props}
    />
  );
}

function Textarea({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string }) {
  return (
    <textarea
      className={`w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-white placeholder-zinc-400 outline-none transition focus:border-white/40 ${className}`}
      {...props}
    />
  );
}

/*************************************************
 * PROGRAM CARD (Tailwind only)
 *************************************************/
type ProgramCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  tagline: string;
  price: number;
  bullets: string[];
  label: string;
  checkoutUrl: string;
  badge?: string;
};
const ProgramCard = ({ icon: Icon, title, tagline, price, bullets, label, checkoutUrl, badge }: ProgramCardProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="group relative"
      initial={prefersReducedMotion ? undefined : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.35 }}
      variants={prefersReducedMotion ? undefined : fadeUpVariant}
      transition={{ duration: 0.6, ease: MOTION_EASE }}
      whileHover={prefersReducedMotion ? undefined : { y: -12, scale: 1.01 }}
      whileTap={prefersReducedMotion ? undefined : { y: -4 }}
    >
      <Card className="relative overflow-visible bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-xl hover:border-white/20 hover:shadow-[0_28px_52px_-28px_rgba(56,189,248,0.55)]">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(1200px_500px_at_80%_-20%,rgba(59,130,246,.3),transparent_60%)]" />
        {badge && (
          <span className="pointer-events-none absolute left-1/2 top-0 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-white/20 bg-gradient-to-r from-sky-400/25 via-cyan-300/25 to-teal-300/25 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-teal-100 shadow-[0_18px_45px_-18px_rgba(34,211,238,0.6)] backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-teal-100" />
            {badge}
          </span>
        )}
        <CardHeader>
          <div className="mb-2">
            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
              {label}
            </span>
          </div>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Icon className="h-7 w-7" />
            <span>{title}</span>
          </CardTitle>
          <p className="mt-1 text-sm text-slate-300">{tagline}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-3xl font-semibold">
            ${price}
            <span className="ml-1 text-base font-normal text-slate-300"> one-time</span>
          </div>
          <div className="space-y-2">
            {bullets.map((b, i) => (
              <Feature key={i}>{b}</Feature>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <AnchorButton magnetic href={checkoutUrl} target="_blank" rel="noreferrer" size="lg" className="w-full">
            Get Program <ArrowRight className="ml-2 h-4 w-4" />
          </AnchorButton>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

/*************************************************
 * PAGE
 *************************************************/
export default function AestheticaFitnessCoaching() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", goals: "", time: "" });
  const [submitting, setSubmitting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setScrollProgress(max > 0 ? (scrollTop / max) * 100 : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.goals) {
      alert("Please complete name, email, and your goals.");
      return;
    }
    setSubmitting(true);
    try {
      console.log("Consultation request:", form);
      alert("Consultation request sent! I’ll email you within 24 hours.");
      setForm({ name: "", email: "", phone: "", goals: "", time: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen scroll-smooth bg-slate-950 text-slate-100">
      {/* background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(800px_400px_at_20%_-10%,rgba(59,130,246,.35),transparent),radial-gradient(600px_300px_at_80%_-10%,rgba(16,185,129,.25),transparent)]" />

      {/* HEADER */}
<header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2 sm:px-4 sm:py-3">
    <div className="flex items-center gap-2 sm:gap-3">
      <Image
        src="/logo.png"
        alt="Aesthetica Logo"
        width={32}
        height={32}
        className="rounded-lg sm:w-9 sm:h-9"
      />
      <div>
        <p className="text-xs sm:text-sm font-semibold text-white">Aesthetica</p>
        <p className="text-xs text-slate-400">Fitness Coaching</p>
      </div>
    </div>

    <nav className="hidden items-center gap-4 md:gap-6 md:flex">
      <button className="text-sm hover:text-white/90" onClick={() => scrollToId("programs")}>Programs</button>
      <button className="text-sm hover:text-white/90" onClick={() => scrollToId("coaching")}>Coaching</button>
      <button className="text-sm hover:text-white/90" onClick={() => scrollToId("results")}>Results</button>
      <button className="text-sm hover:text-white/90" onClick={() => scrollToId("faq")}>FAQ</button>
      <Button onClick={() => scrollToId("consult")} size="sm" className="bg-blue-600">Book Consult</Button>
    </nav>

    <Button variant="outline" size="sm" className="text-xs px-3 md:hidden" onClick={() => scrollToId("consult")}>
      Consult
    </Button>
  </div>
</header>

      {/* HERO */}
<section className="relative isolate">
  {/* Hero band: holds content + background; background stops at the end of this block */}
  <div className="relative min-h-[420px] sm:min-h-[520px]">
    <motion.div
      className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 sm:gap-10 px-3 sm:px-4 pb-12 sm:pb-20 pt-12 sm:pt-16 md:grid-cols-2 md:pb-28 md:pt-24"
      initial={prefersReducedMotion ? undefined : "hidden"}
      animate={prefersReducedMotion ? undefined : "visible"}
      variants={prefersReducedMotion ? undefined : staggerContainer}
    >
      <motion.div
        variants={prefersReducedMotion ? undefined : fadeUpVariant}
        transition={{ duration: 0.7, ease: MOTION_EASE }}
      >
        <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-2">
          <Pill>Strength in Form</Pill>
          <Pill>Muscle • Performance • Longevity</Pill>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Sculpt a powerful,{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
            timeless physique
          </span>
        </h1>

        <p className="mt-3 sm:mt-4 max-w-xl text-base sm:text-lg text-slate-300">
          No fluff. Evidence-based programming, clean nutrition guidance, and accountability that actually moves the
          needle. Build a body that performs as good as it looks.
        </p>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
          <Button magnetic size="lg" className="bg-blue-600 w-full sm:w-auto" onClick={() => scrollToId("programs")}>
            Browse Programs
          </Button>
          <Button
            magnetic
            size="lg"
            variant="outline"
            className="bg-white text-black hover:text-blue-600 w-full sm:w-auto"
            onClick={() => scrollToId("consult")}
          >
            Free Consult <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-slate-400">
          <div className="flex items-center gap-2"><Shield className="h-4 w-4" /> Science-driven</div>
          <div className="flex items-center gap-2"><Timer className="h-4 w-4" /> Busy-life friendly</div>
          <div className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Sustainable results</div>
        </div>
      </motion.div>

      <motion.div
        className="relative mt-8 md:mt-0"
        variants={prefersReducedMotion ? undefined : heroImageVariant}
        transition={{ duration: 0.8, ease: MOTION_EASE }}
      >
        <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 blur-2xl" />
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 sm:p-6 shadow-2xl">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <Stat label="Years Training" value="10+" />
            <Stat label="Clients Helped" value="150+" />
            <Stat label="Avg. PR Increase (12w)" value="12%" />
          </div>
          <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3 text-xs text-slate-300">
            {["Hypertrophy", "Strength", "Body Recomp", "Mobility", "Conditioning", "Mindset"].map((t) => (
              <div key={t} className="rounded-xl border border-white/10 px-2 py-1.5 sm:px-3 sm:py-2 text-center text-xs">
                {t}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>

  {/* Subtle hero background image (limited to the hero band above) */}
  <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
    <Image
      src="/physique/bg-hero.jpg"
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover opacity-30 blur-[1px]"
      style={{ objectPosition: "30% center" }} // bias to the right
    />
  </div>
</section>

      {/* FEATURED IMAGE (high visibility) */}
      <section className="mx-auto max-w-6xl px-3 sm:px-4 pt-6 sm:pt-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <Image
            src="/physique/hero-wide.jpg"
            alt="Physique highlight"
            width={1600}
            height={900}
            priority
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
          {/* Gentle gradient for legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Programs</h2>
            <p className="mt-2 max-w-2xl text-slate-300">
              Choose the path that fits your goals and schedule. All programs include warm-ups, progression, and video
              demos.
            </p>
          </div>
          <a href="#faq" className="hidden items-center gap-1 text-sm text-slate-300 hover:text-white md:flex">
            How do I choose? <ChevronDown className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ProgramCard
            icon={Dumbbell}
            title="Aesthetica: Foundations"
            tagline="4-day split for busy lifters — master the basics, build quality muscle."
            price={79}
            label="Beginner/Intermediate"
            checkoutUrl={STRIPE.FOUNDATIONS}
            bullets={[
              "Push/Pull/Lower/Upper structure with smart volume",
              "Technique cues + movement substitutions",
              "Progress trackers + deload guidance",
              "Grocery list & high-protein meal builder",
            ]}
          />
          <ProgramCard
            icon={Sparkles}
            title="Aesthetica: Elite"
            tagline="5–6 day advanced hypertrophy cycle for maximal physique development."
            price={99}
            label="Advanced"
            checkoutUrl={STRIPE.ELITE}
            badge="Most Popular"
            bullets={[
              "Periodized mesocycles (12 weeks)",
              "Specialization blocks for lagging parts",
              "Conditioning finishers that won’t kill gains",
              "Macro targets + supplement guide",
            ]}
          />
          <ProgramCard
            icon={Flame}
            title="Aesthetica: Power-Cut"
            tagline="Fat-loss without losing strength — look sharper, lift strong."
            price={89}
            label="Transformation"
            checkoutUrl={STRIPE.POWERCUT}
            bullets={[
              "3–4 day strength-biased split",
              "Step & cardio protocol — no treadmill prison",
              "Hunger management & hydration plan",
              "Restaurant & travel survival playbook",
            ]}
          />
        </div>

        <div className="mt-6 text-center text-sm text-slate-400">
          Secure checkout via Stripe
        </div>
      </section>

      {/* COACHING */}
      <section id="coaching" className="mx-auto max-w-6xl px-4 py-20 relative isolate overflow-hidden">
        {/* Background image (very subtle) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/physique/bg-coaching.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-slate-950/40" />
        </div>

  {/* Existing coaching content below */}
  <div className="relative z-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">1:1 Coaching</h2>
            <p className="mt-3 text-slate-300">
              Premium guidance for serious results. We’ll tailor training, nutrition, and recovery to your lifestyle and
              equipment. Expect honesty, data, and accountability. No fluff.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3">
              <Feature>Custom periodized plan that evolves with your progress</Feature>
              <Feature>Weekly check-ins with metrics, videos, and feedback</Feature>
              <Feature>Macro strategy built for performance and sanity</Feature>
              <Feature>Messaging access for quick form checks & adjustments</Feature>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button magnetic className="bg-blue-600" onClick={() => scrollToId("consult")}>
                Book Consultation
              </Button>
              <Button
                variant="outline"
                className="bg-white text-black hover:text-blue-600"
                onClick={() => scrollToId("results")}
              >
                See Results
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <h3 className="mb-4 text-xl font-semibold">Coach Bio</h3>
            <p className="text-sm text-slate-300">
              I’m Daniel, a lifelong lifter and performance nerd. I blend evidence-based programming with real-world
              practicality so you can train hard, stay healthy, and look sharp year-round.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-white/10 p-3">
                <p className="text-slate-300">Specialties</p>
                <p className="mt-1 text-xs text-slate-400">Aesthetics • Strength • Recomp • Habit Systems</p>
              </div>
              <div className="rounded-xl border border-white/10 p-3">
                <p className="text-slate-300">Philosophy</p>
                <p className="mt-1 text-xs text-slate-400">Hard work, smart systems, sustainable progress.</p>
              </div>
            </div>
          </div>
        </div>
</section>

      {/* RESULTS */}
      <section id="results" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">Client Results</h2>
        <p className="mt-2 max-w-2xl text-slate-300">
          Real people, real progress. Strength up, waist down, confidence through the roof.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { name: "Amir", quote: "Added 170 lb to bench while body recomping, lost 10 lb of fat while gaining + 25 lb of muscle", stat: "-10 lb, +170 lb bench" },
            { name: "Jasmine", quote: "Finally built glutes without killing my knees.", stat: "+2" },
            { name: "Duncan", quote: "Busy schedule, lost 10 lb while getting abs and keeping strength", stat: "-10 lb" },
          ].map((t, i) => (
            <Card
              key={i}
              className="hover:-translate-y-1.5 hover:border-white/20 hover:bg-slate-900/80 hover:shadow-[0_20px_40px_-28px_rgba(56,189,248,0.45)]"
            >
              <CardHeader>
                <CardTitle className="text-lg">{t.name}</CardTitle>
                <p className="text-sm text-slate-300">{t.stat}</p>
              </CardHeader>
              <CardContent className="text-sm text-slate-300">“{t.quote}”</CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* GALLERY */}
      <section id="gallery" className="mx-auto max-w-6xl px-3 sm:px-4 py-12 sm:py-20">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-3xl font-bold md:text-4xl">Gallery</h2>
          <p className="mt-2 max-w-2xl text-slate-300">
            Aesthetic strength, clean lines, sustainable progress.
          </p>
        </div>
      
        {/* Top row: 3 cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {[
            { src: "/physique/pose-1.jpg", alt: "Front relaxed" },
            { src: "/physique/pose-2.jpg", alt: "Back Double Bicep" },
            { src: "/physique/pose-3.jpg", alt: "Front quarter turn" },
          ].map((img) => (
            <figure
              key={img.src}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent p-2 text-xs text-white/80">
                {img.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      
      {/* SCROLL SCRUB PHYSIQUE */}
      <ScrollScrubPhysique />

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">FAQ</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <FAQ
            q="How do I pick a program?"
            a="If you’re newer or returning, choose Foundations. If you’re experienced and want to push volume, go Elite. If fat-loss is priority while keeping strength, go Power-Cut."
          />
          <FAQ q="What equipment do I need?" a="Any commercial gym works. Each movement has substitutions for dumbbells, cables, or at-home setups." />
          <FAQ q="Is there nutrition included?" a="Yes. Each plan has high-protein templates, sample days, and a simple macro guide." />
          <FAQ q="Refund policy?" a="Digital programs are non-refundable once delivered, but I’ll support you in getting set up correctly." />
        </div>
      </section>

      {/* CONSULT */}
      <section id="consult" className="mx-auto max-w-3xl px-4 py-20">
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl md:p-10">
          <h2 className="text-3xl font-bold md:text-4xl">Book a Free Consultation</h2>
          <p className="mt-2 text-slate-300">
            15–20 minute call to map your goals and pick the right path. No pressure, just clarity.
          </p>

          <form onSubmit={submitForm} className="mt-6 grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm">Name</label>
                <Input
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Email</label>
                <Input
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm">Phone (optional)</label>
                <Input
                  placeholder="(xxx) xxx-xxxx"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Preferred time (optional)</label>
                <Input
                  placeholder="e.g., Weeknights after 6pm"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm">Your goals</label>
              <textarea
                rows={5}
                placeholder="Tell me what you want to achieve and any constraints (injuries, schedule)."
                className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-white placeholder-zinc-400 outline-none transition focus:border-white/40"
                value={form.goals}
                onChange={(e) => setForm({ ...form, goals: e.target.value })}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-sm text-slate-400">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> Reply via email</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> Quick call</div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> 15–20 minutes</div>
            </div>

            <div className="pt-2">
              <Button magnetic disabled={submitting} size="lg" className="w-full bg-blue-600">
                {submitting ? "Sending…" : "Request Consultation"}
              </Button>
            </div>

            <div className="pt-3">
              <AnchorButton magnetic href={CALENDLY} target="_blank" rel="noreferrer" variant="outline" className="w-full">
                Or schedule instantly on Calendly
              </AnchorButton>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Aesthetica Fitness Coaching. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">YouTube</a>
            <a href="#consult" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-cyan-900/20">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.55)] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </main>
  );
}

/*************************************************
 * SUPPORTING COMPONENTS
 *************************************************/
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-2 sm:p-4 text-center">
      <div className="text-lg sm:text-2xl font-bold">{value}</div>
      <div className="mt-1 text-xs text-slate-400">{label}</div>
    </div>
  );
}

function SellingPoint({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`${TRANSITION_CLASS} rounded-3xl border border-white/10 bg-slate-900/60 p-6 hover:border-white/20 hover:bg-slate-900/80 hover:shadow-[0_24px_48px_-28px_rgba(56,189,248,0.45)]`}
      initial={prefersReducedMotion ? undefined : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.3 }}
      variants={prefersReducedMotion ? undefined : fadeUpVariant}
      transition={{ duration: 0.55, ease: MOTION_EASE }}
      whileHover={prefersReducedMotion ? undefined : { y: -10, scale: 1.01 }}
      whileTap={prefersReducedMotion ? undefined : { y: -4 }}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-teal-400/20">
          <Icon className="h-5 w-5 text-teal-200" />
        </span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-slate-300">{children}</p>
    </motion.div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <p className="font-medium">{q}</p>
      <p className="mt-2 text-sm text-slate-300">{a}</p>
    </div>
  );
}

const ScrollScrubPhysique = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const calloutRefs = useRef<HTMLDivElement[]>([]);

  const callouts = [
    {
      title: "Body Fat",
      value: "8%",
      subtitle: "Stage-ready conditioning",
      position: "left-4 top-[18%] md:left-16 md:top-[24%]",
    },
    {
      title: "Lean Mass",
      value: "54%",
      subtitle: "Measured via DEXA",
      position: "right-4 top-[38%] md:right-16 md:top-[32%]",
    },
    {
      title: "PR Totals",
      value: "335 / 250 / 475",
      subtitle: "Squat · Bench · Deadlift",
      position: "left-1/2 bottom-10 -translate-x-1/2 md:left-auto md:right-16",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    gsap.registerPlugin(ScrollTrigger);

    let context: gsap.Context | undefined;

    const setupTimeline = () => {
      if (prefersReducedMotion || !sectionRef.current || !videoRef.current) return undefined;

      const videoEl = videoRef.current;
      videoEl.pause();
      videoEl.currentTime = 0;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top top",
            end: () => `+=${window.innerHeight * 3}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          videoEl,
          { currentTime: 0 },
          { currentTime: videoEl.duration || 1, duration: 1 }
        );

        calloutRefs.current.forEach((el, index) => {
          const enterAt = 0.18 + index * 0.22;
          tl.fromTo(
            el,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" },
            enterAt
          );
          tl.to(
            el,
            { autoAlpha: 0, y: -36, duration: 0.3, ease: "power2.in" },
            enterAt + 0.28
          );
        });
      }, sectionRef);

      ScrollTrigger.refresh();
      return ctx;
    };

    const handleLoaded = () => {
      context?.revert();
      context = setupTimeline();
    };

    if (video.readyState >= 1) {
      handleLoaded();
    } else {
      video.addEventListener("loadedmetadata", handleLoaded);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      context?.revert();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!prefersReducedMotion) return;
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-slate-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_480px_at_20%_20%,rgba(56,189,248,0.12),transparent_60%),radial-gradient(900px_480px_at_80%_80%,rgba(56,189,248,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-5xl px-3 sm:px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-300/80">
          ScrollScrub Physique
        </p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Scroll through the physique journey</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400 sm:text-base">
          Scrub the posing reel with your scroll wheel. Watch the physique come to life as key stats pulse into view.
        </p>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-4xl flex-col items-center px-3 sm:px-4">
        <div className="relative aspect-[9/16] w-full max-w-[540px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-black shadow-[0_40px_120px_-50px_rgba(34,211,238,0.45)]">
          <video
            ref={videoRef}
            src="/physique/website-video-1.mp4"
            playsInline
            muted
            preload="metadata"
            controls={prefersReducedMotion ?? false}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/10 to-slate-950/30" />
          {callouts.map((callout, idx) => (
            <div
              key={callout.title}
              ref={(el) => {
                if (el) calloutRefs.current[idx] = el;
              }}
              className={`pointer-events-none absolute w-[180px] rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-left backdrop-blur-md shadow-[0_24px_60px_-30px_rgba(56,189,248,0.55)] ${callout.position} ${prefersReducedMotion ? "opacity-100" : "opacity-0"}`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-teal-200/80">{callout.title}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{callout.value}</p>
              <p className="mt-1 text-xs text-slate-300">{callout.subtitle}</p>
            </div>
          ))}
        </div>
        {!prefersReducedMotion && (
          <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400/80">
            <span className="h-px w-8 bg-slate-600/60" />
            Scroll to scrub
            <span className="h-px w-8 bg-slate-600/60" />
          </p>
        )}
        {prefersReducedMotion && (
          <p className="mt-6 text-xs text-slate-400">
            Motion reduced — use the transport controls to explore the reel.
          </p>
        )}
      </div>
    </section>
  );
};
