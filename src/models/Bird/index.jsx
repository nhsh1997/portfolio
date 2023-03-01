import {useEffect, useLayoutEffect, useRef} from "react";
import {useAnimations, useGLTF} from "@react-three/drei";
import {useControls} from "leva";
import gsap from "gsap";

export const Bird = (props) => {
    const ref = useRef(null)
    const tl = useRef();

    const bird = useGLTF('/bird.glb')
    const animations = useAnimations(bird.animations, bird.scene)

    const { animationName } = useControls({
        animationName: { options: animations.names }
    })

    useEffect(() =>
    {
        const action = animations.actions[animationName]
        action.play()
    }, [])

    const toggleTimeline = () => {
        tl.current.reversed(!tl.current.reversed());
    };

    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            tl.current = gsap
                .timeline()
                .to(ref.current.position,  {duration: 5, z: ref.current.position.z + 10})
                .to(ref.current.rotation,  {duration: 5, y: ref.current.rotation.y + Math.PI})
                .reverse();
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <primitive onClick={toggleTimeline}  position={ [ -1, -1, -1 ] } ref={ref}  scale={ 1 } object={ bird.scene } />
    )
}

export default Bird;
