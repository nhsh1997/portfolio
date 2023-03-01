import {useLayoutEffect, useRef, useState} from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import {OrbitControls, useGLTF} from '@react-three/drei'
function Chair(props) {
    const ref = useRef(null)
    const tl = useRef();
    const model = useGLTF('chair.glb')

    const toggleTimeline = () => {
        tl.current.reversed(!tl.current.reversed());
    };

    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            tl.current = gsap
                .timeline()
                .to(ref.current.rotation,  {duration: 20, y: ref.current.rotation.y + Math.PI * 2})
                .reverse();
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <primitive onClick={toggleTimeline} ref={ref} scale={ 1.5 } object={ model.scene } />
    )
}

function App() {
  return (
        <Canvas>
            <OrbitControls makeDefault />
            <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
            <Chair />
        </Canvas>
  )
}

export default App
