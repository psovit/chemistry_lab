import { useRef } from 'react'
import { Cylinder } from '@react-three/drei'
import { Mesh } from 'three'

export default function Beaker() {
  const beakerRef = useRef<Mesh>(null)

  return (
    <group position={[0,-1,0]}>
      <Cylinder
        args={[1, 1, 2, 32]}
        position={[0, 1, 0]}
        material-transparent={true}
        material-opacity={0.2}
        material-color="#ffffff"
      />
      <Cylinder
        args={[0.9, 0.9, 1.5, 32]}
        position={[0, 0.75, 0]}
        material-color="#a0e1ff"
        material-transparent={true}
        material-opacity={0.6}
      />
    </group>
  )
}
