class EngineMatrix4x4
{
    m00;
    m01;
    m02;
    m03;
    m10;
    m11;
    m12;
    m13;
    m20;
    m21;
    m22;
    m23;
    m30;
    m31;
    m32;
    m33;

    static get zeroMatrix() 
    {
        const result = new EngineMatrix4x4();

        result.m00 = 0;  
        result.m01 = 0;  
        result.m02 = 0;  
        result.m03 = 0;
        result.m10 = 0;  
        result.m11 = 0;  
        result.m12 = 0;  
        result.m13 = 0;
        result.m20 = 0;  
        result.m21 = 0;  
        result.m22 = 0;  
        result.m23 = 0;
        result.m30 = 0;  
        result.m31 = 0;  
        result.m32 = 0;  
        result.m33 = 0;
    
        return result;
    }

    static get  identityMatrix()
    {
        const result = new EngineMatrix4x4();

        result.m00 = 1;  
        result.m01 = 0;  
        result.m02 = 0;  
        result.m03 = 0;
        result.m10 = 0;  
        result.m11 = 1;  
        result.m12 = 0;  
        result.m13 = 0;
        result.m20 = 0;  
        result.m21 = 0;  
        result.m22 = 1;  
        result.m23 = 0;
        result.m30 = 0;  
        result.m31 = 0;  
        result.m32 = 0;  
        result.m33 = 1;
    
        return result;
    }

    static Matrix_Translation(vector)
    {
        const result = new EngineMatrix4x4();
        result.m00 = 1;
        result.m01 = 0;
        result.m02 = 0;
        result.m03 = vector.x;
        result.m10 = 0;
        result.m11 = 1;
        result.m12 = 0;
        result.m13 = vector.y;
        result.m20 = 0;
        result.m21 = 0;
        result.m22 = 1;
        result.m23 = vector.z;
        result.m30 = 0;
        result.m31 = 0;
        result.m32 = 0;
        result.m33 = 1;

        return result;
    }

    static Matrix_Rotation(quaternion) 
    {
        const num00 = quaternion.x * 2;
        const num01 = quaternion.y * 2;
        const num03 = quaternion.z * 2;
        const num04 = quaternion.x * num00;
        const num05 = quaternion.y * num01;
        const num06 = quaternion.z * num03;
        const num07 = quaternion.x * num01;
        const num08 = quaternion.x * num03;
        const num09 = quaternion.y * num03;
        const num10 = quaternion.w * num00;
        const num11 = quaternion.w * num01;
        const num12 = quaternion.w * num03;

        const result = new EngineMatrix4x4();

        result.m00 = 1 - (num05 + num06);
        result.m11 = 1 - (num04 + num06);
        result.m22 = 1 - (num04 + num05);

        result.m01 = num07 - num12;
        result.m02 = num08 + num11;
        result.m10 = num07 + num12;
        result.m12 = num09 - num10;
        result.m20 = num08 - num11;
        result.m21 = num09 + num10;
       
        result.m03 = 0;
        result.m13 = 0;
        result.m23 = 0;
        result.m30 = 0;
        result.m31 = 0;
        result.m32 = 0;
        result.m33 = 1;

        return result;
    }

    static Matrix_Scale(vector)
    {
        const result = new EngineMatrix4x4();

        result.m00 = vector.x;
        result.m01 = 0;
        result.m02 = 0;
        result.m03 = 0;
        result.m10 = 0;
        result.m11 = vector.y;
        result.m12 = 0;
        result.m13 = 0;
        result.m20 = 0;
        result.m21 = 0;
        result.m22 = vector.z;
        result.m23 = 0;
        result.m30 = 0;
        result.m31 = 0;
        result.m32 = 0;
        result.m33 = 1;

        return result;
    }
   
    static Matrix_TRS(position, rotation, scale)
    {
        const T = EngineMatrix4x4.Matrix_Translation(position);
        const R = EngineMatrix4x4.Matrix_Rotation(rotation);
        const S = EngineMatrix4x4.Matrix_Scale(scale);

        let result = new EngineMatrix4x4();
        result =  EngineMatrix4x4.Multiply(T, R);
        result =  EngineMatrix4x4.Multiply(result, S);

        return result;
    }

    static Cam_Orthographic(left, right, bottom, top, zNear, zFar) 
    {
        const result = new EngineMatrix4x4();

        result.m00 = 2 / (right - left);
        result.m01 = 0;
        result.m02 = 0;
        result.m03 = -(right + left) / (right - left);

        result.m10 = 0;
        result.m11 = 2 / (top - bottom);
        result.m12 = 0;
        result.m13 = -(top + bottom) / (top - bottom);

        result.m20 = 0;
        result.m21 = 0;
        result.m22 = -(2 / (zFar - zNear));
        result.m23 = -(zFar + zNear) / (zFar - zNear);

        result.m30 = 0;
        result.m31 = 0;
        result.m32 = 0;
        result.m33 = 1;

        return result;
    }

    static Cam_Perspective(fov, aspect, zNear, zFar)
    {
        const result = new EngineMatrix4x4();
        const tanHalfFov = Math.tan(fov * 0.5);

        result.m00 = 1 / (aspect * tanHalfFov);
        result.m01 = 0;
        result.m02 = 0;
        result.m03 = 0;

        result.m10 = 0;
        result.m11 = 1 / tanHalfFov;
        result.m12 = 0;
        result.m13 = 0;

        result.m20 = 0;
        result.m21 = 0;
        result.m22 = -(zFar + zNear) / (zFar - zNear);
        result.m23 = -(2 * zFar * zNear) / (zFar - zNear);

        result.m30 = 0;
        result.m31 = 0;
        result.m32 = -1;
        result.m33 = 0;

        return result;
    }

