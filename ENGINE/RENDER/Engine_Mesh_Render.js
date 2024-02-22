import EngineMaterial from "./Engine_Material.js";
import EngineShader from "./Engine_Shader.js";

export default class EngineMeshRender
{
    constructor()
    {
        this.material = new EngineMaterial();
        this.shader = new EngineShader();
    }
}