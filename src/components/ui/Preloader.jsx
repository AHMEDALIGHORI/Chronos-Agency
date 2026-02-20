import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LOADING_DURATION = 3200

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState(0) // 0=loading, 1=reveal, 2=done
    const ringRef = useRef(null)

    useEffect(() => {
        const start = Date.now()
        const tick = () => {
            const elapsed = Date.now() - start
            const p = Math.min(elapsed / LOADING_DURATION, 1)
            // Ease-out curve for more dramatic end
            const eased = 1 - Math.pow(1 - p, 3)
            setProgress(eased)

            if (p < 1) {
                requestAnimationFrame(tick)
            } else {
                setPhase(1)
                setTimeout(() => {
                    setPhase(2)
                    setTimeout(() => onComplete?.(), 600)
                }, 800)
            }
        }
        requestAnimationFrame(tick)
    }, [onComplete])

    const circumference = 2 * Math.PI * 44

    return (
        <AnimatePresence>
            {phase < 2 && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030308]"
                    exit={{ 
                        clipPath: 'circle(0% at 50% 50%)',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Background noise */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="w-full h-full" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
                        }} />
                    </div>

                    {/* Radial glow */}
                    <motion.div
                        className="absolute w-[400px] h-[400px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
                        }}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <div className="relative flex flex-col items-center gap-8">
                        {/* Clock/Ring */}
                        <div className="relative w-28 h-28">
                            {/* Outer track */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50" cy="50" r="44"
                                    fill="none"
                                    stroke="rgba(201,168,76,0.1)"
                                    strokeWidth="1"
                                />
                                <circle
                                    ref={ringRef}
                                    cx="50" cy="50" r="44"
                                    fill="none"
                                    stroke="url(#goldGradient)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference * (1 - progress)}
                                    style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                                />
                                <defs>
                                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#c9a84c" />
                                        <stop offset="50%" stopColor="#f5d98a" />
                                        <stop offset="100%" stopColor="#c9a84c" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Center tick mark (clock hand) */}
                            <div
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ transform: `rotate(${progress * 360}deg)`, transition: 'transform 0.1s linear' }}
                            >
                                <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#c9a84c] to-[#c9a84c] origin-bottom" style={{ marginBottom: '20px' }} />
                            </div>

                            {/* Center dot */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-[#c9a84c]" style={{ boxShadow: '0 0 12px rgba(201,168,76,0.8)' }} />
                            </div>
                        </div>

                        {/* Brand text */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <div className="overflow-hidden">
                                <motion.h1
                                    className="text-4xl md:text-5xl font-black tracking-[0.2em] text-transparent bg-clip-text"
                                    style={{
                                        backgroundImage: 'linear-gradient(135deg, #c9a84c, #f5d98a, #c9a84c)',
                                    }}
                                    initial={{ y: 60 }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.4, duration: 1, ease: [0.76, 0, 0.24, 1] }}
                                >
                                    CHRONOS
                                </motion.h1>
                            </div>
                        </motion.div>

                        {/* Progress text */}
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="w-8 h-px bg-[#c9a84c]/30" />
                            <span className="text-[10px] tracking-[0.4em] text-[#c9a84c]/50 uppercase font-light tabular-nums">
                                {phase === 0
                                    ? `Initializing Timeline — ${Math.round(progress * 100)}%`
                                    : 'Temporal Lock Acquired'
                                }
                            </span>
                            <div className="w-8 h-px bg-[#c9a84c]/30" />
                        </motion.div>

                        {/* Loading bar */}
                        <div className="w-48 h-px bg-white/5 overflow-hidden rounded-full">
                            <motion.div
                                className="h-full rounded-full"
                                style={{
                                    width: `${progress * 100}%`,
                                    background: 'linear-gradient(90deg, #c9a84c, #f5d98a)',
                                    boxShadow: '0 0 8px rgba(201,168,76,0.5)',
                                    transition: 'width 0.1s ease-out',
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
