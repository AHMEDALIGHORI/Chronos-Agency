import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Wormhole() {
    const tunnel = useRef()

    useFrame((state) => {
        if (tunnel.current) {
            tunnel.current.rotation.z += 0.001
        }
    })

    return (
        <mesh ref={tunnel} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[5, 1, 30, 32, 32, true]} />
            <meshStandardMaterial
                side={THREE.BackSide}
                wireframe
                color="#c9a84c"
                emissive="#c9a84c"
                emissiveIntensity={0.3}
                transparent
                opacity={0.15}
            />
        </mesh>
    )
}
