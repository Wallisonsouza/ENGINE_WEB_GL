class EngineVector3
{
    x;
    y;
    z;

    constructor(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static Subtract(a, b)
    {
        return new EngineVector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }
    
    static Cross(lhs, rhs)
    {
        return new EngineVector3(lhs.y * rhs.z - lhs.z * rhs.y, lhs.z * rhs.x - lhs.x * rhs.z, lhs.x * rhs.y - lhs.y * rhs.x);
    }
    
    static Normalize(value)
    {
        let num = Magnitude(value);
        let result = new EngineVector3();
    
        if (num > 1E-05)
        {
            result.x = value.x / num;
            result.y = value.y / num;
            result.z = value.z / num;
    
            return result;
        }
    
        return new EngineVector3(0, 0, 0);
    }
    
    static Magnitude(vector)
    {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    }
}