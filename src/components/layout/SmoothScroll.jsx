import { useEffect } from 'react'
import Lenis from 'lenis'
import useStore from '../../store/useStore'

export default function SmoothScroll({ children }) {
    const setScrollProgress = useStore((state) => state.setScrollProgress)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        })

        function raf(time) {
            lenis.raf(time)
            // Calculate progress 0 to 1
            const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
            setScrollProgress(isNaN(progress) ? 0 : progress)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [setScrollProgress])

    return <div className="scroll-wrapper">{children}</div>
}
