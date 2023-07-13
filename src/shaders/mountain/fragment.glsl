varying vec2 vUv;
varying float vElevation;
uniform float uColorOffset;
uniform float uColorMultiplier;


void main()
{
    vec3 blackColor = vec3(1.0, 1.0, 1.0);
    vec3 uvColor = vec3(0.0, 0.0, 0.0);
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 mixedColor = mix(blackColor, uvColor, mixStrength);
    gl_FragColor = vec4(mixedColor, 1.0);
}
