
document.addEventListener("DOMContentLoaded", function () {
    const engine = new Engine_WEB_GL();
    engine.Init();
    EngineInputs.initialize();
});

class EngineInputs 
{
    static downEvent;
    static upEvent;
    static pressEvent;

    static initialize() 
    {
        document.addEventListener("keydown", function (event) 
        {
            EngineInputs.downEvent = event;

        });

        document.addEventListener("keyup", function (event) 
        {
            EngineInputs.upEvent = event;
            EngineInputs.downEvent = null;

        });

        document.addEventListener("keypress", function (event) 
        {
            EngineInputs.pressEvent = event;

        });
    }

    static GetKeyDown(key) 
    {
        if (EngineInputs.downEvent) 
        {
            return EngineInputs.downEvent.key === key;
        }

        return false;
    }

    static GetKeyUp(key)
    {
        if(EngineInputs.upEvent)
        {
            return EngineInputs.upEvent.key === key;
        }
    }

    static GetKey(key)
    {
        if(EngineInputs.pressEvent)
        {
            return EngineInputs.pressEvent.key === key;
        }
    }
}

class EngineCamera
{
    static near = 0.1;
    static far = 1000;
    static size = 10;
}

class Engine_WEB_GL 
{
    Init()
    {
      
        var gizmos = new EngineGizmos();
        var cout = 0;
        var speed = 0.01;
       
        if(EngineInputs.GetKeyDown("d"))
        {
            position.x = position.x + speed;
        }

        if(EngineInputs.GetKeyDown("a"))
        {
            position.x = position.x - speed;
        }

        if(EngineInputs.GetKeyDown("w"))
        {
            position.y = position.y + speed;
        }

        if(EngineInputs.GetKeyDown("s"))
        {
            position.y = position.y - speed;
        }
     
        function renderLoop() 
        {

            var position = new EngineVector3(0.2, 0, 0);

          
            var rotation = EngineQuaternion.EulerToQuaternion(cout, cout, 0);
            var scale = new EngineVector3(0.1, 0.5, 0.5);
            cout = cout + 0.3;

            const WebGL = Engine_WEB_GL_AUX.RENDERING_GET_WEB_GL_CONTEXT("renderArea");
            const vertexShaderSource = Engine_WEB_GL_AUX.SHADER_VERTEX_SOURCE();
            const fragmentShaderSource = Engine_WEB_GL_AUX.SHADER_FRAGMENT_SOURCE();
            const vertexShader = Engine_WEB_GL_AUX.SHADER_CREATE_VERTEX_SHADER(WebGL, vertexShaderSource);
            const fragmentShader = Engine_WEB_GL_AUX.SHADER_CREATE_FRAGMENT_SHADER(WebGL, fragmentShaderSource);
            const program = Engine_WEB_GL_AUX.PROGRAM_CREATE(WebGL, vertexShader, fragmentShader);

            WebGL.useProgram(program);

            WebGL.clearColor(0.2, 0.5, 0.5, 1.0);
            WebGL.clear(WebGL.COLOR_BUFFER_BIT | WebGL.DEPTH_BUFFER_BIT);

            // cria a geometria da forma 3d
            const geometry = EnginePrimitiveShapes3D.GetForm("cube")
            
            //cria um buffer para os vertices;
            const vertexBuffer = WebGL.createBuffer();
            WebGL.bindBuffer(WebGL.ARRAY_BUFFER, vertexBuffer);
            WebGL.bufferData(WebGL.ARRAY_BUFFER, new Float32Array(geometry.vertex), WebGL.STATIC_DRAW);

            // cria um buffer para os indicies dos vertices
            const indexBuffer = WebGL.createBuffer();
            WebGL.bindBuffer(WebGL.ELEMENT_ARRAY_BUFFER, indexBuffer);
            WebGL.bufferData(WebGL.ELEMENT_ARRAY_BUFFER, new Uint16Array(geometry.index), WebGL.STATIC_DRAW);

            const a_matrix_vextex_position = WebGL.getAttribLocation(program, "a_vertexPosition");
            WebGL.vertexAttribPointer(a_matrix_vextex_position, 3, WebGL.FLOAT, WebGL.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
            WebGL.enableVertexAttribArray(a_matrix_vextex_position);

            var aspecRatio = window.innerWidth /  window.innerHeight;
            var camSizeRight = EngineCamera.size * aspecRatio / 2.0;
            var camSizeLeft = -camSizeRight;
            var camSizeTop = EngineCamera.size / 2;
            var camSizeBottom = -camSizeTop;

            // cria uma matriz de projecao;
            var projectionMatrix = EngineMatrix4x4.Cam_Orthographic(camSizeLeft, camSizeRight, camSizeTop, camSizeBottom, EngineCamera.near, EngineCamera.far);
            const u_matrix_projection = WebGL.getUniformLocation(program, "u_projection");
            WebGL.uniformMatrix4fv(u_matrix_projection, false, EngineMatrix4x4.ToArray32(projectionMatrix));

            //cria uma matriz de posicao;
            const translationMatrix = EngineMatrix4x4.Matrix_Translation(position);
            const u_matrix_translation = WebGL.getUniformLocation(program, "u_translation");
            WebGL.uniformMatrix4fv(u_matrix_translation, false, EngineMatrix4x4.ToArray32(translationMatrix));

            // cria uma matriz de rotacao;
            const rotationMatrix = EngineMatrix4x4.Matrix_Rotation(rotation);
            const u_matrix_rotation = WebGL.getUniformLocation(program, "u_rotation");
            WebGL.uniformMatrix4fv(u_matrix_rotation, false, EngineMatrix4x4.ToArray32(rotationMatrix));

            // cria uma matriz de escala;
            var scaleMatrix = EngineMatrix4x4.Matrix_Scale(scale);
            const u_matrix_scale = WebGL.getUniformLocation(program, "u_scale");
            WebGL.uniformMatrix4fv(u_matrix_scale, false, EngineMatrix4x4.ToArray32(scaleMatrix));


            

            //limpa o bufer apos desenhar vertices
            //WebGL.bindBuffer(WebGL.ARRAY_BUFFER, null);


            // Crie um único buffer para armazenar as cores e as cores de sombras
            //const colorBuffer = WebGL.createBuffer();
            //WebGL.bindBuffer(WebGL.ARRAY_BUFFER, colorBuffer);
            //WebGL.bufferData(WebGL.ARRAY_BUFFER, new Float32Array(geometry.vertexColor), WebGL.STATIC_DRAW);

            // Atributo para cores
            //const colorAtribute = WebGL.getAttribLocation(program, "a_color");
            //WebGL.vertexAttribPointer(colorAtribute, 3, WebGL.FLOAT, WebGL.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
           // WebGL.enableVertexAttribArray(colorAtribute);

            // Atributo para cores de sombra
            //const shadowColorAtribute = WebGL.getAttribLocation(program, "a_shadowColor");
            //WebGL.vertexAttribPointer(shadowColorAtribute, 3, WebGL.FLOAT, WebGL.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, form3d.vertexColor.length * Float32Array.BYTES_PER_ELEMENT);
            //WebGL.enableVertexAttribArray(shadowColorAtribute);
                    


            
            //WebGL.enable(WebGL.CULL_FACE);
           // WebGL.cullFace(WebGL.BACK);

            WebGL.drawElements(WebGL.LINE_LOOP, geometry.index.length, WebGL.UNSIGNED_SHORT, 0);
            gizmos.DrawnGizmos(WebGL);
            gizmos.transform.position = position;
            gizmos.transform.rotation = rotation;
            gizmos.transform.scale = scale;


            requestAnimationFrame(renderLoop);
        }

        renderLoop();
    }
}
