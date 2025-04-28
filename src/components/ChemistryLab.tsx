import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import Beaker from './Beaker'
import AlkaliElement from './AlkaliElement'

interface AlkaliElement {
  name: string
  symbol: string
  color: string
}

const ALKALI_ELEMENTS: AlkaliElement[] = [
  { name: 'Lithium', symbol: 'Li', color: 'hotpink' },
  { name: 'Sodium', symbol: 'Na', color: 'red' },
  { name: 'Potassium', symbol: 'K', color: 'green' },
  { name: 'Rubidium', symbol: 'Rb', color: '#7d7d7d' },
  { name: 'Caesium', symbol: 'Cs', color: '#9f9f9f' },
  { name: 'Francium', symbol: 'Fr', color: '#9f9f9f' }
]

export default function ChemistryLab() {
  const [isPotassiumDropped, setIsPotassiumDropped] = useState(false)
  const [selectedElement, setSelectedElement] = useState<AlkaliElement>(ALKALI_ELEMENTS[2])

  const handleDrop = () => {
    setIsPotassiumDropped(true)
  }

  const handleElementSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const element = ALKALI_ELEMENTS.find(el => el.name === event.target.value)
    if (element) {
      setSelectedElement(element)
      setIsPotassiumDropped(false)
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1,
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <select 
          value={selectedElement.name}
          onChange={handleElementSelect}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          {ALKALI_ELEMENTS.map(element => (
            <option key={element.symbol} value={element.name}>
              {element.name} ({element.symbol})
            </option>
          ))}
        </select>
        <button
          onClick={() => setIsPotassiumDropped(false)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            background: '#4CAF50',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Drop Element
        </button>
      </div>

      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Beaker />
        {!isPotassiumDropped && (
          <AlkaliElement 
            position={[2, 2, 0]} 
            onClick={handleDrop}
            color={selectedElement.color}
          />
        )}
      </Canvas>
    </div>
  )
}
