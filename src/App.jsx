import React, { useState, Suspense, useEffect } from 'react'
import SmoothScroll from './components/layout/SmoothScroll'
import Scene from './components/canvas/Scene'
import Preloader from './components/ui/Preloader'
import MagneticCursor from './components/ui/MagneticCursor'
import ScrollTimeline from './components/ui/ScrollTimeline'
import Hero from './sections/Hero'
import VideoIntro from './sections/VideoIntro'
import HorizontalGallery from './sections/HorizontalGallery'
import Era1 from './sections/Era1'
import Era2 from './sections/Era2'
import TransitionBridge from './sections/TransitionBridge'
import Era3 from './sections/Era3'
import Footer from './sections/Footer'

function App() {
    const [loaded, setLoaded] = useState(false)

    return (
        <>
            {/* Cinematic Preloader */}
            {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

            {/* Magnetic particle cursor (canvas-based) */}
            <MagneticCursor />

            {/* Scroll progress timeline (fixed right) */}
            {loaded && <ScrollTimeline />}

            <SmoothScroll>
                <div
                    className="relative w-full min-h-screen bg-[#030308] text-white selection:bg-[#c9a84c]/30 selection:text-white film-grain"
                    style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
                >
                    {/* Background 3D Scene */}
                    <Scene />

                    {/* Foreground Content */}
                    <main className="relative z-10">
                        <Hero />
                        <VideoIntro />
                        <HorizontalGallery />
                        <Era1 />
                        <Era2 />
                        <TransitionBridge />
                        <Era3 />

                        <Footer />
                    </main>
                </div>
            </SmoothScroll>
        </>
    )
}

export default App
