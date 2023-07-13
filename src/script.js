import * as THREE from 'three'
import { gsap } from 'gsap'
import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'

import mountainVertexShader from './shaders/mountain/vertex.glsl'
import mountainFragmentShader from './shaders/mountain/fragment.glsl'
THREE.ColorManagement.enabled = false

// Scene
const scene = new THREE.Scene()

// Canvas
const canvas = document.querySelector('canvas.webgl')
/**
 * Loaders
 */
const loadingBarElement = document.querySelector('.loading-bar')

window.setTimeout(() =>
{
    // Animate overlay
    gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 2, value: 0, delay: 1 })
    loadingBarElement.classList.add('ended')
    loadingBarElement.style.transform = ''
}, 100)

/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
        {
            uAlpha: { value: 1.0 }
        },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(1.0, 1.0, 1.0, uAlpha);
        }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)
/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(10, 20, 512, 512)

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms:
        {
            uTime: { value: 0 },
            uBigWavesElevation: { value: 0.2 },
            uBigWavesFrequency: { value: new THREE.Vector2(2.2, 1.5) },
            uBigWavesSpeed: { value: 0.75 },
            uColorOffset: { value: 0.25 },
            uColorMultiplier: { value: 3 },
            uSmallWavesElevation: { value: 0.2 },
            uSmallWavesFrequency: { value: 3 },
            uSmallWavesSpeed: { value: 0.2 },
            uSmallIterations: { value: 4 },
        }
})

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
const color2 = new THREE.Color( 0xFFFFFF );
scene.background = color2;
scene.add(water)


const moonGeometry = new THREE.SphereGeometry(1, 60, 60)
const moonMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
        {
            uTime: { value: 0 }
        },
    vertexShader: `
        void main()
        {  
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.8);
        }
    `
})

const moon = new THREE.Mesh(moonGeometry, moonMaterial)

moon.position.z = -5
moon.position.y = 0

scene.add(moon)

// Geometry
const mGeometry = new THREE.PlaneGeometry(5, 4, 200, 200)

// Material
const mMaterial = new THREE.ShaderMaterial({
    vertexShader: mountainVertexShader,
    fragmentShader: mountainFragmentShader,
    uniforms:
        {
            uTime: { value: 0 },
            uBigWavesElevation: { value: 0.24 },
            uBigWavesFrequency: { value: new THREE.Vector2(6, 6) },
            uBigWavesSpeed: { value: 0.75 },
            uColorOffset: { value: 0.24 },
            uColorMultiplier: { value: 3 },
            uSmallWavesElevation: { value: 0.2 },
            uSmallWavesFrequency: { value: 3 },
            uSmallWavesSpeed: { value: 0.2 },
            uSmallIterations: { value: 4 },
        }
})

const mountain = new THREE.Mesh(mGeometry, mMaterial)
mountain.rotation.x = - Math.PI * 0.5

scene.add(mountain)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0.4, 0.4)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    waterMaterial.uniforms.uTime.value = elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
