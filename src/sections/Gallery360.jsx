import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Carousel360 from '../components/ui/Carousel360'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery360() {
    const container = useRef(null)
    const headerRef = useRef(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(headerRef.current.children, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 80%',
                    end: 'top 40%',
                    scrub: 1,
                },
                y: 50,
                opacity: 0,
                stagger: 0.15,
            })
        }, container)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={container} className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0d0d24] to-[#050510]" />

            {/* Decorative dividers */}
            <div className="absolute top-0 left-0 right-0 section-divider" />
            <div className="absolute bottom-0 left-0 right-0 section-divider" />

            <div ref={headerRef} className="relative z-10 text-center mb-16 px-6">
                <span className="text-chronos-gold/60 text-xs tracking-[0.5em] uppercase font-sans">Chapter II</span>
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mt-4 mb-6">
                    Moments in <span className="text-gradient-gold">Time</span>
                </h2>
                <p className="text-lg text-white/40 max-w-xl mx-auto font-light">
                    Explore the defining moments of human history in an immersive 360° experience.
                </p>
            </div>

            <div className="relative z-10">
                <Carousel360 />
            </div>
        </section>
    )
}
