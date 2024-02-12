class Engine_WEB_GL_AUX
{
    /**
     * Obtém o contexto WebGL associado ao elemento canvas.
     * @param {string} [canvasId] - O ID do elemento canvas.
     * @returns {WebGLRenderingContext | null} O contexto WebGL ou null se não for possível obtê-lo.
     */
    static RENDERING_GET_WEB_GL_CONTEXT(canvasId) 
    {
        if(!canvasId)
        {
            console.error("Failed to create shader, [canvasId] is not defined");
            return null;
        }

        const canvas = document.getElementById(canvasId);
      
        if (!canvas) 
        {
            console.error(`Canvas element with id "${canvasId}" not found.`);
            return null;
        }
    
        const webGl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    
        if (!webGl) 
        {
            console.error("Unable to obtain WebGL context.");
            return null;
        }   

        if (webGl.isContextLost === undefined) 
        {
            console.log("Using experimental WebGL context.");
        }

        else 
        {
            //console.log("Using standard WebGL context.");
        }
        
        //console.log("WebGL Version:", webGl.getParameter(webGl.VERSION));
        //console.log("WebGL Vendor:", webGl.getParameter(webGl.VENDOR));
        //console.log("WebGL Renderer:", webGl.getParameter(webGl.RENDERER));

        return webGl;
    }
    /**
     * Cria um WebGL shader.
     * @param {WebGLRenderingContext} gl O contexto WebGL.
     * @param {Number} type O WebGLShader a ser criado.
     * @param {string} source O programa GLSL.
     * @returns {WebGLShader} O WebGLShader gerado ou null se não for possível obtê-lo.
     */
    static SHADER_CREATE_SHADER(gl, type, source) 
    {
        if(!gl)
        {
            console.error("Failed to create shader, [gl] is not defined");
            return null;
        }

        if(!type)
        {
            console.error("Failed to create shader, [type] is not defined");
            return null;
        }

        if(!source)
        {
            console.error("Failed to create shader, [source] is not defined");
            return null;
        }

        const shader = gl.createShader(type);
    
        if (shader) 
        {
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
    
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
            {
                console.error("Shader compilation failed:", gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
    
            return shader;
        }
    }
    
    static SHADER_CREATE_VERTEX_SHADER(gl, source)
    {
        if(!gl)
        {
            console.error("Failed to create vertex shader, [gl] is not defined");
            return null;
        }

        if(!source)
        {
            console.error("Failed to create vertex shader, [source] is not defined");
            
            return null;
        }

        return this.SHADER_CREATE_SHADER(gl, gl.VERTEX_SHADER, source);
    }

    static SHADER_CREATE_FRAGMENT_SHADER(gl, source)
    {
        if(!gl)
        {
            console.error("Failed to create fragment shader, [gl] is not defined");
            return null;
        }

        if(!source)
        {
            console.error("Failed to create fragment shader, [source] is not defined");
            
            return null;
        }

        return this.SHADER_CREATE_SHADER(gl, gl.FRAGMENT_SHADER, source);
    }
    
    static SHADER_VERTEX_SOURCE()
    {
        return `
       
        precision mediump float;

        attribute vec3 aPosition;
        uniform mat4 model;
        uniform mat4 uView;
        uniform mat4 uTranslation;
        uniform mat4 uRotation;
        uniform mat4 uScale;
        uniform mat4 uProjection;

        uniform mat4 uCameraTranslation;
        uniform mat4 uCameraRotation;
      
        varying vec3 normal;
       
        void main() 
        {
            //MVP model/ view/ projection

            //T(R(S(p)))
            mat4 arcBall = uCameraTranslation * uCameraRotation * uView;
            mat4 model =  uTranslation * uRotation * uScale;
            mat4 mvp = uProjection * arcBall  * model;
            gl_Position =  mvp * vec4(aPosition, 1);
        }
        `;
    }
    
    static SHADER_FRAGMENT_SOURCE()
    {
        return `
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
        `;
    }
    
    static PROGRAM_CREATE(gl, vertexShader, fragmentShader)
    {
        if(!gl)
        {
            console.error("Failed to create program, [gl] is not defined");

            return null;
        }

        if(!vertexShader)
        {
            console.error("Failed to create program, [vertexShader] is not defined");

            return null;
        }

        if(!fragmentShader)
        {
            console.error("Failed to create program, [fragmentShader] is not defined");

            return null;
        }

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if(!gl.getProgramParameter(program, gl.LINK_STATUS))
        {
            console.error("Failed to create WebGL program" + gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }

        gl.validateProgram(program);
        if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
        {
            console.error("ERROR validating program" + + gl.getProgramInfoLog(program));

            return null;
        }

        return program;
    }

/**
 * Limpa um programa WebGL.
 * @param {WebGLRenderingContext} gl - O contexto WebGL.
 * @param {WebGLProgram} program - O programa WebGL a ser limpo.
 */
    static PROGRAM_DELETE(gl, program) 
    {
        if (gl && program) 
        {
            gl.deleteProgram(program);
        }
    }


    /**
     * Cria um buffer.
     * @param {WebGLRenderingContext} gl - O contexto WebGL.
     * @param {string} data - O programa GLSL.
     */
    static BUFFER_CREATE(gl, data)
    {
        if(!gl)
        {
            console.error("Failed to create buffer, [gl] is not defined");

            return null;
        }

        if(!data)
        {
            console.error("Failed to create buffer, [data] is not defined");

            return null;
        }
       
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

        return buffer;
    }

    /**
     * Limpa um buffer WebGL.
     * @param {WebGLRenderingContext} gl - O contexto WebGL.
     * @param {WebGLBuffer} buffer - O buffer WebGL a ser limpo.
     */
    static BUFFER_DELETE(gl, buffer) 
    {
        if (gl && buffer) 
        {
            gl.deleteBuffer(buffer);
        }
    }
}
