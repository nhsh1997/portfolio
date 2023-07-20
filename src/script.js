import * as THREE from 'three'
import { gsap } from 'gsap'
import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import mountainVertexShader from './shaders/mountain/vertex.glsl'
import mountainFragmentShader from './shaders/mountain/fragment.glsl'
import rainVertexShader from './shaders/rain/vertex.glsl'
import rainFragmentShader from './shaders/rain/fragment.glsl'
import moonVertexShader from './shaders/moon/vertex.glsl'
import moonFragmentShader from './shaders/moon/fragment.glsl'
THREE.ColorManagement.enabled = false

// Scene
const scene = new THREE.Scene()

// Canvas
const canvas = document.querySelector('canvas.webgl')
/**
 * Loaders
 */
const loadingBarElement = document.querySelector('.loading-bar')

/**
 * Overlay
 */
let theme = {
    background: new THREE.Color(0xFFFFFF),
    moon: {
        color: new THREE.Vector3(0.0, 0.0, 0.0)
    },
    cloud: {
        color: {
            black: new THREE.Vector3(0.0, 0.0, 0.0),
            uv: new THREE.Vector3(1.0, 1.0, 1.0)
        }
    },
    mountain: {
        color: {
            black: new THREE.Vector3(1.0, 1.0, 1.0),
            uv: new THREE.Vector3(0.0, 0.0, 0.0)
        }
    }
}

let theme1 = {
    background: new THREE.Color(0xffffff),
    moon: {
        color: new THREE.Vector3(1.0,0.247,0.204)
    },
    cloud: {
        color: {
            black: new THREE.Vector3(0.235,0.251,0.776),
            uv: new THREE.Vector3(1.0,1.0,1.0)
        }
    },
    mountain: {
        color: {
            black: new THREE.Vector3(1.0, 1.0, 1.0),
            uv: new THREE.Vector3(0.341,0.373,0.812)
        }
    }
}

let theme2 = {
    background: new THREE.Color(0xFFFFFF),
    moon: {
        color: new THREE.Vector3(0.0, 0.0, 0.0)
    },
    cloud: {
        color: {
            black: new THREE.Vector3(0.0, 0.0, 0.0),
            uv: new THREE.Vector3(1.0, 1.0, 1.0)
        }
    },
    mountain: {
        color: {
            black: new THREE.Vector3(1.0, 1.0, 1.0),
            uv: new THREE.Vector3(0.0, 0.0, 0.0)
        }
    }
}

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
const waterGeometry = new THREE.PlaneGeometry(15, 15, 512, 512)

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
            uBlackColor: { value: theme.cloud.color.black },
            uUvColor:  { value: theme.cloud.color.uv }
        }
})

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
water.position.z = -1
scene.background = theme.background
scene.add(water)


const moonGeometry = new THREE.SphereGeometry(1, 60, 60)
const moonMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms:
        {
            uColor: { value: theme.moon.color }
        },
    vertexShader: moonVertexShader,
    fragmentShader: moonFragmentShader
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
            uBlackColor: { value: theme.mountain.color.black },
            uUvColor:  { value: theme.mountain.color.uv }
        }
})

const mountain = new THREE.Mesh(mGeometry, mMaterial)
mountain.rotation.x = - Math.PI * 0.5

scene.add(mountain)


/**
 * Rain
 */

const rainGeometry = new THREE.BufferGeometry()

const positions = new Float32Array(200 * 3)
const colors = new Float32Array(200 * 3)

for (let i = 0; i < 200; i++)
{
    const i3 =  i * 3

    const randomX = (Math.random() - 0.5) * 20
    const randomY = (Math.random() - 0.5) * 10
    const randomZ = (Math.random() - 0.5) * 10

    positions[i3] = randomX
    positions[i3 + 1] = randomY
    positions[i3 + 2] = randomZ


    colors[i3] = Math.random()
    colors[i3 + 1] = Math.random()
    colors[i3 + 2] = 0.0
}

rainGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

rainGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
)

