import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button')) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener('mousemove', updateMousePosition)
        window.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', updateMousePosition)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [])

    return (
        <motion.div
            className={clsx(
                "fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-chronos-gold pointer-events-none z-[200] flex items-center justify-center mix-blend-difference transition-colors duration-300",
                isHovering ? "scale-150 bg-chronos-gold text-black" : "scale-100 bg-transparent"
            )}
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isHovering ? 1.5 : 1
            }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28
            }}
        >
            <div className={clsx("w-1 h-1 bg-white rounded-full", isHovering && "opacity-0")} />
        </motion.div>
    )
}
