import './App.css'
import { Canvas } from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import Room from "./models/Room";

function App() {
  return (
        <Canvas>
            <OrbitControls makeDefault />
            <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
            <Room />
        </Canvas>
  )
}

export default App
