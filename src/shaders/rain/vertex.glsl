uniform float uTime;
varying vec3 vColor;

void main()
{
/**
             * Position
             */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += tan(uTime * 0.1);
    modelPosition.x += sin(uTime * 0.2);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

/**
             * Size
             */
    gl_PointSize = modelPosition.y * 10.0;
    vColor = color;
}