const rainMaterial = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.SubtractiveBlending,
    vertexColors: true,
    uniforms:
        {
            uTime: {value: 0},
        },
    vertexShader: rainVertexShader,
    fragmentShader: rainFragmentShader
})

const rain = new THREE.Points(rainGeometry, rainMaterial)
scene.add(rain)

rain.position.y = 1
rain.position.z = -5

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
camera.position.set(0, 0.5, 1.2)
scene.add(camera)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/*
* Cursor
* */

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})


/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime


    waterMaterial.uniforms.uTime.value = elapsedTime
    rainMaterial.uniforms.uTime.value = elapsedTime

    const parallaxX = cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5

    moon.position.x += (parallaxX - moon.position.x) * deltaTime * 5
    moon.position.y += (parallaxY - moon.position.y) * deltaTime * 5

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

window.setTimeout(() =>
{
    // Animate overlay
    gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 2, value: 0, delay: 1 })
    gsap.to(camera.position, { duration: 4, y: 0.4, delay: 1 });
    loadingBarElement.classList.add('ended')
    loadingBarElement.style.transform = ''
}, 100)

tick()


const switchButton = document.querySelector('.slider')

let currentTheme = 0;
let currentTimeLine;
switchButton.addEventListener('click', () => {
    if (currentTimeLine && currentTimeLine.progress() !== 1) {
        currentTimeLine.kill()
    }
    //debounce here
    if(currentTheme === 1) {
        let tl1 = gsap.timeline();
        tl1.to(moonMaterial.uniforms.uColor.value, {
            duration: 0.5,
            x: theme2.moon.color.x,
            y: theme2.moon.color.y,
            z: theme2.moon.color.z,
        })
        tl1.to(mMaterial.uniforms.uBlackColor.value, {
            duration: 0.5,
            x: theme2.mountain.color.black.x,
            y: theme2.mountain.color.black.y,
            z: theme2.mountain.color.black.z,
        }, "<")
        tl1.to(mMaterial.uniforms.uUvColor.value, {
            duration: 0.5,
            x: theme2.mountain.color.uv.x,
            y: theme2.mountain.color.uv.y,
            z: theme2.mountain.color.uv.z,
        }, "<")
        tl1.to(waterMaterial.uniforms.uBlackColor.value, {
            duration: 0.5,
            x: theme2.cloud.color.black.x,
            y: theme2.cloud.color.black.y,
            z: theme2.cloud.color.black.z,
        }, "<")
        tl1.to(waterMaterial.uniforms.uUvColor.value, {
            duration: 0.5,
            x: theme2.cloud.color.uv.x,
            y: theme2.cloud.color.uv.y,
            z: theme2.cloud.color.uv.z,
        }, "<")
        currentTimeLine = tl1;
        currentTheme = 0;
    } else {
        let tl2= gsap.timeline();

        tl2.to(moonMaterial.uniforms.uColor.value, {
            duration: 2,
            x: theme1.moon.color.x,
            y: theme1.moon.color.y,
            z: theme1.moon.color.z,
        }, "<")
        tl2.to(mMaterial.uniforms.uBlackColor.value, {
            duration: 2,
            x: theme1.mountain.color.black.x,
            y: theme1.mountain.color.black.y,
            z: theme1.mountain.color.black.z,
        }, "<")
        tl2.to(mMaterial.uniforms.uUvColor.value, {
            duration: 2,
            x: theme1.mountain.color.uv.x,
            y: theme1.mountain.color.uv.y,
            z: theme1.mountain.color.uv.z,
        }, "<")
        tl2.to(waterMaterial.uniforms.uBlackColor.value, {
            duration: 2,
            x: theme1.cloud.color.black.x,
            y: theme1.cloud.color.black.y,
            z: theme1.cloud.color.black.z,
        }, "<")
        tl2.to(waterMaterial.uniforms.uUvColor.value, {
            duration: 2,
            x: theme1.cloud.color.uv.x,
            y: theme1.cloud.color.uv.y,
            z: theme1.cloud.color.uv.z,
        }, "<")
        currentTimeLine = tl2;
        currentTheme = 1;
    }
})
