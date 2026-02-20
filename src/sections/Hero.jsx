import React, { useRef, useLayoutEffect, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Split text into individually animated characters
function SplitChars({ text, className = '', charClass = '' }) {
    return (
        <span className={className} aria-label={text}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className={`split-char inline-block ${charClass}`}
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    )
}

export default function Hero() {
    const container = useRef(null)
    const [time, setTime] = useState(new Date())

    // Live clock
    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(id)
    }, [])

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

            // Staggered character reveal for "CHRONOS"
            tl.from('.hero-title .split-char', {
                y: 120,
                rotateX: -90,
                opacity: 0,
                duration: 1.4,
                stagger: 0.05,
                ease: 'power4.out',
                delay: 0.2,
            })
            // Subtitle line slides in
            .from('.hero-subtitle-line', {
                scaleX: 0,
                duration: 1,
                ease: 'power3.inOut',
            }, '-=0.8')
            .from('.hero-subtitle-text', {
                y: 30,
                opacity: 0,
                duration: 0.8,
            }, '-=0.5')
            // Tagline words fade in one by one
            .from('.hero-tagline-word', {
                opacity: 0,
                y: 20,
                duration: 0.3,
                stagger: 0.06,
            }, '-=0.4')
            // Metadata & CTA
            .from('.hero-meta', {
                opacity: 0,
                y: 15,
                duration: 0.5,
                stagger: 0.1,
            }, '-=0.3')
            // Corner decorations
            .from('.hero-corner', {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                stagger: 0.08,
            }, '-=0.5')
            // Scroll indicator
            .from('.hero-scroll', {
                opacity: 0,
                y: -20,
                duration: 0.6,
            }, '-=0.3')

            // Parallax on scroll — entire hero content moves up & fades
            gsap.to('.hero-content', {
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
                y: -150,
                opacity: 0,
                scale: 0.95,
            })

            // Background zoom on scroll
            gsap.to('.hero-bg-glow', {
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
                scale: 2,
                opacity: 0,
            })
        }, container)

        return () => ctx.revert()
    }, [])

    const taglineWords = "Every era has a story. Step through the portal and witness history unfold before your eyes.".split(' ')
    const timeStr = time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })

    return (
        <section ref={container} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0 cinematic-bg" />

            {/* Animated radial glows */}
            <div className="hero-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]">
                <div className="absolute inset-0 rounded-full bg-[#c9a84c]/[0.03] blur-3xl animate-pulse-slow" />
                <div className="absolute inset-16 rounded-full bg-[#a78bfa]/[0.02] blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: 'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
            }} />

            {/* Main content */}
            <div className="hero-content relative z-10 text-center px-6">
                {/* Top metadata bar */}
                <div className="hero-meta flex items-center justify-center gap-8 mb-12">
                    <span className="text-[10px] tracking-[0.4em] text-[#c9a84c]/40 uppercase">Est. 2026</span>
                    <div className="w-px h-3 bg-[#c9a84c]/20" />
                    <span className="text-[10px] tracking-[0.4em] text-[#c9a84c]/40 font-mono tabular-nums">{timeStr}</span>
                    <div className="w-px h-3 bg-[#c9a84c]/20" />
                    <span className="text-[10px] tracking-[0.4em] text-[#c9a84c]/40 uppercase">Beyond Time</span>
                </div>

                {/* Title with split character animation */}
                <h1 className="hero-title mb-6" style={{ perspective: '600px' }}>
                    <SplitChars
                        text="CHRONOS"
                        className="text-7xl md:text-9xl lg:text-[11rem] font-black tracking-[-0.02em] leading-none"
                        charClass="text-transparent bg-clip-text"
                    />
                    {/* Inline gradient applied via CSS */}
                    <style>{`
                        .hero-title .split-char {
                            background-image: linear-gradient(135deg, #c9a84c 0%, #f5d98a 40%, #c9a84c 60%, #a78bfa 100%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                            will-change: transform, opacity;
                        }
                    `}</style>
                </h1>

                {/* Subtitle with animated line */}
                <div className="flex items-center justify-center gap-6 mb-8">
                    <div className="hero-subtitle-line h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]/50 origin-left" />
                    <p className="hero-subtitle-text text-sm md:text-base tracking-[0.5em] font-light uppercase text-white/60">
                        The Time Travel Agency
                    </p>
                    <div className="hero-subtitle-line h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]/50 origin-right" />
                </div>

                {/* Tagline — word by word reveal */}
                <p className="max-w-lg mx-auto text-white/30 text-sm md:text-base font-serif italic leading-relaxed mb-12">
                    {taglineWords.map((word, i) => (
                        <span key={i} className="hero-tagline-word inline-block mr-[0.3em]">{word}</span>
                    ))}
                </p>

                {/* CTA */}
                <div className="hero-meta">
                    <button
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                        className="group relative px-10 py-4 text-[#c9a84c] text-sm tracking-[0.3em] uppercase font-medium border border-[#c9a84c]/30 bg-transparent overflow-hidden transition-all duration-500 hover:border-[#c9a84c]/60 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)]"
                        data-magnetic
                    >
                        <span className="relative z-10">Begin The Journey</span>
                        <div className="absolute inset-0 bg-[#c9a84c]/[0.05] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="hero-scroll absolute bottom-10 flex flex-col items-center gap-4">
                <div className="relative w-5 h-8 border border-[#c9a84c]/20 rounded-full">
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full bg-[#c9a84c]/60 animate-bounce" style={{ animationDuration: '2s' }} />
                </div>
                <span className="text-[9px] tracking-[0.4em] text-[#c9a84c]/30 uppercase">Scroll</span>
            </div>

            {/* Corner decorations */}
            <div className="hero-corner absolute top-6 left-6 w-12 h-12 border-l border-t border-[#c9a84c]/15" />
            <div className="hero-corner absolute top-6 right-6 w-12 h-12 border-r border-t border-[#c9a84c]/15" />
            <div className="hero-corner absolute bottom-6 left-6 w-12 h-12 border-l border-b border-[#c9a84c]/15" />
            <div className="hero-corner absolute bottom-6 right-6 w-12 h-12 border-r border-b border-[#c9a84c]/15" />
        </section>
    )
}
