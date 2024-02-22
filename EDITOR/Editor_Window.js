import EngineMatFloat from "../ENGINE/ENGINE_MATHEMATICS/Engine_Mat_Float.js";
import EngineCamera from "../ENGINE/Engine_Camera.js";
import EngineWindowRender from "../ENGINE/RENDER/Editor_Window_Render.js";

export default class EditorWindow extends EngineWindowRender
{
    constructor()
    {
        super();

        this.activateGrid = true;
        this.activateGimos = true;
    }
}

