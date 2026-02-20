import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollTextReveal from '../components/ui/ScrollTextReveal'

gsap.registerPlugin(ScrollTrigger)

export default function Era2() {
    const container = useRef(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Horizontal line draw
            gsap.from('.era2-line', {
                scrollTrigger: { trigger: '.era2-line', start: 'top 80%', end: 'top 50%', scrub: 1 },
                scaleX: 0,
                transformOrigin: 'left center',
            })

            // Image pair stagger
            gsap.from('.era2-img', {
                scrollTrigger: { trigger: '.era2-images', start: 'top 80%', end: 'top 40%', scrub: 1 },
                y: 80, opacity: 0, stagger: 0.15,
            })

            // Machinery data cards
            gsap.from('.era2-data', {
                scrollTrigger: { trigger: '.era2-data-grid', start: 'top 80%', end: 'top 50%', scrub: 1 },
                x: -30, opacity: 0, stagger: 0.1,
            })

            // Background mechanical rotate
            gsap.to('.era2-gear', {
                scrollTrigger: { trigger: container.current, start: 'top bottom', end: 'bottom top', scrub: true },
                rotation: 180,
            })
        }, container)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={container} className="relative min-h-[200vh] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-[#0c0c14] to-[#030308]" />

            {/* Decorative mechanical gear */}
            <div className="era2-gear absolute top-[20%] right-[-5%] w-[300px] h-[300px] border border-white/[0.03] rounded-full pointer-events-none" />
            <div className="era2-gear absolute bottom-[15%] left-[-3%] w-[200px] h-[200px] border border-white/[0.03] rounded-full pointer-events-none" />

            <div className="relative z-10 pt-40 pb-32">
                {/* Section label */}
                <div className="text-center mb-6">
                    <span className="text-white/20 text-[10px] tracking-[0.7em] uppercase font-mono">Chapter IV</span>
                </div>

                {/* Main heading — monospace industrial */}
                <div className="text-center mb-6 px-6">
                    <h2 className="text-[clamp(3rem,10vw,9rem)] font-mono font-bold leading-[0.85] tracking-tighter">
                        <span className="text-white/80">Industrial</span><br />
                        <span className="text-white/20">Revolution</span>
                    </h2>
                </div>

                {/* Divider line */}
                <div className="era2-line w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16" />

                {/* Scroll text reveal */}
                <div className="max-w-3xl mx-auto px-6 mb-28">
                    <ScrollTextReveal
                        text="Steam, gears, and the birth of the machine. The world convulsed as iron and coal rewrote the rules of civilization. Nothing would ever be the same — time itself began to accelerate."
                        className="text-xl md:text-3xl font-mono leading-relaxed text-white/70 text-center"
                    />
                </div>

                {/* Asymmetric image layout */}
                <div className="era2-images grid grid-cols-12 gap-4 mx-6 lg:mx-16 mb-24">
                    {/* Large image */}
                    <div className="era2-img col-span-12 md:col-span-7 relative overflow-hidden rounded-sm">
                        <img
                            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&h=600&fit=crop"
                            alt="Industrial machinery"
                            className="w-full h-[40vh] md:h-[60vh] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <span className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-mono">London — 1880 AD</span>
                            <h3 className="text-2xl md:text-4xl font-mono text-white/80 font-bold mt-1">Forged in Fire</h3>
                        </div>
                    </div>
                    {/* Small stacked images */}
                    <div className="era2-img col-span-12 md:col-span-5 flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-sm flex-1">
                            <img
                                src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&h=400&fit=crop"
                                alt="Gears"
                                className="w-full h-full min-h-[20vh] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/30" />
                        </div>
                        <div className="relative overflow-hidden rounded-sm flex-1">
                            <img
                                src="https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=600&h=400&fit=crop"
                                alt="Steam engine"
                                className="w-full h-full min-h-[20vh] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/30" />
                        </div>
                    </div>
                </div>

                {/* Data cards */}
                <div className="era2-data-grid max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { value: '1880', label: 'Target Year' },
                        { value: 'LONDON', label: 'Coordinates' },
                        { value: '340HP', label: 'Engine Power' },
                        { value: 'HIGH', label: 'Danger Level' },
                    ].map((d, i) => (
                        <div key={i} className="era2-data p-4 border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm text-center" style={{ transform: i % 2 === 0 ? 'skewX(-2deg)' : 'skewX(2deg)' }}>
                            <span className="block text-2xl font-mono text-white/60" style={{ transform: i % 2 === 0 ? 'skewX(2deg)' : 'skewX(-2deg)' }}>{d.value}</span>
                            <span className="text-[9px] text-white/25 uppercase tracking-[0.3em]" style={{ transform: i % 2 === 0 ? 'skewX(2deg)' : 'skewX(-2deg)', display: 'block' }}>{d.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
