import { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { Cylinder, Ring } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export interface BeakerRef {
  triggerRipple: () => void
}

const Beaker = forwardRef<BeakerRef>((props, ref) => {
  const [isRippling, setIsRippling] = useState(false)
  const rippleScale = useRef(1)

  useImperativeHandle(ref, () => ({
    triggerRipple: () => {
      rippleScale.current = 1
      setIsRippling(true)
    }
  }))

  useFrame((state, delta) => {
    if (isRippling) {
      rippleScale.current += delta * 1.5 // Slightly slower expansion
      if (rippleScale.current >= 2.5) { // Larger maximum scale
        rippleScale.current = 1
        setIsRippling(false)
      }
    }
  })

  return (
    <group position={[0,-1,0]}>
      <Cylinder
        args={[1, 1, 2, 32]}
        position={[0, 1, 0]}
        material-transparent={true}
        material-opacity={0.2}
        material-color="grey"
      />
      <Cylinder
        args={[0.9, 0.9, 1.5, 32]}
        position={[0, 0.75, 0]}
        material-color="#a0e1ff"
        material-transparent={true}
        material-opacity={0.6}
      />
      {isRippling && (
        <> 
          {/* Multiple rings for better visibility */}
          <Ring
            args={[0.2, 0.3, 32]}
            position={[0, 1.25, 0]}
            rotation={[-Math.PI/2, 0, 0]}
            scale={[rippleScale.current, rippleScale.current, 1]}
          >
            <meshBasicMaterial color="#ffffff"  opacity={0.6} />
          </Ring>
          <Ring
            args={[0.3, 0.4, 32]}
            position={[0, 1.251, 0]}
            rotation={[-Math.PI/2, 0, 0]}
            scale={[rippleScale.current * 0.8, rippleScale.current * 0.8, 1]}
          >
            <meshBasicMaterial color="#a0e1ff"  opacity={0.7} />
          </Ring>
         </>
      )}
    </group>
  )
})

export default Beaker
