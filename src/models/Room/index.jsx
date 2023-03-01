import * as THREE from "three";
import Vespa from "../Vespa";
import {useLayoutEffect, useRef} from "react";
import gsap from "gsap";

export const Room = () => {
    const ref = useRef(null)

    const tl = useRef();

    const toggleTimeline = () => {
        tl.current.reversed(!tl.current.reversed());
    };

    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            tl.current = gsap
                .timeline()
                .to(ref.current.rotation,  {duration: 5, y: ref.current.rotation.y + - Math.PI * 0.5})
                .reverse();
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <group ref={ref} onClick={toggleTimeline} dispose={null}>
            <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 5 }>
                <planeGeometry />
                <meshStandardMaterial side={THREE.DoubleSide} />
            </mesh>
            <mesh receiveShadow position-z={ - 2.5 } position-y={ 1.5 } scale={ 5 }>
                <planeGeometry />
                <meshStandardMaterial side={THREE.DoubleSide} />
            </mesh>
            <mesh receiveShadow position-x={ -2.5 } position-y={ 1.5 } rotation-y={ Math.PI * 1.5 } scale={ 5 }>
                <planeGeometry />
                <meshStandardMaterial side={THREE.DoubleSide} />
            </mesh>
            <Vespa />
        </group>
    )
}

export default Room;