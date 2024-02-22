
import EngineMesh from "./Engine_Mesh.js";
import EngineCamera from "../Engine_Camera.js";
import EngineMatrix4x4 from "../ENGINE_MATHEMATICS/Engine_Matrix4x4.js";
import EngineQuaternion from "../ENGINE_MATHEMATICS/Engine_Quaternion.js";
import EngineVector3 from "../ENGINE_MATHEMATICS/Engine_Vector3.js";
import EngineInputs from "../Engine_Inputs.js";
import EngineWindowRender from "./Editor_Window_Render.js";
import EngineObject from "../Engine_Object.js";

let cout = 0;
let angleX = 0;
let angleY = 0;
export default class Engine_WebGl 
{
 
    
    constructor()
    {
        this.camera = new EngineCamera();
        this.windowRender =  new EngineWindowRender();
        this.objet = new EngineObject();
    }

    /**
     * 
     * @param {WebGLRenderingContext} webGl 
     */
    Render(webGl)
    {   
      
        if(webGl)
        {
            webGl.clearColor(0.5, 0.5, 0.5, 1);
            webGl.clear( webGl.COLOR_BUFFER_BIT | webGl.DEPTH_BUFFER_BIT);
            webGl.viewport(0, 0, this.windowRender.renderArea.width, this.windowRender.renderArea.height);

            const program = webGl.createProgram();
            this.RenderGemometry(webGl, program, this.objet);

           
            //#region 
           if(EngineInputs.GetKey("a"))
           {
                console.log(this.camera.position.x -= this.camera.speed);
           }

           else if(EngineInputs.GetKey("d"))
           {
            console.log(this.camera.position.x += this.camera.speed);
           }

           else if(EngineInputs.GetKey("w"))
           {
            console.log(this.camera.position.z += this.camera.speed);
           }

           else if(EngineInputs.GetKey("s"))
           {
            console.log(this.camera.position.z -= this.camera.speed);
           }

           if(EngineInputs.GetMouseButton(1))
           {
                angleX -= this.windowRender.deltaMouse.y * 100; 
                angleY += this.windowRender.deltaMouse.x * 100;
           }

           const angle =  new EngineVector3(angleX, angleY, 0);
           this.camera.rotation = EngineQuaternion.EulerToQuaternionVector(angle);
           //#endregion
        }
    }

    Loop()
    {
       this.Render(this.windowRender.renderingContext);
        requestAnimationFrame(() => this.Loop());
    }
    //#region 
    RenderCamera()
    {
        // cria uma matriz de projeção;
        //var geometryProjection = EngineMatrix4x4.Camera_Orthographic(-1, 1, -1, 1, -10, 1000);
        var geometryProjection = EngineMatrix4x4.CameraPerspective(60, window.innerWidth / window.innerHeight, -1, 1000);
        const geometryProjectionPosition = WebGL.getUniformLocation(program, "uProjection");
        WebGL.uniformMatrix4fv(geometryProjectionPosition , false, EngineMatrix4x4.ToArray32(geometryProjection));

        var geometryView = EngineMatrix4x4.identity;
        const geometryViewPosition = WebGL.getUniformLocation(program, "uView");
        WebGL.uniformMatrix4fv(geometryViewPosition , false, EngineMatrix4x4.ToArray32(geometryView));

        
        //cria uma matriz de translacao;
        const geometryCameraTranslation = EngineMatrix4x4.GeometryTranslation(cameraPosition);
        const geometryCameraTranslationLocation = WebGL.getUniformLocation(program, "uCameraTranslation");
        WebGL.uniformMatrix4fv(geometryCameraTranslationLocation, false, EngineMatrix4x4.ToArray32(geometryCameraTranslation));

        // cria uma matriz de rotacao;
        const geometryCameraRotation = EngineMatrix4x4.GeometryRotationQuaternion(EngineQuaternion.EulerToQuaternion(cameraRotation.x, cameraRotation.y, 0));
        const geometryCameraRotationLocation = WebGL.getUniformLocation(program, "uCameraRotation");
        WebGL.uniformMatrix4fv(geometryCameraRotationLocation, false, EngineMatrix4x4.ToArray32(geometryCameraRotation));
    }

