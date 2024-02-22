export default class EngineMatFloat
{
    static  get epsilon(){return 1.17549435E-38 === 0 ? 1.17549435E-38 : 1.401298E-45;};
    static get PI(){return Math.PI};

    static DregreesToRadians(degrees)
    {
        return degrees * (Math.PI / 180);
    }

    static GenerateUniqueId() 
    {
        return Date.now().toString() + Math.random().toString(36);
    }
}