import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface AlkaliElementProps {
  position: [number, number, number]
  color: string
  isDropped?: boolean
  onSplash?: () => void
}

interface CubeProps {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  isDropped?: boolean
  onSplash?: () => void
}

const Cube = ({ position, size, color, isDropped, onSplash }: CubeProps) => {
  const ref = useRef<Mesh>(null)
  const [x, initialY, z] = position
  const targetY = 0 // Bottom of the beaker
  const currentY = useRef(initialY)
  const [hasSplashed, setHasSplashed] = useState(false)
  const waterSurfaceY = 0.25 // Approximate water surface level

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta

      if (isDropped && currentY.current > targetY) {
        const prevY = currentY.current
        currentY.current -= delta * 2 // Drop speed
        ref.current.position.y = currentY.current

        // Detect water surface collision
        if (!hasSplashed && prevY > waterSurfaceY && currentY.current <= waterSurfaceY) {
          setHasSplashed(true)
          onSplash?.()
          setTimeout(() => setHasSplashed(false), 1000)
        }
      } else if (!isDropped && currentY.current < initialY) {
        currentY.current += delta * 2 // Rise speed
        ref.current.position.y = currentY.current
      }
    }
  })

  return (
    <>
      <mesh position={[x, currentY.current, z]} ref={ref}>
        <boxGeometry args={size}/>
        <meshStandardMaterial color={color}/>
      </mesh>
      {hasSplashed && (
        <group position={[x, waterSurfaceY, z]}>
          {/* Splash particles */}
          {[...Array(8)].map((_, i) => (
            <mesh key={i} position={[
              Math.sin(i * Math.PI/4) * 0.3,
              Math.random() * 0.2,
              Math.cos(i * Math.PI/4) * 0.3
            ]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#a0e1ff" transparent opacity={0.6} />
            </mesh>
          ))}
        </group>
      )}
    </>
  )
}

export default function AlkaliElement({ position, color, isDropped, onSplash }: AlkaliElementProps) {
  return (
    <Cube position={position} size={[0.3, 0.3, 0.3]} color={color} isDropped={isDropped} onSplash={onSplash} />
  )
}
