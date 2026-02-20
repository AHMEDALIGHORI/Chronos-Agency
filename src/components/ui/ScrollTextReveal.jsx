import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Apple-style scroll-linked text reveal.
 * Each word fades from dim to bright as you scroll through the section.
 */
export default function ScrollTextReveal({ text, className = '' }) {
    const containerRef = useRef(null)
    const wordsRef = useRef([])

    useLayoutEffect(() => {
        const words = wordsRef.current.filter(Boolean)
        if (words.length === 0) return

        let ctx = gsap.context(() => {
            gsap.set(words, { opacity: 0.12 })

            gsap.to(words, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    end: 'bottom 40%',
                    scrub: 0.5,
                },
                opacity: 1,
                stagger: 0.06,
                ease: 'none',
            })
        }, containerRef)

        return () => ctx.revert()
    }, [text])

    const wordArray = text.split(' ')

    return (
        <p ref={containerRef} className={`leading-relaxed ${className}`}>
            {wordArray.map((word, i) => (
                <span
                    key={i}
                    ref={el => wordsRef.current[i] = el}
                    className="inline-block mr-[0.35em] transition-opacity"
                >
                    {word}
                </span>
            ))}
        </p>
    )
}
