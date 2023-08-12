uniform vec3 uColor;
uniform float uTime;
varying vec2 vPosition;

vec3 colorB = vec3(1.0,1.0,1.0);
void main()
{
    vec3 color = vec3(0.0);
    float y = vPosition.y+uTime*0.1;
    float x = -vPosition.x*0.5;
    float plt = smoothstep(0.0, 0.01, mod(y+x, 0.1));
    color = mix(colorB, uColor, plt);

    gl_FragColor = vec4(color, 0.8);
}
