
import EngineVector3 from "./ENGINE_MATHEMATICS/Engine_Vector3.js";
import EngineQuaternion from "./ENGINE_MATHEMATICS/Engine_Quaternion.js";

export default class EngineCamera
{
   fov = 60.0;
   near = -1;
   far = 10000;
   speed = 0.02;
   aspect = 1;
   position = new EngineVector3(0, 0, 0);
   rotation = new EngineQuaternion(0, 0, 0);
}
