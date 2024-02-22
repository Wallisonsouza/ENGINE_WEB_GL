
export default class EngineInputs 
{
    static keysState = {};
    static mouseButtonsState = {};
    static mouseX = 0;
    static mouseY = 0;
    constructor() 
    {
        document.addEventListener("keydown", (event) => 
        {
            console.log("Tecla pressionada:", event.key);
            EngineInputs.keysState[event.key] = true;
        });
        
        document.addEventListener("keyup", (event) => 
        {
            console.log("Tecla solta:", event.key);
            EngineInputs.keysState[event.key] = false;
        });

        document.addEventListener("mousedown", (event) => 
        {
           
            EngineInputs.mouseButtonsState[event.button] = true;
        });
        
        document.addEventListener("mouseup", (event) => 
        {
           
            EngineInputs.mouseButtonsState[event.button] = false;
        });

    }

    static GetKey(key)
    {
        return EngineInputs.keysState[key] || false;
    }

    static GetMouseButton(button)
    {
        return EngineInputs.mouseButtonsState[button] || false;
    }
}   

const inputs = new EngineInputs();


/*let mouseMoveEvent;
let mouseDraEvent;

document.addEventListener("keydown", function(event) 
{
    keysState[event.key] = true; 
});
    
document.addEventListener("keyup", function(event) 
{
   keysState[event.key] = false; 
});

document.addEventListener("mousedown", function(event) 
{
   mouseKeysState[event.button] = true; 
});

document.addEventListener("mouseup", function(event) 
{
   mouseKeysState[event.button] = false; 
});




function MouseDefaultPosition()
{
    if(mouseMoveEvent === null || mouseMoveEvent === undefined)
    {
        return [0, 0]
    }

    else
    {
        return [mouseMoveEvent.clientX, mouseMoveEvent.clientY];
    }
}

let prevMouseX = null;
let prevMouseY = null;

function GetMouseDelta() 
{
    if (mouseMoveEvent === null || mouseMoveEvent === undefined) 
    {
        return [0, 0];
    } 
    
    else 
    {

        const currentMouseX = (mouseMoveEvent.clientX / (window.innerWidth / 2)) - 1;
        const currentMouseY = -((mouseMoveEvent.clientY / (window.innerHeight / 2)) - 1);

        let deltaX = 0;
        let deltaY = 0;

        if (prevMouseX !== null && prevMouseY !== null) 
        {
            deltaX = currentMouseX - prevMouseX;
            deltaY = currentMouseY - prevMouseY;
        }

        prevMouseX = currentMouseX;
        prevMouseY = currentMouseY;

        return [deltaX, deltaY];
    }

}*/
