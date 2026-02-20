import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollTextReveal from '../components/ui/ScrollTextReveal'

gsap.registerPlugin(ScrollTrigger)

const features = [
    { icon: '◈', title: 'Time Navigation', desc: 'Quantum-calibrated temporal engines allow precise jumps across any timeline with zero drift.', color: '#22d3ee', glow: 'rgba(34,211,238,0.08)' },
    { icon: '◇', title: 'Reality Shield', desc: 'Advanced paradox prevention ensures your journey never disrupts the fabric of spacetime.', color: '#a78bfa', glow: 'rgba(167,139,250,0.08)' },
    { icon: '✦', title: 'Memory Archive', desc: 'Every moment witnessed is preserved in crystalline memory banks for eternal recall.', color: '#fb7185', glow: 'rgba(251,113,133,0.08)' },
]

export default function Era3() {
    const container = useRef(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Orbs float
            gsap.to('.era3-orb1', { scrollTrigger: { trigger: container.current, start: 'top bottom', end: 'bottom top', scrub: true }, y: -200, x: 50 })
            gsap.to('.era3-orb2', { scrollTrigger: { trigger: container.current, start: 'top bottom', end: 'bottom top', scrub: true }, y: -150, x: -30 })

            // Feature cards stagger
            gsap.from('.era3-feature', {
                scrollTrigger: { trigger: '.era3-grid', start: 'top 80%', end: 'top 40%', scrub: 1 },
                y: 60, opacity: 0, stagger: 0.12,
            })

            // CTA scale
            gsap.from('.era3-cta', {
                scrollTrigger: { trigger: '.era3-cta', start: 'top 85%', end: 'top 55%', scrub: 1 },
                scale: 0.8, opacity: 0,
            })
        }, container)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={container} className="relative min-h-[200vh] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-[#05101a] to-[#030308]" />

            {/* Animated glowing orbs */}
            <div className="era3-orb1 absolute top-[10%] left-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)' }} />
            <div className="era3-orb2 absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)' }} />

            <div className="relative z-10 pt-40 pb-32">
                {/* Section label */}
                <div className="text-center mb-6">
                    <span className="text-[#22d3ee]/30 text-[10px] tracking-[0.7em] uppercase font-mono">Chapter V</span>
                </div>

                {/* Massive gradient heading */}
                <div className="text-center mb-6 px-6">
                    <h2 className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-tight">
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 40%, #fb7185 100%)' }}>
                            The Present
                        </span>
                    </h2>
                </div>

                {/* Thin divider */}
                <div className="w-full max-w-3xl mx-auto h-px mb-16" style={{ background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.2), rgba(167,139,250,0.2), rgba(251,113,133,0.2), transparent)' }} />

                {/* Apple-style scroll reveal */}
                <div className="max-w-3xl mx-auto px-6 mb-32">
                    <ScrollTextReveal
                        text="We stand at the convergence of all timelines. The digital frontier stretches infinitely before us. Every algorithm is a spell, every dataset a prophecy, every connection a bridge across the impossible."
                        className="text-xl md:text-3xl font-serif leading-relaxed text-white/80 text-center"
                    />
                </div>

                {/* Feature Grid */}
                <div className="era3-grid max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="era3-feature group relative p-8 rounded-2xl border border-white/[0.06] backdrop-blur-sm transition-all duration-700 hover:border-opacity-40"
                            style={{ backgroundColor: f.glow, '--hover-color': f.color + '40' }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = f.color + '40'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                        >
                            {/* Glow on hover */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${f.color}08, transparent 70%)` }} />

                            <div className="relative z-10">
                                <span className="text-3xl mb-6 block" style={{ color: f.color }}>{f.icon}</span>
                                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="era3-cta text-center">
                    <div className="inline-flex flex-col items-center gap-4">
                        <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee, #a78bfa)' }}>
                            2026 AD
                        </span>
                        <span className="text-white/25 text-sm tracking-[0.4em] uppercase">Your Timeline Starts Now</span>
                        <div className="mt-6 w-px h-16" style={{ background: 'linear-gradient(to bottom, rgba(34,211,238,0.3), transparent)' }} />
                    </div>
                </div>
            </div>
        </section>
    )
}
