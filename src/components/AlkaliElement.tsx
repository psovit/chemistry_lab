import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface AlkaliElementProps {
  position: [number, number, number]
  onClick: () => void
  color: string

}

interface CubeProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  onClick: () => void;
}

const Cube = ({ position, size, color, onClick }: CubeProps) => {
  const ref = useRef<Mesh>(null);

   useFrame((state, delta) => {
     if (ref.current) {
       ref.current.rotation.y += delta;
     }
  })

  return (
    <mesh position={position} ref={ref} onClick={onClick}>
      <boxGeometry args={size}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}


export default function AlkaliElement({ position, onClick, color }: AlkaliElementProps) {
  return (
    <Cube position={position} size={[0.3, 0.3, 0.3]} color={color} onClick={onClick} />
  )
}
