import { useRef } from 'react'
import { Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface AlkaliElementProps {
  position: [number, number, number]
  onClick: () => void
  color: string
}

export default function AlkaliElement({ position, onClick, color }: AlkaliElementProps) {
  const elementRef = useRef<Mesh>(null)

  useFrame(() => {
    if (elementRef.current) {
      elementRef.current.rotation.y += 0.01
    }
  })

  return (
    <group>
      <Sphere
        ref={elementRef}
        args={[0.3, 32, 32]}
        position={position}
        onClick={onClick}
      >
        <meshStandardMaterial 
          attach="material"
          color={color}
          metalness={0.8} 
          roughness={0.2}
        />
      </Sphere>
    </group>
  )
}