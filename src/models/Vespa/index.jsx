import {useEffect, useLayoutEffect, useRef} from "react";
import {useAnimations, useGLTF} from "@react-three/drei";
import gsap from "gsap";


export const Vespa = (props) => {
    const ref = useRef(null)

    const vespa = useGLTF('/vespa_px125.glb')

    return (
        <primitive castShadow  position={ [ -1.8, -0.2, 0 ] } ref={ref} rotation-y={ Math.PI * 1 } scale={ 1 } object={ vespa.scene } />
    )
}

export default Vespa;
