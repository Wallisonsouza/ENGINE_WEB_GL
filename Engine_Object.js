class EngineObject {
    componentCounter = 0;
    components = {};

    constructor() 
    {
        this.AddComponent(EngineTransform);
      
    }

    AddComponent(componentClass) 
    {
        const componentInstance = new componentClass();
        const componentId = this.getNextComponentId();
        this.components[componentId] = componentInstance;
        return componentId;
    }

    RemoveComponent(componentId) 
    {
        if (this.components[componentId]) 
        {
            delete this.components[componentId];
        }
    }

    getNextComponentId() 
    {
        return Date.now().toString() + Math.random().toString(36);
    }
}