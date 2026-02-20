import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollTextReveal from '../components/ui/ScrollTextReveal'

gsap.registerPlugin(ScrollTrigger)

export default function Era1() {
    const container = useRef(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Deep parallax layers
            gsap.to('.era1-bg-deep', {
                scrollTrigger: { trigger: container.current, start: 'top bottom', end: 'bottom top', scrub: true },
                y: -180,
            })
            gsap.to('.era1-bg-mid', {
                scrollTrigger: { trigger: container.current, start: 'top bottom', end: 'bottom top', scrub: true },
                y: -80,
            })

            // Stats reveal
            gsap.from('.era1-stat', {
                scrollTrigger: { trigger: '.era1-stats', start: 'top 80%', end: 'top 50%', scrub: 1 },
                y: 40, opacity: 0, stagger: 0.1,
            })

            // Image clip reveal
            gsap.from('.era1-hero-img', {
                scrollTrigger: { trigger: '.era1-hero-img', start: 'top 80%', end: 'top 40%', scrub: 1 },
                clipPath: 'inset(100% 0% 0% 0%)',
            })

            // Floating artifacts
            gsap.to('.era1-artifact', {
                scrollTrigger: { trigger: container.current, start: 'top bottom', end: 'bottom top', scrub: true },
                y: -120, rotation: 15,
            })
        }, container)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={container} className="relative min-h-[200vh] w-full overflow-hidden">
            {/* Multi-layer parallax background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-[#12100a] to-[#030308]" />
            <div className="era1-bg-deep absolute inset-0 opacity-[0.07]">
                <img src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1920&h=1080&fit=crop" alt="" className="w-full h-[140%] object-cover" loading="lazy" />
            </div>
            <div className="era1-bg-mid absolute inset-0 opacity-[0.04]">
                <img src="https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&h=1080&fit=crop" alt="" className="w-full h-[130%] object-cover mix-blend-screen" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-transparent to-[#030308]" />

            {/* Decorative floating artifacts */}
            <div className="era1-artifact absolute top-[15%] right-[8%] w-20 h-20 border border-[#c9a84c]/10 rotate-45 pointer-events-none" />
            <div className="era1-artifact absolute top-[45%] left-[5%] w-12 h-12 border border-[#c9a84c]/10 rotate-[30deg] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 pt-40 pb-32">
                {/* Section label */}
                <div className="text-center mb-6">
                    <span className="text-[#c9a84c]/30 text-[10px] tracking-[0.7em] uppercase font-mono">Chapter III</span>
                </div>

                {/* Main heading — massive, editorial */}
                <div className="text-center mb-12 px-6">
                    <h2 className="text-[clamp(3rem,10vw,9rem)] font-serif font-bold leading-[0.9] tracking-tight">
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #c9a84c 0%, #f5d98a 50%, #c9a84c 100%)' }}>
                            Ancient
                        </span>
                        <br />
                        <span className="text-white/10">Era</span>
                    </h2>
                </div>

                {/* Scroll text reveal */}
                <div className="max-w-3xl mx-auto px-6 mb-24">
                    <ScrollTextReveal
                        text="Where time began. The shifting sands conceal secrets of civilizations that dared to build monuments reaching toward eternity. These stones remember what humanity has forgotten."
                        className="text-xl md:text-3xl font-serif leading-relaxed text-white/80 text-center"
                    />
                </div>

                {/* Full-bleed hero image with clip reveal */}
                <div className="era1-hero-img relative mx-6 lg:mx-16 mb-24 overflow-hidden rounded-lg" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
                    <img
                        src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1400&h=700&fit=crop"
                        alt="Ancient Pyramids"
                        className="w-full h-[50vh] md:h-[70vh] object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12100a] via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
                        <span className="text-[#c9a84c] text-[10px] tracking-[0.4em] uppercase font-mono">Giza Plateau — 3,000 BC</span>
                        <h3 className="text-3xl md:text-5xl font-serif text-white font-bold mt-2">The Great Builders</h3>
                    </div>
                    <span className="absolute top-6 right-8 text-8xl md:text-[10rem] font-black text-white/[0.02] leading-none select-none">III</span>
                </div>

                {/* Stats row */}
                <div className="era1-stats max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { value: '3000 BC', label: 'Target Date' },
                        { value: 'GIZA', label: 'Coordinates' },
                        { value: '146m', label: 'Pyramid Height' },
                        { value: 'MODERATE', label: 'Danger Level' },
                    ].map((s, i) => (
                        <div key={i} className="era1-stat text-center p-4 border border-[#c9a84c]/10 rounded-lg bg-[#c9a84c]/[0.02]">
                            <span className="block text-2xl md:text-3xl font-serif text-[#c9a84c]">{s.value}</span>
                            <span className="text-[9px] text-white/30 uppercase tracking-[0.3em]">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
