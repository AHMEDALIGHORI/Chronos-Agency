import React, { useRef, useLayoutEffect, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ───── Magnetic link ───── */
function MagneticLink({ children, href = '#', className = '' }) {
    const ref = useRef(null)

    const handleMove = useCallback((e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' })
    }, [])

    const handleLeave = useCallback(() => {
        gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }, [])

    return (
        <a
            ref={ref}
            href={href}
            className={`inline-block transition-colors duration-300 ${className}`}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            data-magnetic
        >
            {children}
        </a>
    )
}

/* ───── Animated counter ───── */
function AnimatedNumber({ value, suffix = '' }) {
    const ref = useRef(null)
    const [displayed, setDisplayed] = useState(0)

    useLayoutEffect(() => {
        const el = ref.current
        if (!el) return
        let obj = { v: 0 }
        gsap.to(obj, {
            v: value,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => setDisplayed(Math.round(obj.v)),
        })
    }, [value])

    return <span ref={ref}>{displayed.toLocaleString()}{suffix}</span>
}

/* ───── Social icon SVGs ───── */
const socials = [
    {
        name: 'Twitter / X',
        href: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L19.5 4H18l-5 6.2L9 4H4z" />
            </svg>
        ),
    },
    {
        name: 'GitHub',
        href: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        href: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M8 11v5M8 8v.01M12 16v-5c0-1 .6-2 2-2s2 1 2 2v5" />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: '#',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
]

const navCols = [
    {
        title: 'Navigate',
        links: ['Origin', 'Stories', 'Gallery', 'Ancient Era', 'Industrial', 'The Present'],
    },
    {
        title: 'Company',
        links: ['About', 'Careers', 'Press', 'Contact', 'Partners'],
    },
    {
        title: 'Legal',
        links: ['Privacy', 'Terms', 'Cookies', 'Licenses'],
    },
]

export default function Footer() {
    const container = useRef(null)
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    // Live clock
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(id)
    }, [])

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Stagger columns
            gsap.from('.footer-col', {
                scrollTrigger: { trigger: container.current, start: 'top 85%', end: 'top 50%', scrub: 1 },
                y: 50, opacity: 0, stagger: 0.08,
            })
            // Stats
            gsap.from('.footer-stat', {
                scrollTrigger: { trigger: '.footer-stats', start: 'top 90%', end: 'top 60%', scrub: 1 },
                y: 30, opacity: 0, stagger: 0.1,
            })
            // Bottom bar
            gsap.from('.footer-bottom > *', {
                scrollTrigger: { trigger: '.footer-bottom', start: 'top 95%', end: 'top 75%', scrub: 1 },
                y: 20, opacity: 0, stagger: 0.06,
            })
            // CTA line draw
            gsap.from('.footer-cta-line', {
                scrollTrigger: { trigger: '.footer-cta', start: 'top 85%', end: 'top 55%', scrub: 1 },
                scaleX: 0, transformOrigin: 'center',
            })
        }, container)
        return () => ctx.revert()
    }, [])

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email.includes('@')) setSubscribed(true)
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const formatTime = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    const formatDate = (d) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

    return (
        <footer ref={container} className="relative overflow-hidden">
            {/* Top divider — animated shimmer */}
            <div className="relative h-px w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
                <div className="absolute inset-0 shimmer" />
            </div>

            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-[#060b18] to-[#020205]" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.02) 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.015) 0%, transparent 70%)' }} />

            <div className="relative z-10">
                {/* ── CTA Section ── */}
                <div className="footer-cta py-24 text-center px-6">
                    <p className="text-[10px] tracking-[0.6em] uppercase text-[#c9a84c]/30 mb-4">Ready to begin?</p>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[0.95] mb-8">
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #c9a84c, #f5d98a, #c9a84c)' }}>
                            Your Journey
                        </span>
                        <br />
                        <span className="text-white/10">Awaits</span>
                    </h2>
                    <div className="footer-cta-line w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent mb-10" />

                    {/* Newsletter */}
                    {!subscribed ? (
                        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-0 group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 bg-white/[0.03] border border-white/[0.08] border-r-0 rounded-l-full px-6 py-4 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#c9a84c]/30 transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-gradient-to-r from-[#c9a84c] to-[#f5d98a] text-[#030308] font-semibold text-sm tracking-wider uppercase rounded-r-full hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-shadow duration-500"
                            >
                                Join
                            </button>
                        </form>
                    ) : (
                        <div className="max-w-md mx-auto text-center">
                            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/[0.04]">
                                <span className="text-[#c9a84c] text-lg">✓</span>
                                <span className="text-white/60 text-sm">Welcome to Chronos. Check your timeline.</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Stats Banner ── */}
                <div className="footer-stats border-y border-white/[0.04] py-12 px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: 5000, suffix: '+', label: 'Years Explored' },
                            { value: 12, suffix: '', label: 'Timelines Active' },
                            { value: 847, suffix: 'K', label: 'Moments Captured' },
                            { value: 99.9, suffix: '%', label: 'Paradox-Free' },
                        ].map((s, i) => (
                            <div key={i} className="footer-stat text-center">
                                <span className="block text-3xl md:text-4xl font-serif text-[#c9a84c]">
                                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                                </span>
                                <span className="text-[9px] text-white/25 uppercase tracking-[0.3em] mt-1 block">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Main Footer Grid ── */}
                <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Brand Column */}
                    <div className="footer-col md:col-span-4 space-y-6">
                        {/* Animated logo mark */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-10 h-10">
                                <svg viewBox="0 0 40 40" className="w-10 h-10 animate-spin-slow">
                                    <circle cx="20" cy="20" r="18" fill="none" stroke="url(#footerGrad)" strokeWidth="1" strokeDasharray="4 4" />
                                    <defs>
                                        <linearGradient id="footerGrad" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stopColor="#c9a84c" />
                                            <stop offset="100%" stopColor="#f5d98a" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-[#c9a84c]" style={{ boxShadow: '0 0 10px rgba(201,168,76,0.5)' }} />
                                </div>
                            </div>
                            <span className="text-2xl font-serif font-bold tracking-wider text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #c9a84c, #f5d98a)' }}>
                                CHRONOS
                            </span>
                        </div>

                        <p className="text-white/30 text-sm leading-relaxed max-w-sm">
                            Navigating the corridors of time since the dawn of consciousness. We don't just observe history — we architect the future.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3 pt-2">
                            {socials.map((s) => (
                                <MagneticLink
                                    key={s.name}
                                    href={s.href}
                                    className="w-10 h-10 rounded-full border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-[#c9a84c] hover:border-[#c9a84c]/30 hover:bg-[#c9a84c]/[0.04] transition-all duration-500"
                                >
                                    {s.icon}
                                </MagneticLink>
                            ))}
                        </div>
                    </div>

                    {/* Nav Columns */}
                    {navCols.map((col, ci) => (
                        <div key={ci} className={`footer-col ${ci === 0 ? 'md:col-span-3' : 'md:col-span-2'} space-y-4`}>
                            <h4 className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/40 mb-2">{col.title}</h4>
                            <ul className="space-y-2">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <MagneticLink href="#" className="text-sm text-white/25 hover:text-white/70 transition-colors duration-300 leading-relaxed">
                                            {link}
                                        </MagneticLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Clock Column */}
                    <div className="footer-col md:col-span-1 hidden lg:flex flex-col items-end justify-start">
                        <div className="text-right space-y-3">
                            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]/30">Local</p>
                            <p className="font-mono text-lg text-white/50 tabular-nums">{formatTime(time)}</p>
                            <p className="text-[10px] text-white/15 tracking-wider">{formatDate(time)}</p>
                        </div>
                    </div>
                </div>

                {/* ── Bottom Bar ── */}
                <div className="footer-bottom border-t border-white/[0.04] px-6 py-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white/15 text-[11px] tracking-wider">
                            &copy; {new Date().getFullYear()} Chronos Agency — All Timelines Reserved
                        </p>

                        <div className="flex items-center gap-6">
                            {/* Status indicator */}
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] text-white/20 tracking-wider">ALL SYSTEMS NOMINAL</span>
                            </div>

                            <div className="w-px h-3 bg-white/[0.06]" />

                            {/* Back to top */}
                            <button
                                onClick={scrollToTop}
                                className="group flex items-center gap-2 text-[10px] text-white/20 hover:text-[#c9a84c]/60 tracking-wider uppercase transition-colors duration-300"
                                data-magnetic
                            >
                                <span>Back to Origin</span>
                                <svg className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-1" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M6 10V2M3 5l3-3 3 3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
