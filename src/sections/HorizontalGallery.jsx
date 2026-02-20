import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
    {
        image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=900&h=600&fit=crop',
        title: 'The Great Pyramids',
        era: '2560 BC',
        color: '#c9a84c',
        description: 'Where gods walked among mortals and stone defied gravity.',
    },
    {
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=900&h=600&fit=crop',
        title: 'Taj Mahal',
        era: '1653 AD',
        color: '#f5d98a',
        description: 'An emperor\'s love letter written in marble and moonlight.',
    },
    {
        image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&h=600&fit=crop',
        title: 'Roman Colosseum',
        era: '80 AD',
        color: '#d4a853',
        description: 'The arena where civilization\'s stories were written in sand and glory.',
    },
    {
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=600&fit=crop',
        title: 'Alpine Expeditions',
        era: '1786 AD',
        color: '#a78bfa',
        description: 'When humans dared to touch the sky and found only more sky beyond.',
    },
    {
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=600&fit=crop',
        title: 'Pale Blue Dot',
        era: '1990 AD',
        color: '#22d3ee',
        description: 'A photograph that changed how we see everything.',
    },
    {
        image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&h=600&fit=crop',
        title: 'The Final Frontier',
        era: '2026 AD',
        color: '#fb7185',
        description: 'The next chapter isn\'t written yet. It\'s yours to create.',
    },
]

export default function HorizontalGallery() {
    const sectionRef = useRef(null)
    const trackRef = useRef(null)
    const counterRef = useRef(null)
    const progressRef = useRef(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const track = trackRef.current
            const totalWidth = track.scrollWidth - window.innerWidth

            // Pin and horizontal scroll
            const scrollTween = gsap.to(track, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: () => `+=${totalWidth}`,
                    scrub: 0.8,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Update counter
                        const index = Math.min(
                            Math.floor(self.progress * galleryItems.length),
                            galleryItems.length - 1
                        )
                        if (counterRef.current) {
                            counterRef.current.textContent = `${String(index + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`
                        }
                        // Update progress bar
                        if (progressRef.current) {
                            progressRef.current.style.transform = `scaleX(${self.progress})`
                        }
                    }
                }
            })

            // Animate each card on entry
            const cards = track.querySelectorAll('.gallery-card')
            cards.forEach((card) => {
                gsap.from(card, {
                    y: 60,
                    opacity: 0,
                    scale: 0.92,
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 50%',
                        scrub: 1,
                    }
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-[#030308]">
            {/* Fixed UI Layer */}
            <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none px-8 pt-10 pb-6 flex items-center justify-between">
                <div>
                    <span className="text-[10px] tracking-[0.5em] text-[#c9a84c]/50 uppercase">Horizontal Scroll</span>
                    <h3 className="text-3xl md:text-4xl font-serif text-white/90 mt-1">Moments Frozen in Time</h3>
                </div>
                <div className="text-right">
                    <span ref={counterRef} className="text-[#c9a84c] font-mono text-lg tracking-wider">01 / 06</span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/5">
                <div
                    ref={progressRef}
                    className="h-full origin-left"
                    style={{
                        background: 'linear-gradient(90deg, #c9a84c, #f5d98a, #a78bfa)',
                        transform: 'scaleX(0)',
                        transition: 'transform 0.1s linear',
                    }}
                />
            </div>

            {/* Scrolling Track */}
            <div ref={trackRef} className="flex items-center gap-12 px-[10vw] py-24" style={{ width: 'max-content' }}>
                {/* Intro card */}
                <div className="flex-shrink-0 w-[40vw] min-w-[300px] h-[60vh] flex items-center">
                    <div className="space-y-6">
                        <span className="text-[#c9a84c]/40 text-xs tracking-[0.5em] uppercase">Chapter II</span>
                        <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #c9a84c, #f5d98a, #c9a84c)' }}>
                                History
                            </span>
                            <br />
                            <span className="text-white/40">Isn't Static.</span>
                        </h2>
                        <p className="text-white/30 text-lg max-w-md leading-relaxed">
                            Scroll horizontally through the most pivotal moments humanity has ever witnessed.
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-px bg-[#c9a84c]/30" />
                            <span className="text-[#c9a84c]/30 text-xs tracking-[0.3em]">DRAG OR SCROLL</span>
                            <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="text-[#c9a84c]/30">
                                <path d="M0 6H22M22 6L17 1M22 6L17 11" stroke="currentColor" strokeWidth="1" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Gallery Cards */}
                {galleryItems.map((item, i) => (
                    <div key={i} className="gallery-card flex-shrink-0 w-[70vw] md:w-[50vw] lg:w-[40vw] h-[65vh] relative group">
                        <div className="relative w-full h-full overflow-hidden rounded-2xl">
                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                            {/* Hover color accent line */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                                style={{ backgroundColor: item.color }}
                            />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <span
                                            className="text-xs tracking-[0.3em] uppercase font-mono"
                                            style={{ color: item.color }}
                                        >
                                            {item.era}
                                        </span>
                                        <h4 className="text-3xl md:text-4xl font-serif text-white font-bold mt-2 leading-tight">
                                            {item.title}
                                        </h4>
                                        <p className="text-white/40 text-sm mt-3 max-w-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                    <span className="text-6xl md:text-7xl font-black text-white/[0.04] leading-none font-mono">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            </div>

                            {/* Corner frame on hover */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-l border-t opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: item.color + '60' }} />
                            <div className="absolute top-4 right-4 w-8 h-8 border-r border-t opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: item.color + '60' }} />
                        </div>
                    </div>
                ))}

                {/* Outro spacer */}
                <div className="flex-shrink-0 w-[30vw] min-w-[200px] h-[60vh] flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#c9a84c]/30 mx-auto" />
                        <span className="text-white/20 text-xs tracking-[0.5em] uppercase block">Continue Below</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
