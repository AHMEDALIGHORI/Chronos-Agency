import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Suspense } from 'react'
import Wormhole from './Wormhole'
import Pyramid from './Pyramid'

export default function Scene() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
                <Suspense fallback={null}>
                    <color attach="background" args={['#050510']} />
                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.2} fade speed={0.8} />
                    <Wormhole />
                    <Pyramid position={[0, -10, -5]} />
                    <ambientLight intensity={0.3} />
                    <pointLight position={[5, 5, 5]} intensity={0.5} color="#c9a84c" />
                    <pointLight position={[-5, -5, 5]} intensity={0.3} color="#a78bfa" />
                </Suspense>
            </Canvas>
        </div>
    )
}
