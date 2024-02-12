class EngineInputs 
{
    static downEvent;
    static upEvent;
    static pressEvent;
    static click;

    static eventMouseMove;
    static eventMouseUp;
    static eventMouseLeave;
    static eventMouseDown;
    static eventMouseEnter;

    static eventKeyDown;
    static eventKeyUp;

    static keyA = false;
    static keyW = false;
    static keyD = false;
    static keyS = false;

    static currentKey;
    controler = false;
    static initialize() 
    {
        document.addEventListener("mousedown", function (event) 
        {
            EngineInputs.eventMouseDown = event;
        });

        document.addEventListener("mouseup", function (event) 
        {
            EngineInputs.eventMouseUp = event;
        });

        document.addEventListener("mousemove", function (event) 
        {
            EngineInputs.eventMouseMove = event;
        });

        document.addEventListener("mouseleave", function (event) 
        {
            EngineInputs.eventMouseLeave = event;
        });

        document.addEventListener("keydown", function (event) 
        {
            EngineInputs.eventKeyDown = event;
        });

        document.addEventListener("keyup", function (event) 
        {
            EngineInputs.eventKeyUp = event;
        });
    }


    static Update() 
    {
       // Exemplo de uso
      
    }
    
    static GetMouse(axis)
    {
        if(EngineInputs.eventMouseMove)
        {
          
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            switch(axis)
            {
            case "X" : 
                return  (EngineInputs.eventMouseMove.clientX - centerX) / centerX;
            case "Y" : 
                return  (EngineInputs.eventMouseMove.clientY - centerY) / centerY;
            }
        }

        else{
            return 0;
        }
    }

    static  GetKeyDown(key) 
    {
        if (EngineInputs.downEvent && EngineInputs.downEvent.key === key) 
        {
           return true;
        }
    }

    static  GetKeyUp() 
    {
        if (EngineInputs.upEvent && EngineInputs.upEvent.key) 
        {
           return true;
        }
    }
}

// Objeto para rastrear o estado de todas as teclas
const keysState = {};
const mouseKeysState = {};


document.addEventListener("keydown", function(event) 
{
    keysState[event.key] = true; 
});

document.addEventListener("keyup", function(event) 
{
    keysState[event.key] = false; 
});

function isKeyPressed(key) 
{
    return keysState[key] || false; 
}

document.addEventListener("mousedown", function(event) 
{
    mouseKeysState[event.button] = true; 
});

document.addEventListener("mouseup", function(event) 
{
    mouseKeysState[event.button] = false; 
});

function isMouseKeyPressed(key) 
{
    return mouseKeysState[key] || false; 
}

let mouseMoveEvent = null;
document.addEventListener("mousemove", function(event) 
{
   mouseMoveEvent = event;
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
        if(mouseMoveEvent.clientX >= window.innerWidth)
        {
           
        }


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

}




