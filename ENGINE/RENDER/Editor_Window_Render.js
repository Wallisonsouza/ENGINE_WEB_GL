import EngineCamera from "../Engine_Camera.js";
import EngineMatFloat from "../ENGINE_MATHEMATICS/Engine_Mat_Float.js";
import EngineVector2 from "../ENGINE_MATHEMATICS/Engine_Vector2.js";

export default class EngineWindowRender
{
    constructor()
    {  
        this.renderArea = document.createElement("canvas");
        this.renderingContext = this.renderArea.getContext("webgl");
        this.mousePosition = new EngineVector2();
        this.deltaMouse = new EngineVector2();

        let prevMouseX = 0;
        let prevMouseY = 0;

        this.renderArea.addEventListener("mousemove", (event) =>
        {
            this.mousePosition.x = (event.offsetX  / this.renderArea.clientWidth) * 2 -1;
            this.mousePosition.y = -((event.offsetY  / this.renderArea.clientHeight) * 2 -1);


            let deltaX = 0;
            let deltaY = 0;

            if (prevMouseX !== null && prevMouseY !== null) 
            {
                deltaX =  this.mousePosition.x - prevMouseX;
                deltaY = this.mousePosition.y - prevMouseY;
            }

            prevMouseX =  this.mousePosition.x;
            prevMouseY = this.mousePosition.y;

            this.deltaMouse = new EngineVector2(deltaX, deltaY);

        });

      

      
        //const windowContainer = document.createElement("div");
        //const topBar = document.createElement("div");

        //windowContainer.append(topBar);
        //windowContainer.append(this.renderArea);
        //document.body.append(windowContainer);

        document.body.append(this.renderArea);

        //windowContainer.style.margin = "1px"
      

        //topBar.style.width = "100%";
        //topBar.style.height = "24px";
       // topBar.style.backgroundColor = "white";

        this.renderArea.style.width = "500px";
        this.renderArea.style.height = "500px";
        this.renderArea.style.backgroundColor = "black";
    }
}