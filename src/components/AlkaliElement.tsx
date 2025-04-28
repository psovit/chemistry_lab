import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface AlkaliElementProps {
  position: [number, number, number]
  color: string
  isDropped?: boolean
}

interface CubeProps {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  isDropped?: boolean
}

const Cube = ({ position, size, color, isDropped }: CubeProps) => {
  const ref = useRef<Mesh>(null)
  const [x, initialY, z] = position
  const targetY = 0 // Bottom of the beaker
  const currentY = useRef(initialY)

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta

      if (isDropped && currentY.current > targetY) {
        currentY.current -= delta * 2 // Drop speed
        ref.current.position.y = currentY.current
      } else if (!isDropped && currentY.current < initialY) {
        currentY.current += delta * 2 // Rise speed
        ref.current.position.y = currentY.current
      }
    }
  })

  return (
    <mesh position={[x, currentY.current, z]} ref={ref}>
      <boxGeometry args={size}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

export default function AlkaliElement({ position, color, isDropped }: AlkaliElementProps) {
  return (
    <Cube position={position} size={[0.3, 0.3, 0.3]} color={color} isDropped={isDropped} />
  )
}
