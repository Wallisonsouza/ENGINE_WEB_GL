class EngineQuaternion
{
    x;
    y;
    z;
    w;

    identity ;

    constructor(x, y, z, w)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    static EulerToQuaternion(roll, pitch, yaw) 
    {
        const pitchRad = EngineMatFloat.DregreesToRadians(pitch) / 2; 
        const yawRad = EngineMatFloat.DregreesToRadians(yaw) / 2; 
        const rollRad = EngineMatFloat.DregreesToRadians(roll) / 2; 
    
        const sinPitch = Math.sin(pitchRad);
        const cosPitch = Math.cos(pitchRad);
        const sinYaw = Math.sin(yawRad);
        const cosYaw = Math.cos(yawRad);
        const sinRoll = Math.sin(rollRad);
        const cosRoll = Math.cos(rollRad);
    
        const x = sinRoll * cosPitch * cosYaw - cosRoll * sinPitch * sinYaw;
        const y = cosRoll * sinPitch * cosYaw + sinRoll * cosPitch * sinYaw;
        const z = cosRoll * cosPitch * sinYaw - sinRoll * sinPitch * cosYaw;
        const w = cosRoll * cosPitch * cosYaw + sinRoll * sinPitch * sinYaw;
    
        const result = new EngineQuaternion(x, y, z, w);
        return  EngineQuaternion.Normalize(result);
    }
   
    static Multiply(lhs, rhs)
    {
        return new EngineQuaternion
        (

            lhs.w * rhs.x + lhs.x * rhs.w + lhs.y * rhs.z - lhs.z * rhs.y, 
            lhs.w * rhs.y + lhs.y * rhs.w + lhs.z * rhs.x - lhs.x * rhs.z, 
            lhs.w * rhs.z + lhs.z * rhs.w + lhs.x * rhs.y - lhs.y * rhs.x, 
            lhs.w * rhs.w - lhs.x * rhs.x - lhs.y * rhs.y - lhs.z * rhs.z
            
        );
    }

    static Internal_MakePositive(euler)
    {
        const num = -0.005729578;
        const num2 = 360 + num;
        if (euler.x < num)
        {
            euler.x += 360;
        }
        else if (euler.x > num2)
        {
            euler.x -= 360;
        }
   
        if (euler.y < num)
        {
            euler.y += 360;
        }
        else if (euler.y > num2)
        {
            euler.y -= 360;
        }
   
        if (euler.z < num)
        {
            euler.z += 360;
        }
        else if (euler.z > num2)
        {
            euler.z -= 360;
        }
   
        return euler;
    }

    static Normalize(q)
    {
        const num = Math.sqrt(this.Dot(q, q));

        if (num < EngineMatFloat.epsilon)
        {
            return identity;
        }
   
        return new EngineQuaternion(q.x / num, q.y / num, q.z / num, q.w / num);
    }

    static Dot(a, b)
    {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }
 

    
}