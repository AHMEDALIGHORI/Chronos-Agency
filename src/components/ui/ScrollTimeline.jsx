import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const eras = [
    { id: 'hero', label: 'Origin', color: '#c9a84c' },
    { id: 'story', label: 'Stories', color: '#f5d98a' },
    { id: 'gallery', label: 'Gallery', color: '#d4a853' },
    { id: 'ancient', label: 'Ancient', color: '#c9a84c' },
    { id: 'industrial', label: 'Industrial', color: '#94a3b8' },
    { id: 'bridge', label: 'Bridge', color: '#a78bfa' },
    { id: 'present', label: 'Present', color: '#22d3ee' },
]

export default function ScrollTimeline() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const docHeight = document.body.scrollHeight - window.innerHeight
            const p = docHeight > 0 ? scrollY / docHeight : 0
            setProgress(p)

            // Show after first viewport
            setIsVisible(scrollY > window.innerHeight * 0.5)

            // Determine active section
            const idx = Math.min(Math.floor(p * eras.length), eras.length - 1)
            setActiveIndex(Math.max(0, idx))
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (index) => {
        const docHeight = document.body.scrollHeight - window.innerHeight
        const target = (index / eras.length) * docHeight
        window.scrollTo({ top: target, behavior: 'smooth' })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}
                    className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end gap-1 pointer-events-auto"
                >
                    {/* Timeline track */}
                    <div className="absolute right-[5px] top-0 bottom-0 w-px bg-white/5">
                        <motion.div
                            className="w-full origin-top"
                            style={{
                                background: `linear-gradient(180deg, ${eras[0].color}, ${eras[eras.length - 1].color})`,
                                height: `${progress * 100}%`,
                                transition: 'height 0.15s linear',
                            }}
                        />
                    </div>

                    {eras.map((era, i) => (
                        <button
                            key={era.id}
                            onClick={() => scrollToSection(i)}
                            className="relative flex items-center gap-3 py-2 group"
                        >
                            {/* Label — appears on hover or active */}
                            <span
                                className={`text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                                    i === activeIndex
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
                                }`}
                                style={{ color: era.color }}
                            >
                                {era.label}
                            </span>

                            {/* Dot */}
                            <div className="relative z-10">
                                <div
                                    className={`rounded-full transition-all duration-300 ${
                                        i === activeIndex ? 'w-3 h-3' : 'w-[6px] h-[6px] group-hover:w-2 group-hover:h-2'
                                    }`}
                                    style={{
                                        backgroundColor: i === activeIndex ? era.color : 'rgba(255,255,255,0.15)',
                                        boxShadow: i === activeIndex ? `0 0 12px ${era.color}60` : 'none',
                                    }}
                                />
                            </div>
                        </button>
                    ))}
                </motion.nav>
            )}
        </AnimatePresence>
    )
}
