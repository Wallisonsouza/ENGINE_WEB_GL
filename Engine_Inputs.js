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