    /**
     * @param {WebGLRenderingContext} webGl 
     * @param {*} program 
     * @param {EngineObject} object
     */
    RenderGemometry(webGl, program, object)
    {
        
        //#region SHADERS

            const vertexShader = this. CreateShader(webGl, webGl.VERTEX_SHADER, object.meshRender.shader.vertexShaderSource);
            const fragmentShader = this. CreateShader(webGl, webGl.FRAGMENT_SHADER, object.meshRender.shader.fragmentShaderSource);
            webGl.attachShader(program, vertexShader);
            webGl.attachShader(program, fragmentShader);
            webGl.linkProgram(program);

        //#endregion

        webGl.useProgram(program);

        //#region BUFFERS
    
            //cria um buffer para os vertices;
            const vertexBuffer = webGl.createBuffer();
            webGl.bindBuffer(webGl.ARRAY_BUFFER, vertexBuffer);
            webGl.bufferData(webGl.ARRAY_BUFFER, object.mesh.vertex, webGl.STATIC_DRAW);

            // cria um buffer para os indicies dos vertices
            const indexBuffer = webGl.createBuffer();
            webGl.bindBuffer(webGl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            webGl.bufferData(webGl.ELEMENT_ARRAY_BUFFER, object.mesh.index, webGl.STATIC_DRAW);
            
            //localiza a posicao na gpu e passa os buffers 
            const vertexPosition = webGl.getAttribLocation(program, "aPosition");
            webGl.vertexAttribPointer(vertexPosition, 3, webGl.FLOAT, false, 3 * Int32Array.BYTES_PER_ELEMENT, 0);
            webGl.enableVertexAttribArray(vertexPosition);

        //#endregion

        //#region GEOMETRY

            //cria uma matriz de translacao para a geometria;
            const geometryTranslation = EngineMatrix4x4.GeometryTranslation(object.transform.position);
            const geometryTranslationLocation = webGl.getUniformLocation(program, "uGeometryTranslation");
            webGl.uniformMatrix4fv(geometryTranslationLocation, false, EngineMatrix4x4.ToArray32(geometryTranslation));

            cout++;
            // cria uma matriz de rotacao para a geometria;
            const geometryRotation = EngineMatrix4x4.GeometryRotationQuaternion(object.transform.rotation);
            const geometryRotationLocation = webGl.getUniformLocation(program, "uGeometryRotation");
            webGl.uniformMatrix4fv(geometryRotationLocation, false, EngineMatrix4x4.ToArray32(geometryRotation));

            // cria uma matriz de escala para a geometria;
            const geometryScale = EngineMatrix4x4.GeometryScale(object.transform.scale);
            const geometryScalePosition = webGl.getUniformLocation(program, "uGeometryScale");
            webGl.uniformMatrix4fv(geometryScalePosition, false, EngineMatrix4x4.ToArray32(geometryScale));

        //#endregion

        //#region  CAMERA

          
        // cria uma matriz de projeção;
        var geometryProjection = EngineMatrix4x4.CameraPerspective(this.camera.fov, this.camera.aspect, this.camera.near, this.camera.far);
        const geometryProjectionPosition = webGl.getUniformLocation(program, "uCameraProjection");
        webGl.uniformMatrix4fv(geometryProjectionPosition , false, EngineMatrix4x4.ToArray32(geometryProjection));


        const eye = new EngineVector3(0, 0, 1);

        const forward = new EngineVector3(0, 0, 1);
        
        const upwards = new EngineVector3(0, 1, 0);

        var geometryView = EngineMatrix4x4.CameraView(eye, forward, upwards);
        const geometryViewPosition =  webGl.getUniformLocation(program, "uCameraView");
        webGl.uniformMatrix4fv(geometryViewPosition , false, EngineMatrix4x4.ToArray32(geometryView));
        
        //cria uma matriz de translacao;
        const geometryCameraTranslation = EngineMatrix4x4.CameraTranslation(this.camera.position);
        const geometryCameraTranslationLocation =  webGl.getUniformLocation(program, "uCameraTranslation");
        webGl.uniformMatrix4fv(geometryCameraTranslationLocation, false, EngineMatrix4x4.ToArray32(geometryCameraTranslation));

        // cria uma matriz de rotacao;
        const geometryCameraRotation = EngineMatrix4x4.CameraRotation(this.camera.rotation);
        const geometryCameraRotationLocation = webGl.getUniformLocation(program, "uCameraRotation");
        webGl.uniformMatrix4fv(geometryCameraRotationLocation, false, EngineMatrix4x4.ToArray32(geometryCameraRotation));

        //#endregion
        
        webGl.drawElements(webGl.LINE_STRIP, object.mesh.index.length, webGl.UNSIGNED_SHORT, 0);
       
      
    }

    /**
     * 
     * @param {WebGLRenderingContext} webGl 
     * @param {WebGLProgram} program 
     * @param {EngineTransform} transform
     * 
     */
    RenderGizmos(webGl, program, transform)
    {   
       const vertexShaderSource = `

        precision highp float;
    
        attribute vec4 aPosition;
    
        void main() 
        {
            gl_Position =  aPosition;
        }
      `;
    
        const fragmentShaderSource = `
    
        precision highp float;
        
        void main() 
        {
            gl_FragColor = vec4(1, 1, 1, 1);
        }
      `;
        
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
        
        //#region SHADERS

            const vertexShader = this. CreateShader(webGl, webGl.VERTEX_SHADER, vertexShaderSource);
            const fragmentShader = this. CreateShader(webGl, webGl.FRAGMENT_SHADER, fragmentShaderSource);
            webGl.attachShader(program, vertexShader);
            webGl.attachShader(program, fragmentShader);
            webGl.linkProgram(program);

        //#endregion

        webGl.useProgram(program);

        //#region BUFFERS
      
            //cria um buffer para os vertices;
            const vertexBuffer = webGl.createBuffer();
            webGl.bindBuffer(webGl.ARRAY_BUFFER, vertexBuffer);
            webGl.bufferData(webGl.ARRAY_BUFFER, gizmosVertex, webGl.STATIC_DRAW);

            // cria um buffer para os indicies dos vertices
            const indexBuffer = webGl.createBuffer();
            webGl.bindBuffer(webGl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            webGl.bufferData(webGl.ELEMENT_ARRAY_BUFFER, gizmosIndex, webGl.STATIC_DRAW);
            
            //localiza a posicao na gpu e passa os buffers 
            const vertexPosition = webGl.getAttribLocation(program, "aPosition");
            webGl.vertexAttribPointer(vertexPosition, 3, webGl.FLOAT, false, 3 * Int32Array.BYTES_PER_ELEMENT, 0);
            webGl.enableVertexAttribArray(vertexPosition);

        //#endregion

        //#region MATRICIES

            //cria uma matriz de translacao para o gizmos;
            const geometryTranslation = EngineMatrix4x4.GeometryTranslation(transform.position);
            const geometryTranslationLocation = webGl.getUniformLocation(program, "uTranslation");
            webGl.uniformMatrix4fv(geometryTranslationLocation, false, EngineMatrix4x4.ToArray32(geometryTranslation));

            // cria uma matriz de rotacao para o gizmos;
            const geometryRotation = EngineMatrix4x4.GeometryRotationQuaternion(transform.rotation);
            const geometryRotationLocation = webGl.getUniformLocation(program, "uRotation");
            webGl.uniformMatrix4fv(geometryRotationLocation, false, EngineMatrix4x4.ToArray32(geometryRotation));

            // cria uma matriz de escala para o gizmos;
            const geometryScale = EngineMatrix4x4.GeometryScale(transform.scale);
            const geometryScalePosition = webGl.getUniformLocation(program, "uScale");
            webGl.uniformMatrix4fv(geometryScalePosition, false, EngineMatrix4x4.ToArray32(geometryScale));

        //#endregion

        webGl.drawElements(webGl.LINES, gizmosIndex.length, webGl.UNSIGNED_SHORT, 0);
       
    }

   
    RenderGrid(webGl, program)
    {   
        const vertexShaderSource = `

        precision highp float;
    
        attribute vec4 aPosition;
    
        void main() 
        {
            gl_Position =  aPosition;
        }
      `;
    
        const fragmentShaderSource = `
    
        precision highp float;
        
        void main() 
        {
            gl_FragColor = vec4(1, 1, 1, 1);
        }
      `;        


        //#region SHADERS

        const vertexShader = this.CreateShader(webGl, webGl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.CreateShader(webGl, webGl.FRAGMENT_SHADER, fragmentShaderSource);
        webGl.attachShader(program, vertexShader);
        webGl.attachShader(program, fragmentShader);
        webGl.linkProgram(program);

    //#endregion

    webGl.useProgram(program);

       // Defina as dimensões do grid
        const gridSize = 10; // tamanho do grid
        const gridSpacing = 0.1; // espaçamento entre as linhas do grid

        // Crie os vértices do grid no plano XZ
        const vertices = [];
        for (let i = -gridSize; i <= gridSize; i += gridSpacing) {
            // Linhas horizontais no plano XZ (Y constante)
            vertices.push(-gridSize, 0, i);
            vertices.push(gridSize, 0, i);
        }

        // Converte os vértices em um Float32Array
        const gridVertices = new Float32Array(vertices);
        // Crie um buffer para os vértices
        const gridVertexBuffer = webGl.createBuffer();
        webGl.bindBuffer(webGl.ARRAY_BUFFER, gridVertexBuffer);
        webGl.bufferData(webGl.ARRAY_BUFFER, gridVertices, webGl.STATIC_DRAW);

        // Localize o atributo aPosition no shader
        const aPosition = webGl.getAttribLocation(program, 'aPosition');
        webGl.enableVertexAttribArray(aPosition);
        webGl.vertexAttribPointer(aPosition, 3, webGl.FLOAT, false, 0, 0);


        
        // Desenhe o grid
        webGl.drawArrays(webGl.LINES, 0, gridVertices.length / 3);
            
    }

    /**
 * 
 * @param {WebGLRenderingContext} webGl 
 * @param {WebGLShader} type 
 * @param {string} source 
 */
    CreateShader(webGl, type, source, program)
    {
        const shader = webGl.createShader(type);
        webGl.shaderSource(shader, source);
        webGl.compileShader(shader);

        if (!webGl.getShaderParameter(shader, webGl.COMPILE_STATUS)) 
        {
            console.error("Shader compilation failed:", webGl.getShaderInfoLog(shader));
            webGl.deleteShader(shader);
            return null;
        }

        return shader;
    }
    //#endregion
}
const engine = new Engine_WebGl();
engine.Loop();
