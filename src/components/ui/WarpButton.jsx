import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function WarpButton({ children, onClick, className }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={clsx(
                "relative px-8 py-4 font-bold tracking-widest text-chronos-gold uppercase border border-chronos-gold/40 bg-black/50 backdrop-blur-sm overflow-hidden group transition-all duration-300 hover:bg-chronos-gold/10 hover:border-chronos-gold hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]",
                className
            )}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
            {/* Glitch Effect Overlay */}
            <span className="absolute inset-0 w-full h-full bg-chronos-gold/10 transform -translate-x-full skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
        </motion.button>
    )
}
