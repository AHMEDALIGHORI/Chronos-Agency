import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TransitionBridge() {
    const container = useRef(null)
    const lineRef = useRef(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Animate the vertical gradient line
            gsap.from(lineRef.current, {
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 60%',
                    end: 'bottom 40%',
                    scrub: 1,
                },
                scaleY: 0,
                transformOrigin: 'top center',
            })

            // Text animations
            gsap.from('.transition-text', {
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 70%',
                    end: 'center center',
                    scrub: 1,
                },
                y: 80,
                opacity: 0,
                stagger: 0.3,
            })

            // Color shift overlay
            gsap.fromTo('.transition-overlay',
                { background: 'linear-gradient(180deg, rgba(201, 168, 76, 0.05) 0%, transparent 100%)' },
                {
                    scrollTrigger: {
                        trigger: container.current,
                        start: 'top 50%',
                        end: 'bottom 50%',
                        scrub: 1,
                    },
                    background: 'linear-gradient(180deg, transparent 0%, rgba(34, 211, 238, 0.05) 100%)',
                }
            )
        }, container)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={container} className="relative py-40 overflow-hidden">
            <div className="transition-overlay absolute inset-0" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Vertical Timeline Line */}
                <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
                    <div className="w-full h-full bg-gradient-to-b from-chronos-gold via-chronos-purple to-chronos-cyan" />
                </div>

                {/* Past marker */}
                <div className="transition-text relative mb-32">
                    <div className="w-4 h-4 rounded-full bg-chronos-gold glow-gold absolute left-1/2 -translate-x-1/2 -top-8" />
                    <span className="text-chronos-gold text-xs tracking-[0.5em] uppercase">The Past</span>
                    <h3 className="text-4xl md:text-5xl font-serif text-white/80 mt-4">
                        History shaped us
                    </h3>
                </div>

                {/* Center quote */}
                <div className="transition-text relative my-20">
                    <div className="w-6 h-6 rounded-full bg-chronos-purple glow-purple absolute left-1/2 -translate-x-1/2 -top-3 border-2 border-white/20" />
                    <p className="text-2xl md:text-3xl font-light text-white/60 italic font-serif">
                        "Time is the wisest counselor of all"
                    </p>
                    <span className="text-white/30 text-sm mt-2 block">— Pericles</span>
                </div>

                {/* Present marker */}
                <div className="transition-text relative mt-32">
                    <div className="w-4 h-4 rounded-full bg-chronos-cyan glow-cyan absolute left-1/2 -translate-x-1/2 -top-8" />
                    <span className="text-chronos-cyan text-xs tracking-[0.5em] uppercase">The Present</span>
                    <h3 className="text-4xl md:text-5xl font-serif text-white/80 mt-4">
                        The future awaits
                    </h3>
                </div>
            </div>
        </section>
    )
}
