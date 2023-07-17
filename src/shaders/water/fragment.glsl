uniform float uTime;
varying float vElevation;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform vec3 uBlackColor;
uniform vec3 uUvColor;


void main()
{
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 mixedColor = mix(uBlackColor, uUvColor, mixStrength);
    gl_FragColor = vec4(mixedColor, 1.0);
}
