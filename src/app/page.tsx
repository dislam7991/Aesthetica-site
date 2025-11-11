"use client";

import React, { useState } from "react";
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

/*************************************************
 * SMALL, REUSABLE UI BITS (unstyled -> Tailwind only)
 *************************************************/
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: false;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
};
function Button({ variant = "solid", size = "md", className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
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

  return <button className={`${base} ${sizes} ${variants} ${className}`} {...props} />;
}

function AnchorButton({
  href,
  children,
  variant = "solid",
  size = "md",
  className = "",
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
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

  return (
    <a href={href} className={`${base} ${sizes} ${variants} ${className}`} {...rest}>
      {children}
    </a>
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
  return <div className={`rounded-2xl border border-white/10 bg-slate-900/60 ${className}`}>{children}</div>;
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
};
const ProgramCard = ({ icon: Icon, title, tagline, price, bullets, label, checkoutUrl }: ProgramCardProps) => (
  <Card className="group relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-xl">
    <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(1200px_500px_at_80%_-20%,rgba(59,130,246,.3),transparent_60%)]" />
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
      <AnchorButton href={checkoutUrl} target="_blank" rel="noreferrer" size="lg" className="w-full">
        Get Program <ArrowRight className="ml-2 h-4 w-4" />
      </AnchorButton>
    </CardFooter>
  </Card>
);

/*************************************************
 * PAGE
 *************************************************/
export default function AestheticaFitnessCoaching() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", goals: "", time: "" });
  const [submitting, setSubmitting] = useState(false);

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
<section className="relative">
  <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 sm:gap-10 px-3 sm:px-4 pb-12 sm:pb-20 pt-12 sm:pt-16 md:grid-cols-2 md:pb-28 md:pt-24">
    <div>
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
        <Button size="lg" className="bg-blue-600 w-full sm:w-auto" onClick={() => scrollToId("programs")}>
          Browse Programs
        </Button>
        <Button
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
    </div>

    <div className="relative mt-8 md:mt-0">
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
    </div>
  </div>

  {/* Enhanced selling points with mobile spacing */}
  <div className="mx-auto max-w-6xl px-3 sm:px-4">
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
      <SellingPoint icon={Dumbbell} title="Intelligent Training">
        Periodized plans that progress week-to-week without wrecking your joints.
      </SellingPoint>
      <SellingPoint icon={Flame} title="Nutrition That Works">
        Simple, high-protein frameworks for busy lifters. No starvation games.
      </SellingPoint>
      <SellingPoint icon={Sparkles} title="Accountability & Habits">
        Systems that keep you consistent when motivation dips.
      </SellingPoint>
    </div>
  </div>

  {/* Subtle hero background image */}
  <div aria-hidden className="absolute inset-0 -z-10">
    <Image
      src="physique/bg-hero.jpg"
      alt=""
      fill
      priority
      className="object-cover opacity-10 blur-[1px]"
    />
  </div>
</section>

      {/* FEATURED IMAGE (high visibility) */}
      <section className="mx-auto max-w-6xl px-3 sm:px-4 pt-6 sm:pt-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <Image
            src="physique/hero-wide.jpg"
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
      <section id="coaching" className="mx-auto max-w-6xl px-4 py-20 relative overflow-hidden">
  {/* Background image (very subtle) */}
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
    <Image
      src="physique/bg-coaching.jpg"
      alt=""
      fill
      className="object-cover opacity-10"
    />
    <div className="absolute inset-0 bg-slate-950/40" />
  </div>

  {/* Existing coaching content below */}
  <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
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
              <Button className="bg-blue-600" onClick={() => scrollToId("consult")}>
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
            <Card key={i}>
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
            { src: "physique/pose-1.jpg", alt: "Back double biceps" },
            { src: "physique/pose-2.jpg", alt: "Side chest" },
            { src: "physique/pose-3.jpg", alt: "Front relaxed" },
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
              <Button disabled={submitting} size="lg" className="w-full bg-blue-600">
                {submitting ? "Sending…" : "Request Consultation"}
              </Button>
            </div>

            <div className="pt-3">
              <AnchorButton href={CALENDLY} target="_blank" rel="noreferrer" variant="outline" className="w-full">
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
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-teal-400/20">
          <Icon className="h-5 w-5 text-teal-200" />
        </span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-slate-300">{children}</p>
    </div>
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
