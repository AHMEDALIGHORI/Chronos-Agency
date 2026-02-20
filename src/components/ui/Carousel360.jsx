import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const carouselItems = [
    {
        image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=600&h=400&fit=crop',
        title: 'The Great Pyramids',
        era: 'Ancient Egypt — 2560 BC',
    },
    {
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
        title: 'Taj Mahal',
        era: 'Mughal Empire — 1653 AD',
    },
    {
        image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&h=400&fit=crop',
        title: 'Roman Colosseum',
        era: 'Ancient Rome — 80 AD',
    },
    {
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        title: 'Alpine Expeditions',
        era: 'Age of Exploration — 1786 AD',
    },
    {
        image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&h=400&fit=crop',
        title: 'Ancient Forests',
        era: 'Prehistoric — 10,000 BC',
    },
    {
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
        title: 'Earth from Space',
        era: 'Modern Era — 1969 AD',
    },
    {
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop',
        title: 'Industrial Revolution',
        era: 'Victorian Era — 1880 AD',
    },
    {
        image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=400&fit=crop',
        title: 'Space Frontier',
        era: 'Future — 2099 AD',
    },
]

export default function Carousel360() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const containerRef = useRef(null)

    const n = carouselItems.length
    const theta = 360 / n

    useEffect(() => {
        if (!isAutoPlaying) return
        const interval = setInterval(() => {
            setCurrentIndex(prev => prev + 1)
        }, 3500)
        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const handlePrev = useCallback(() => {
        setIsAutoPlaying(false)
        setCurrentIndex(prev => prev - 1)
    }, [])

    const handleNext = useCallback(() => {
        setIsAutoPlaying(false)
        setCurrentIndex(prev => prev + 1)
    }, [])

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.clientX || e.touches?.[0]?.clientX || 0)
        setIsAutoPlaying(false)
    }

    const handleMouseUp = (e) => {
        if (!isDragging) return
        setIsDragging(false)
        const endX = e.clientX || e.changedTouches?.[0]?.clientX || 0
        const diff = endX - startX
        if (Math.abs(diff) > 50) {
            if (diff > 0) handlePrev()
            else handleNext()
        }
    }

    const rotation = -(currentIndex * theta)
    const activeIndex = ((currentIndex % n) + n) % n
    const radius = Math.round((300 / 2) / Math.tan(Math.PI / n))

    return (
        <div className="relative w-full py-16">
            {/* Carousel Container */}
            <div
                ref={containerRef}
                className="carousel-3d relative mx-auto select-none"
                style={{ width: '300px', height: '220px' }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => isDragging && setIsDragging(false)}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
            >
                <div
                    className="carousel-3d-inner absolute w-full h-full"
                    style={{
                        transform: `rotateY(${rotation}deg)`,
                        transformOrigin: '50% 50%',
                    }}
                >
                    {carouselItems.map((item, i) => {
                        const itemRotation = theta * i
                        return (
                            <div
                                key={i}
                                className="carousel-3d-item absolute w-full h-full"
                                style={{
                                    transform: `rotateY(${itemRotation}deg) translateZ(${radius}px)`,
                                }}
                            >
                                <div className="relative w-full h-full rounded-xl overflow-hidden border border-chronos-gold/20 group cursor-grab active:cursor-grabbing">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                        draggable={false}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h4 className="text-white font-serif text-lg font-bold">{item.title}</h4>
                                        <p className="text-chronos-gold/80 text-xs tracking-widest uppercase">{item.era}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Active Item Info */}
            <div className="text-center mt-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">
                            {carouselItems[activeIndex].title}
                        </h3>
                        <p className="text-chronos-gold text-sm tracking-[0.3em] uppercase">
                            {carouselItems[activeIndex].era}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-8 mt-8">
                <button
                    onClick={handlePrev}
                    className="p-3 border border-chronos-gold/30 rounded-full text-chronos-gold hover:bg-chronos-gold/10 transition-all duration-300 hover:border-chronos-gold/60"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                    {carouselItems.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setCurrentIndex(i); setIsAutoPlaying(false) }}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                i === activeIndex
                                    ? 'bg-chronos-gold w-6'
                                    : 'bg-white/20 hover:bg-white/40 w-2'
                            }`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="p-3 border border-chronos-gold/30 rounded-full text-chronos-gold hover:bg-chronos-gold/10 transition-all duration-300 hover:border-chronos-gold/60"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}
