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
  const [x, y, z] = position
  const targetY = 0 // Bottom of the beaker

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta

      if (isDropped && ref.current.position.y > targetY) {
        ref.current.position.y -= delta * 2 // Adjust speed by changing multiplier
      }
    }
  })

  return (
    <mesh position={[x, isDropped ? y : y, z]} ref={ref}>
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