    static Matrix_Cam_Position(vector)
    {   
        result =  new EngineMatrix4x4();

        result.m00 = 1;
        result.m01 = 0;
        result.m02 = 0;
        result.m03 = -vector.x;
        result.m10 = 0;
        result.m11 = 1;
        result.m12 = 0;
        result.m13 = -vector.y;
        result.m20 = 0;
        result.m21 = 0;
        result.m22 = 1;
        result.m23 = -vector.z;
        result.m30 = 0;
        result.m31 = 0;
        result.m32 = 0;
        result.m33 = 1;

       return result;
    }

    static Multiply(lhs, rhs)
    {
        const result = new EngineMatrix4x4();

        result.m00 = lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10 + lhs.m02 * rhs.m20 + lhs.m03 * rhs.m30;
        result.m01 = lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11 + lhs.m02 * rhs.m21 + lhs.m03 * rhs.m31;
        result.m02 = lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02 * rhs.m22 + lhs.m03 * rhs.m32;
        result.m03 = lhs.m00 * rhs.m03 + lhs.m01 * rhs.m13 + lhs.m02 * rhs.m23 + lhs.m03 * rhs.m33;

        result.m10 = lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10 + lhs.m12 * rhs.m20 + lhs.m13 * rhs.m30;
        result.m11 = lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11 + lhs.m12 * rhs.m21 + lhs.m13 * rhs.m31;
        result.m12 = lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12 * rhs.m22 + lhs.m13 * rhs.m32;
        result.m13 = lhs.m10 * rhs.m03 + lhs.m11 * rhs.m13 + lhs.m12 * rhs.m23 + lhs.m13 * rhs.m33;

        result.m20 = lhs.m20 * rhs.m00 + lhs.m21 * rhs.m10 + lhs.m22 * rhs.m20 + lhs.m23 * rhs.m30;
        result.m21 = lhs.m20 * rhs.m01 + lhs.m21 * rhs.m11 + lhs.m22 * rhs.m21 + lhs.m23 * rhs.m31;
        result.m22 = lhs.m20 * rhs.m02 + lhs.m21 * rhs.m12 + lhs.m22 * rhs.m22 + lhs.m23 * rhs.m32;
        result.m23 = lhs.m20 * rhs.m03 + lhs.m21 * rhs.m13 + lhs.m22 * rhs.m23 + lhs.m23 * rhs.m33;

        result.m30 = lhs.m30 * rhs.m00 + lhs.m31 * rhs.m10 + lhs.m32 * rhs.m20 + lhs.m33 * rhs.m30;
        result.m31 = lhs.m30 * rhs.m01 + lhs.m31 * rhs.m11 + lhs.m32 * rhs.m21 + lhs.m33 * rhs.m31;
        result.m32 = lhs.m30 * rhs.m02 + lhs.m31 * rhs.m12 + lhs.m32 * rhs.m22 + lhs.m33 * rhs.m32;
        result.m33 = lhs.m30 * rhs.m03 + lhs.m31 * rhs.m13 + lhs.m32 * rhs.m23 + lhs.m33 * rhs.m33;

        return result;
    }

    /**
    * Multiplica uma EngineMatrix4x4 por um EngineVector4;
    * @param {EngineMatrix4x4} lhs Multiplicando EngineMatrix4x4;
    * @param {EngineVector4} vector Multiplicador EngineVector4;
    * @returns {EngineVector4} Vetor resultante;
    */
    static MultiplyVector4(lhs, vector)
    {
        result =  new EngineVector4();

        result.x = lhs.m00 * vector.x + lhs.m01 * vector.y + lhs.m02 * vector.z + lhs.m03 * vector.w;
        result.y = lhs.m10 * vector.x + lhs.m11 * vector.y + lhs.m12 * vector.z + lhs.m13 * vector.w;
        result.z = lhs.m20 * vector.x + lhs.m21 * vector.y + lhs.m22 * vector.z + lhs.m23 * vector.w;
        result.w = lhs.m30 * vector.x + lhs.m31 * vector.y + lhs.m32 * vector.z + lhs.m33 * vector.w;

        return result;
    }

    static Cam_LookAt(eye, target, up)
    {
        //const F = 
        //const R = 
        //const U = 
    }


    //#region Testados

        /**
        * Transforma uma EngineMatrix4x4 em um array de 32bits.
        * @param {EngineMatrix4x4} m A EngineMatrix4x4 a ser transformada.
        * @returns {Array} um array 32bits da EngineMatrix4x4.
        */
        static ToArray32(m)
        {
            return new Float32Array([
    
                m.m00, m.m01, m.m02, m.m03,
                m.m10, m.m11, m.m12, m.m13,
                m.m20, m.m21, m.m22, m.m23,
                m.m30, m.m31, m.m32, m.m33
    
            ]);
        }
    
        /**
        * Transforma uma EngineMatrix4x4 em um array de 64bits.
        * @param {EngineMatrix4x4} m A EngineMatrix4x4 a ser transformada.
        * @returns {Array} um array 64bits da EngineMatrix4x4.
        */
        static ToArray64(m)
        {
            return new Float64Array([
    
                m.m00, m.m01, m.m02, m.m03,
                m.m10, m.m11, m.m12, m.m13,
                m.m20, m.m21, m.m22, m.m23,
                m.m30, m.m31, m.m32, m.m33
    
            ]);
        }

    //#endregion
   
}
