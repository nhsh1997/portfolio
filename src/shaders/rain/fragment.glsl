uniform float uTime;
varying vec3 vColor;

void main()
{

    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = step(0.5, strength);
    strength = 1.0 - strength;
    vec3 mixedColor = mix(vec3(0.0), vec3(cos(uTime) * vColor.x, sin(uTime  * 0.2) * vColor.y, vColor.z), vec3(strength));
    gl_FragColor = vec4(mixedColor, 1.0);
}
