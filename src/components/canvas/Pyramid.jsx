import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

export default function Pyramid(props) {
    const mesh = useRef()

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y += 0.003
        }
    })

    return (
        <mesh ref={mesh} {...props}>
            <coneGeometry args={[2, 3, 4]} />
            <MeshDistortMaterial
                color="#c9a84c"
                emissive="#5e4b1a"
                roughness={0.3}
                metalness={0.9}
                distort={0.3}
                speed={0.8}
            />
        </mesh>
    )
}
