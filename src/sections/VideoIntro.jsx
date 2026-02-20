import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollTextReveal from '../components/ui/ScrollTextReveal'

gsap.registerPlugin(ScrollTrigger)

const epochs = [
    { year: '10,000 BC', label: 'Dawn', color: '#c9a84c', opacity: 0.08 },
    { year: '3,000 BC', label: 'Monuments', color: '#f5d98a', opacity: 0.1 },
    { year: '500 AD', label: 'Discovery', color: '#d4a853', opacity: 0.08 },
    { year: '1500 AD', label: 'Renaissance', color: '#10b981', opacity: 0.06 },
    { year: '1880 AD', label: 'Machines', color: '#94a3b8', opacity: 0.08 },
    { year: 'NOW', label: 'Digital', color: '#22d3ee', opacity: 0.06 },
]

export default function VideoIntro() {
    const container = useRef(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Header entrance
            gsap.from('.vi-header > *', {
                scrollTrigger: {
                    trigger: '.vi-header',
                    start: 'top 80%',
                    end: 'top 40%',
                    scrub: 1,
                },
                y: 60,
                opacity: 0,
                stagger: 0.15,
            })

            // Timeline dots stagger
            gsap.from('.epoch-dot', {
                scrollTrigger: {
                    trigger: '.epoch-timeline',
                    start: 'top 75%',
                    end: 'top 35%',
                    scrub: 1,
                },
                scale: 0,
                opacity: 0,
                stagger: 0.08,
            })

            // Full-bleed image parallax
            gsap.utils.toArray('.vi-image-wrap').forEach((el) => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        end: 'top 30%',
                        scrub: 1,
                    },
                    scale: 0.85,
                    opacity: 0,
                })
                // Internal parallax
                const img = el.querySelector('img')
                if (img) {
                    gsap.to(img, {
                        scrollTrigger: {
                            trigger: el,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                        y: -60,
                    })
                }
            })
        }, container)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={container} className="relative py-40 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-[#0a1628] to-[#030308]" />

            {/* Section Header */}
            <div className="vi-header relative z-10 text-center mb-20 px-6">
                <span className="text-[#c9a84c]/40 text-[10px] tracking-[0.6em] uppercase">Chapter I</span>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mt-4 mb-8">
                    <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #c9a84c, #f5d98a, #c9a84c)' }}>
                        Through The Ages
                    </span>
                </h2>

                {/* Timeline dots */}
                <div className="epoch-timeline flex items-center justify-center gap-2 md:gap-6 mb-8">
                    {epochs.map((e, i) => (
                        <div key={i} className="epoch-dot flex flex-col items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color, boxShadow: `0 0 8px ${e.color}40` }} />
                            <span className="text-[9px] tracking-[0.2em] uppercase hidden md:block" style={{ color: e.color + '90' }}>{e.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Apple-style scroll text reveal */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 mb-32">
                <ScrollTextReveal
                    text="Humanity has always been a species in motion. From the first sparks of consciousness in prehistoric caves to the blinding glow of digital screens, our story is one of relentless forward motion — a journey through time itself."
                    className="text-2xl md:text-4xl lg:text-5xl font-serif leading-snug text-white/90 text-center"
                />
            </div>

            {/* Staggered Full-Bleed Images with Overlaid Text */}
            <div className="relative z-10 space-y-40 max-w-7xl mx-auto">
                {/* Image 1 — Full Width */}
                <div className="vi-image-wrap relative overflow-hidden rounded-xl mx-6">
                    <img
                        src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1400&h=700&fit=crop"
                        alt="Ancient civilizations"
                        className="w-full h-[50vh] md:h-[70vh] object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                        <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-mono">3,000 BC — Egypt</span>
                        <h3 className="text-3xl md:text-5xl font-serif text-white font-bold mt-2">When Gods Built Mountains</h3>
                    </div>
                    {/* Decorative number */}
                    <span className="absolute top-6 right-8 text-7xl md:text-9xl font-black text-white/[0.03] leading-none">01</span>
                </div>

                {/* Image pair — side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-6">
                    <div className="vi-image-wrap relative overflow-hidden rounded-xl">
                        <img
                            src="https://images.unsplash.com/photo-1548013146-72479768bada?w=700&h=900&fit=crop"
                            alt="Taj Mahal"
                            className="w-full h-[50vh] object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <span className="text-[#f5d98a] text-xs tracking-[0.3em] uppercase font-mono">1653 AD</span>
                            <h3 className="text-2xl font-serif text-white font-bold mt-1">Love in Marble</h3>
                        </div>
                    </div>
                    <div className="vi-image-wrap relative overflow-hidden rounded-xl">
                        <img
                            src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=700&h=900&fit=crop"
                            alt="Renaissance"
                            className="w-full h-[50vh] object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <span className="text-[#10b981] text-xs tracking-[0.3em] uppercase font-mono">1500 AD</span>
                            <h3 className="text-2xl font-serif text-white font-bold mt-1">Nature Persists</h3>
                        </div>
                    </div>
                </div>

                {/* Second full text reveal */}
                <div className="max-w-3xl mx-auto px-6">
                    <ScrollTextReveal
                        text="Each moment in time is a doorway. The question was never whether we could open them — but whether we had the courage to step through."
                        className="text-xl md:text-3xl font-serif leading-relaxed text-white/80 text-center"
                    />
                </div>

                {/* Image 3 — Wide cinematic */}
                <div className="vi-image-wrap relative overflow-hidden rounded-xl mx-6">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=600&fit=crop"
                        alt="Digital age"
                        className="w-full h-[40vh] md:h-[60vh] object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <span className="text-[#22d3ee] text-xs tracking-[0.5em] uppercase font-mono">Present Day</span>
                            <h3 className="text-4xl md:text-6xl font-serif text-white font-bold mt-3">The Infinite Now</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
