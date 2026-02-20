import React, { useEffect, useRef, useState, useCallback } from 'react'
import clsx from 'clsx'

/**
 * Magnetic cursor with particle trail — Apple-level polish.
 * Outer ring responds magnetically to interactive elements.
 * Inner dot follows precisely. Trail particles spawn on movement.
 */
export default function MagneticCursor() {
    const outerRef = useRef(null)
    const innerRef = useRef(null)
    const trailCanvasRef = useRef(null)
    const mouse = useRef({ x: 0, y: 0 })
    const outerPos = useRef({ x: 0, y: 0 })
    const innerPos = useRef({ x: 0, y: 0 })
    const particles = useRef([])
    const [isHovering, setIsHovering] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    const frameRef = useRef(null)
    const lastSpawn = useRef(0)

    const spawnParticle = useCallback((x, y) => {
        particles.current.push({
            x, y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            life: 1,
            decay: 0.02 + Math.random() * 0.02,
            size: 1.5 + Math.random() * 2,
        })
        // Limit particles
        if (particles.current.length > 50) particles.current.shift()
    }, [])

    useEffect(() => {
        const handleMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY }
            // Spawn trail on move
            const now = Date.now()
            if (now - lastSpawn.current > 30) {
                spawnParticle(e.clientX, e.clientY)
                lastSpawn.current = now
            }
        }

        const handleOver = (e) => {
            const el = e.target.closest('button, a, [data-magnetic]')
            setIsHovering(!!el)
        }

        const handleDown = () => setIsPressed(true)
        const handleUp = () => setIsPressed(false)

        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mouseover', handleOver)
        window.addEventListener('mousedown', handleDown)
        window.addEventListener('mouseup', handleUp)

        return () => {
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('mouseover', handleOver)
            window.removeEventListener('mousedown', handleDown)
            window.removeEventListener('mouseup', handleUp)
        }
    }, [spawnParticle])

    // Animation loop
    useEffect(() => {
        const canvas = trailCanvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const lerp = (a, b, t) => a + (b - a) * t

        const animate = () => {
            // Smooth follow — outer ring lags behind
            outerPos.current.x = lerp(outerPos.current.x, mouse.current.x, 0.12)
            outerPos.current.y = lerp(outerPos.current.y, mouse.current.y, 0.12)
            innerPos.current.x = lerp(innerPos.current.x, mouse.current.x, 0.25)
            innerPos.current.y = lerp(innerPos.current.y, mouse.current.y, 0.25)

            if (outerRef.current) {
                outerRef.current.style.transform = `translate(${outerPos.current.x - 20}px, ${outerPos.current.y - 20}px)`
            }
            if (innerRef.current) {
                innerRef.current.style.transform = `translate(${innerPos.current.x - 4}px, ${innerPos.current.y - 4}px)`
            }

            // Draw trail particles
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.current = particles.current.filter(p => p.life > 0)
            particles.current.forEach(p => {
                p.x += p.vx
                p.y += p.vy
                p.life -= p.decay

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(201, 168, 76, ${p.life * 0.4})`
                ctx.fill()
            })

            frameRef.current = requestAnimationFrame(animate)
        }

        frameRef.current = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(frameRef.current)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <>
            {/* Trail canvas */}
            <canvas
                ref={trailCanvasRef}
                className="fixed inset-0 pointer-events-none z-[198]"
                style={{ mixBlendMode: 'screen' }}
            />

            {/* Outer ring */}
            <div
                ref={outerRef}
                className={clsx(
                    'fixed top-0 left-0 pointer-events-none z-[200] rounded-full border transition-all duration-300',
                    isHovering
                        ? 'w-16 h-16 border-[#c9a84c]/60 bg-[#c9a84c]/10 -ml-3 -mt-3'
                        : 'w-10 h-10 border-[#c9a84c]/30 bg-transparent',
                    isPressed && 'scale-75'
                )}
                style={{ willChange: 'transform' }}
            />

            {/* Inner dot */}
            <div
                ref={innerRef}
                className={clsx(
                    'fixed top-0 left-0 pointer-events-none z-[201] rounded-full transition-all duration-200',
                    isHovering
                        ? 'w-2 h-2 bg-[#c9a84c]'
                        : 'w-2 h-2 bg-[#c9a84c]/80',
                    isPressed && 'scale-50'
                )}
                style={{
                    willChange: 'transform',
                    boxShadow: isHovering
                        ? '0 0 12px rgba(201,168,76,0.8), 0 0 30px rgba(201,168,76,0.3)'
                        : '0 0 6px rgba(201,168,76,0.5)',
                }}
            />
        </>
    )
}
