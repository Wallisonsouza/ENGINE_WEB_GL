
document.addEventListener("DOMContentLoaded", function () 
{
    const engine = new Engine_WEB_GL();
    engine.Init();
    EngineInputs.initialize();
});


class Engine_WEB_GL 
{
    
    file;

    async Init()
    {   
        const canvas = document.getElementById("editor_render_area");
        const file = await recoveryFile();

        const gizmos = new EngineGizmos();
       
        var cout = 0;
        var speed = 0.1;
        var cameraMoveSpeed = 0.01;
        const cameraPosition = new EngineVector3(0, 0, 2);
        const cameraRotation = new EngineVector3(0, 0, 0);
        
        function renderLoop() 
        {
            if (isKeyPressed("w")) 
            {
                cameraPosition.z -= cameraMoveSpeed;
            }
            if (isKeyPressed("a")) 
            {
                cameraPosition.x += cameraMoveSpeed;
            }
            if (isKeyPressed("s")) 
            {
                cameraPosition.z += cameraMoveSpeed;
            }
            if (isKeyPressed("d")) 
            {
                cameraPosition.x -= cameraMoveSpeed;
            }

            if(isMouseKeyPressed(1))
            {
            const mouseDelta = GetMouseDelta();
               cameraRotation.y += mouseDelta[0] * 100;
               cameraRotation.x -= mouseDelta[1] * 100;
            }


            var position = new EngineVector3(0 , 0 , 0);
        
            var rotation = EngineQuaternion.EulerToQuaternion(0, 0, 0);
            var scale = new EngineVector3(1, 1, 1);
            cout = cout + speed;

            const WebGL = Engine_WEB_GL_AUX.RENDERING_GET_WEB_GL_CONTEXT("editor_render_area");
            const vertexShaderSource = Engine_WEB_GL_AUX.SHADER_VERTEX_SOURCE();
            const fragmentShaderSource = Engine_WEB_GL_AUX.SHADER_FRAGMENT_SOURCE();
            const vertexShader = Engine_WEB_GL_AUX.SHADER_CREATE_VERTEX_SHADER(WebGL, vertexShaderSource);
            const fragmentShader = Engine_WEB_GL_AUX.SHADER_CREATE_FRAGMENT_SHADER(WebGL, fragmentShaderSource);
            const program = Engine_WEB_GL_AUX.PROGRAM_CREATE(WebGL, vertexShader, fragmentShader);
            
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            WebGL.useProgram(program);
            WebGL.viewport(0, 0, canvas.width, canvas.height);
            //cria uma cor padrao de fundo
            WebGL.clearColor(0, 0, 0, 1);
            WebGL.clear(WebGL.COLOR_BUFFER_BIT | WebGL.DEPTH_BUFFER_BIT);
           

            // cria a geometria da forma 3d
            const geometry = file[0];
            
            //cria um buffer para os vertices;
            const vertexBuffer = WebGL.createBuffer();
            WebGL.bindBuffer(WebGL.ARRAY_BUFFER, vertexBuffer);
            WebGL.bufferData(WebGL.ARRAY_BUFFER, new Float32Array(geometry.vertex), WebGL.STATIC_DRAW);

            // cria um buffer para os indicies dos vertices
            const indexBuffer = WebGL.createBuffer();
            WebGL.bindBuffer(WebGL.ELEMENT_ARRAY_BUFFER, indexBuffer);
            WebGL.bufferData(WebGL.ELEMENT_ARRAY_BUFFER, new Uint16Array(geometry.vertexIndex), WebGL.STATIC_DRAW);
            
            //localiza a posicao na gpu e passa os buffers 
            const vertexPosition = WebGL.getAttribLocation(program, "aPosition");
            WebGL.vertexAttribPointer(vertexPosition, 3, WebGL.FLOAT, false, geometry.vertex.index, 0);
            WebGL.enableVertexAttribArray(vertexPosition);
            
            //cria uma matriz de translacao;
            const geometryTranslation = EngineMatrix4x4.Matrix_Translation(position);
            const geometryTranslationLocation = WebGL.getUniformLocation(program, "uTranslation");
            WebGL.uniformMatrix4fv(geometryTranslationLocation, false, EngineMatrix4x4.ToArray32(geometryTranslation));

            // cria uma matriz de rotacao;
            const geometryRotation = EngineMatrix4x4.Matrix_Rotation(rotation);
            const geometryRotationLocation = WebGL.getUniformLocation(program, "uRotation");
            WebGL.uniformMatrix4fv(geometryRotationLocation, false, EngineMatrix4x4.ToArray32(geometryRotation));

            // cria uma matriz de escala;
            var geometryScale = EngineMatrix4x4.Matrix_Scale(scale);
            const geometryScalePosition = WebGL.getUniformLocation(program, "uScale");
            WebGL.uniformMatrix4fv(geometryScalePosition, false, EngineMatrix4x4.ToArray32(geometryScale));

            // cria uma matriz de projeção;
            //var geometryProjection = EngineMatrix4x4.Camera_Orthographic(-1, 1, -1, 1, -10, 1000);
            var geometryProjection = EngineMatrix4x4.Camera_Perspective(60, window.innerWidth / window.innerHeight, -1, 1000);
            const geometryProjectionPosition = WebGL.getUniformLocation(program, "uProjection");
            WebGL.uniformMatrix4fv(geometryProjectionPosition , false, EngineMatrix4x4.ToArray32(geometryProjection));

            var geometryView = EngineMatrix4x4.identity;
            const geometryViewPosition = WebGL.getUniformLocation(program, "uView");
            WebGL.uniformMatrix4fv(geometryViewPosition , false, EngineMatrix4x4.ToArray32(geometryView));

            
            //cria uma matriz de translacao;
            const geometryCameraTranslation = EngineMatrix4x4.Matrix_Translation(cameraPosition);
            const geometryCameraTranslationLocation = WebGL.getUniformLocation(program, "uCameraTranslation");
            WebGL.uniformMatrix4fv(geometryCameraTranslationLocation, false, EngineMatrix4x4.ToArray32(geometryCameraTranslation));

            // cria uma matriz de rotacao;
            const geometryCameraRotation = EngineMatrix4x4.Matrix_Rotation(EngineQuaternion.EulerToQuaternion(cameraRotation.x, cameraRotation.y, 0));
            const geometryCameraRotationLocation = WebGL.getUniformLocation(program, "uCameraRotation");
            WebGL.uniformMatrix4fv(geometryCameraRotationLocation, false, EngineMatrix4x4.ToArray32(geometryCameraRotation));

            WebGL.enable(WebGL.DEPTH_TEST);
            WebGL.drawElements(WebGL.LINE_STRIP, geometry.vertexIndex.length, WebGL.UNSIGNED_SHORT, 0);

            gizmos.DrawnGizmos(WebGL);
            gizmos.transform.rotation = EngineQuaternion.EulerToQuaternion(cameraRotation.x, cameraRotation.y, 0);
            gizmos.transform.position = new EngineVector3(0.7, -0.95, 0);
            gizmos.transform.scale = new EngineVector3(0.5, 0.5, 0.5);

            requestAnimationFrame(renderLoop);
            
        }
    
        renderLoop();
    }
}
