
import EngineVector3 from "./ENGINE_MATHEMATICS/Engine_Vector3.js";
import EngineQuaternion from "./ENGINE_MATHEMATICS/Engine_Quaternion.js";
export default class EngineTransform
{
    position;
    rotation;
    scale;

    constructor(position = new EngineVector3(0, 0, 0), rotation = new EngineQuaternion(0, 0, 0, 1), scale = new EngineVector3(1, 1, 1))
    {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}