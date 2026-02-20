import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Section reveal with circular mask expansion.
 * Creates a cinematic wipe/reveal between sections.
 */
export default function SectionReveal({ children, bgColor = '#050510', accentColor = '#c9a84c' }) {
    const containerRef = useRef(null)
    const maskRef = useRef(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(maskRef.current,
                {
                    clipPath: 'circle(0% at 50% 50%)',
                },
                {
                    clipPath: 'circle(100% at 50% 50%)',
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        end: 'top 20%',
                        scrub: 1,
                    },
                }
            )
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="relative">
            {/* Accent border before reveal */}
            <div
                className="absolute top-0 left-0 right-0 h-px z-10"
                style={{
                    background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
                }}
            />

            {/* Masked content */}
            <div
                ref={maskRef}
                style={{ backgroundColor: bgColor }}
            >
                {children}
            </div>
        </div>
    )
}
