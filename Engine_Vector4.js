class EngineVector4
{
    x;
    y;
    z;
    w;

    constructor(x, y, z, w)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    ToArray32()
    {
        return new Float32Array([this.x ,this.y, this.z, this.w]);

    }
}
