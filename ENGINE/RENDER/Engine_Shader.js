export default class EngineShader
{
    constructor()
    {
        this.vertexShaderSource =  `
        
        precision mediump float;

        attribute vec3 aPosition;
        uniform mat4 model;
    
        uniform mat4 uGeometryTranslation;
        uniform mat4 uGeometryRotation;
        uniform mat4 uGeometryScale;
    

        uniform mat4 uCameraView;
        uniform mat4 uCameraProjection;
        uniform mat4 uCameraTranslation;
        uniform mat4 uCameraRotation;

        varying vec3 normal;

        void main() 
        
        {
            //MVP model/ view/ projection
            mat4 arckball = uCameraTranslation * uCameraRotation * uCameraView;
            //T(R(S(p)))
            mat4 model =  uGeometryTranslation * uGeometryRotation * uGeometryScale;
    
            gl_Position =  uCameraProjection * arckball  * model * vec4(aPosition, 1);
        }
        `
        ;

        this.fragmentShaderSource =  `

            precision highp float;
            varying vec3 normal;

            void main() 
            {
                vec3 lightDir = normalize(vec3(0.0, 0.0, 1.0)); // Direção da luz, ajuste conforme necessário
                float difuse = max(dot(normal, lightDir), 0.2);
                
                // Aumentando a intensidade da luz
                float lightIntensity = 10.0; // Valor maior para uma luz mais intensa
                difuse *= lightIntensity;

                // Aumentando a intensidade da sombra
                float shadowIntensity = 0.1; // Valor maior para uma sombra mais intensa
                difuse *= shadowIntensity;

                vec3 difuseColor = vec3(1.0, 1.0, 1.0);
                gl_FragColor = vec4(difuseColor * difuse, 1.0);
            }
            `
        ;
    }
    
}