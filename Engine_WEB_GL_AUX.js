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
       
        precision highp float;
        attribute vec4 a_vertexPosition;
        attribute vec4 a_color;
        attribute vec4 a_shadowColor;
    

        uniform mat4 u_TRS;
        uniform mat4  u_translation;
        uniform mat4 u_rotation;
        uniform mat4 u_projection;
        uniform mat4 u_scale;
        
        varying vec4 v_Color;
        varying vec4 v_shadowColor;
    
        void main() 
        {
            gl_Position = u_rotation * u_scale * a_vertexPosition * u_translation;

            v_Color = vec4(1.0, 1.0, 1.0, 1.0);
            v_shadowColor = a_shadowColor;
        }
        `;
    }

    
    
    static SHADER_FRAGMENT_SOURCE()
    {
        return `
        precision highp float;
        varying vec4 v_Color;
        varying vec4 v_shadowColor;
    
        void main() 
        {
            gl_FragColor = v_Color;
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
