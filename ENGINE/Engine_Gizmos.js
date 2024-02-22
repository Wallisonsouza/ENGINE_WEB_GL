class EngineGizmos
{
 

    
  
    static colorX = new EngineVector4(1.0, 0.0, 0.0, 1.0);
    static colorY = new EngineVector4(0.0, 1.0, 0.0, 1.0);
    static colorZ = new EngineVector4(0.0, 0.0, 1.0, 1.0);

    constructor() 
    {
      this.transform = new EngineTransform();
    }

    DrawnGizmos(WebGL) 
    {
  
        const vertexSource = `

        precision highp float;
        attribute vec4 a_vertexPosition;
        attribute vec4 a_color;
        varying vec4 v_color;
        uniform mat4 u_translation;
        uniform mat4 u_rotation;
        uniform mat4 u_scale;
  
        void main() 
        {
            gl_Position = u_translation * u_rotation * u_scale * a_vertexPosition;
            v_color = a_color;
        }
      `;
  
        const fragmentSource = `

        precision highp float;
        varying vec4 v_color;
  
        void main() 
        {
            gl_FragColor = v_color;
        }
      `;


        const vertexShader = Engine_WebGlAux.SHADER_CREATE_VERTEX_SHADER(WebGL, vertexSource);
        const fragmentShader = Engine_WebGlAux.SHADER_CREATE_FRAGMENT_SHADER(WebGL, fragmentSource);
        const program = Engine_WebGlAux.PROGRAM_CREATE(WebGL, vertexShader, fragmentShader);
    
        WebGL.useProgram(program);
    
        const gizmosVertex = new Float32Array([

          // Eixo X (vermelho)
          0.0, 0.0, 0.0,
          0.5, 0.0, 0.0,
        
          // Eixo Y (verde)
          0.0, 0.0, 0.0,
          0.0, 0.5, 0.0,
        
          // Eixo Z (azul)
          0.0, 0.0, 0.0,
          0.0, 0.0, 0.5

        ]);
        
        const gizmosIndex = new Uint16Array([

          0, 1, // Eixo X
          2, 3, // Eixo Y
          4, 5  // Eixo Z

        ]);
    
        const gizmosColor = new Float32Array([
          
          EngineGizmos.colorX.x, EngineGizmos.colorX.y, EngineGizmos.colorX.z, EngineGizmos.colorX.w,
          EngineGizmos.colorX.x, EngineGizmos.colorX.y, EngineGizmos.colorX.z, EngineGizmos.colorX.w,
          EngineGizmos.colorY.x, EngineGizmos.colorY.y, EngineGizmos.colorY.z, EngineGizmos.colorY.w,
          EngineGizmos.colorY.x, EngineGizmos.colorY.y, EngineGizmos.colorY.z, EngineGizmos.colorY.w,
          EngineGizmos.colorZ.x, EngineGizmos.colorZ.y, EngineGizmos.colorZ.z, EngineGizmos.colorZ.w,
          EngineGizmos.colorZ.x, EngineGizmos.colorZ.y, EngineGizmos.colorZ.z, EngineGizmos.colorZ.w
        
        ]);
    
        // Cria um buffer para os vértices
        const vertexBuffer = WebGL.createBuffer();
        WebGL.bindBuffer(WebGL.ARRAY_BUFFER, vertexBuffer);
        WebGL.bufferData(WebGL.ARRAY_BUFFER, gizmosVertex, WebGL.STATIC_DRAW);
    
        // Cria um buffer para os índices
        const indexBuffer = WebGL.createBuffer();
        WebGL.bindBuffer(WebGL.ELEMENT_ARRAY_BUFFER, indexBuffer);
        WebGL.bufferData(WebGL.ELEMENT_ARRAY_BUFFER, gizmosIndex, WebGL.STATIC_DRAW);
    
        // Passa valores para as variáveis na GPU através do GLSL
        const a_matrix_vertex_position = WebGL.getAttribLocation(program, "a_vertexPosition");
        WebGL.vertexAttribPointer(a_matrix_vertex_position, 3, WebGL.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        WebGL.enableVertexAttribArray(a_matrix_vertex_position);
    
        // Cria uma matriz de posição
        var translationMatrix = EngineMatrix4x4.Matrix_Translation(this.transform.position);
        var u_matrix_translation = WebGL.getUniformLocation(program, "u_translation");
        WebGL.uniformMatrix4fv(u_matrix_translation, false, EngineMatrix4x4.ToArray32(translationMatrix));
    
        // Cria uma matriz de rotação
        var rotationMatrix = EngineMatrix4x4.Matrix_Rotation(this.transform.rotation);
        var u_matrix_rotation = WebGL.getUniformLocation(program, "u_rotation");
        WebGL.uniformMatrix4fv(u_matrix_rotation, false, EngineMatrix4x4.ToArray32(rotationMatrix));

		  // Cria uma matriz de escala
		  var scaleMatrix = EngineMatrix4x4.Matrix_Scale(this.transform.scale);
		  var scaleMatrixPosition = WebGL.getUniformLocation(program, "u_scale");
		  WebGL.uniformMatrix4fv(scaleMatrixPosition, false, EngineMatrix4x4.ToArray32(scaleMatrix));

    
        // Crie um único buffer para armazenar as cores
        const colorBuffer = WebGL.createBuffer();
        WebGL.bindBuffer(WebGL.ARRAY_BUFFER, colorBuffer);
        WebGL.bufferData(WebGL.ARRAY_BUFFER, gizmosColor, WebGL.STATIC_DRAW);
    
        // Atributo para cores
        const colorAtribute = WebGL.getAttribLocation(program, "a_color");
        WebGL.vertexAttribPointer(colorAtribute, 4, WebGL.FLOAT, WebGL.FALSE, 4 * Float32Array.BYTES_PER_ELEMENT, 0);
        WebGL.enableVertexAttribArray(colorAtribute);
    
        // Desenha os gizmos
        WebGL.drawElements(WebGL.LINES, gizmosIndex.length, WebGL.UNSIGNED_SHORT, 0);
    }
}