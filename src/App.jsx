import {useLayoutEffect, useRef, useState} from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'

function Box(props) {
    const ref = useRef(null)
    const tl = useRef();

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
        <mesh onClick={toggleTimeline} ref={ref} scale={ 1.5 }>
            <sphereGeometry args={ [ 1.5, 32, 32 ] } />
            <meshBasicMaterial color="mediumpurple" wireframe />
        </mesh>
    )
}

function App() {
  return (
        <Canvas>
            <Box />
        </Canvas>
  )
}

export default App
