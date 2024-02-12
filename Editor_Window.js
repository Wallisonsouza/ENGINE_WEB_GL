class EditorWindow
{
    OnInitGizmos()
    {
        var editorCamera = new EditorCamera();
        var gizmos = new EngineGizmos();
    }
    
    OnDrawnGizmos()
    {    
       
        var fov = editorCamera.fov;
        var near = editorCamera.near;
        var far = editorCamera.far;
        var speed = editorCamera.speed;

       
    }
}