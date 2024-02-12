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

    static get zero() 
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

    static get  identity()
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
        result.m03 = 0;
        result.m10 = 0;
        result.m11 = 1;
        result.m12 = 0;
        result.m13 = 0;
        result.m20 = 0;
        result.m21 = 0;
        result.m22 = 1;
        result.m23 = 0;
        result.m30 = vector.x;
        result.m31 = vector.y;
        result.m32 = vector.z;
        result.m33 = 1;

        return result;
    }

    /* static Matrix_Translation(vector)
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
        result.m23 =  vector.z;
        result.m30 = 0;
        result.m31 = 0;
        result.m32 = 0;
        result.m33 = 1;

        return result;
    }*/


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
        result.m01 = num07 - num12;
        result.m02 = num08 + num11;
        result.m03 = 0;
        result.m10 = num07 + num12;
        result.m11 = 1 - (num04 + num06);
        result.m12 = num09 - num10;
        result.m13 = 0;
        result.m20 = num08 - num11;
        result.m21 = num09 + num10;
        result.m22 = 1 - (num04 + num05);
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

        const SR =  EngineMatrix4x4.Multiply(S, R);
        const SRT = EngineMatrix4x4.Multiply(SR, T);

        return SRT;
    }

    static Matrix_MVP(model, view, projection)
    {
        //mvp

        const PV = EngineMatrix4x4.Multiply(model, EngineMatrix4x4.identityMatrix);
        const MVP = EngineMatrix4x4.Multiply(PV, projection);
        return MVP
    }

    static Camera_Orthographic(left, right, bottom, top, zNear, zFar) 
    {
        const result = new EngineMatrix4x4();

        result.m00 = 2.0 / (right - left);
        result.m01 = 0;  
        result.m02 = 0;  
        result.m03 = 0;
        result.m11 = 2.0 / (top - bottom);
        result.m22 = -2.0 / (zFar - zNear);
        result.m30 = -(right + left) /  (right - left);
        result.m31 = -(top + bottom) / (top - bottom);
        result.m32 = -(zFar + zNear) / (zFar -zNear);

        result.m13 = 0;
        result.m01 = 0;
        result.m02 = 0;
        result.m10 = 0;
        result.m12 = 0;
        result.m20 = 0;
        result.m21 = 0;
        result.m23 = 0;
        result.m33 = 1;

        return result;
    }

    /*static Camera_Orthographic(left, right, bottom, top, zNear, zFar) 
    {
        const result = new EngineMatrix4x4();

        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (zNear - zFar);
      
        result.m00 = -2 * lr;  
        result.m01 = 0;  
        result.m02 = 0;  
        result.m03 = 0;
        result.m10 = 0;  
        result.m11 = -2 * bt;  
        result.m12 = 0;  
        result.m13 = 0;
        result.m20 = 0;  
        result.m21 = 0;  
        result.m22 = 2 * nf;  
        result.m23 = 0;
        result.m30 = (left + right) * lr;  
        result.m31 = (top + bottom) * bt;  
        result.m32 = (zFar + zNear) * nf;  
        result.m33 = 1;

        return result;
    }*/

    /**
    * Gera uma matriz de perspectiva, com os dados forecidos;
    * @param {number} newFov Campo de visão em graus;
    * @param {number} aspect Relação entre largura e autura da tela;
    * @param {number} zNear Plano frontal, mais próximo da camera;
    * @param {number} zFar Plano traseiro, mais distante da camera;
    * @returns {EngineMatrix4x4} matriz gerada apos os calculos;
    */
    static Camera_Perspective(fov, aspect, zNear, zFar)
    {
        const result = new EngineMatrix4x4();
        const newFov = EngineMatFloat.DregreesToRadians(fov);
        const tanHalfFov = Math.tan(newFov / 2);

       

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
        result.m22 = (zFar + zNear) / (zFar - zNear);
        result.m23 = (-2 * zFar * zNear) / (zFar - zNear);

        result.m30 = 0;
        result.m31 = 0;
        result.m32 = -1;
        result.m33 = 0;

        return result;
    }

    static Camera_View(eye, up, right, foward)
    {   
        const result =  new EngineMatrix4x4();

        result.m00 = right.x;
        result.m01 = up.x;
        result.m02 = -foward.x;
        result.m03 = 0;
        result.m10 = right.y;
        result.m11 = up.y;
        result.m12 = -foward.y;
        result.m13 = 0;
        result.m20 = right.z;
        result.m21 = up.z;
        result.m22 = -foward.z;
        result.m23 = 0;
        result.m30 = -EngineVector3.Dot(right, eye);
        result.m31 = -EngineVector3.Dot(up, eye);
        result.m32 = EngineVector3.Dot(foward, eye);;
        result.m33 = 1;

       return result;
    }

    static Camera_Translation(vector)
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
        result.m30 = vector.x;
        result.m31 = vector.y;
        result.m32 = vector.z;
        result.m33 = 1;

        return result;
    }

    static Camera_Rotation(quaternion) 
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
        result.m01 = num07 - num12;
        result.m02 = num08 + num11;
        result.m03 = 0;
        result.m10 = num07 + num12;
        result.m11 = 1 - (num04 + num06);
        result.m12 = num09 - num10;
        result.m13 = 0;
        result.m20 = num08 - num11;
        result.m21 = num09 + num10;
        result.m22 = 1 - (num04 + num05);
        result.m23 = 0;
        result.m30 = 0;
        result.m31 = 0;
        result.m32 = 0;
        result.m33 = 1;
       
        return result;
    }
    
    /**
    * .
    * @param {EngineVector3} eye Posição da camera no espaço 3d.
    * @param {EngineVector3} center Ponto para o qual a camera esta olhando.
    * @param {EngineVector3} up  Direcao para cima no espaço 3d.
    * @returns {EngineMatrix4x4} Uma matriz 4x4 lookat
    */
    static Camera_LookAt(eye, center, up)
    {
        const result = new EngineMatrix4x4();

        const zAxis = EngineVector3.Subtract(eye, center);
        const zAxisNormalized = EngineVector3.Normalize(zAxis);

        const xAxis = EngineVector3.Cross(up, zAxisNormalized);
        const xAxisNormalized = EngineVector3.Normalize(xAxis);

        const yAxis = EngineVector3.Cross(zAxisNormalized, xAxisNormalized);
        const yAxisNormalized = EngineVector3.Normalize(yAxis);

        result.m00 = xAxisNormalized.x;  
        result.m01 = yAxisNormalized.x;  
        result.m02 = zAxisNormalized.x;  
        result.m03 = 0;
        result.m10 = xAxisNormalized.y;  
        result.m11 = yAxisNormalized.y;  
        result.m12 = zAxisNormalized.y;  
        result.m13 = 0;
        result.m20 = xAxisNormalized.z;  
        result.m21 = yAxisNormalized.z;  
        result.m22 = zAxisNormalized.z;  
        result.m23 = 0;
        result.m30 = -EngineVector3.Dot(xAxisNormalized, center);  
        result.m31 = -EngineVector3.Dot(yAxisNormalized, center);  
        result.m32 = -EngineVector3.Dot(zAxisNormalized, center);  
        result.m33 = -1;

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
        const result =  new EngineVector4();

        result.x = lhs.m00 * vector.x + lhs.m01 * vector.y + lhs.m02 * vector.z + lhs.m03 * vector.w;
        result.y = lhs.m10 * vector.x + lhs.m11 * vector.y + lhs.m12 * vector.z + lhs.m13 * vector.w;
        result.z = lhs.m20 * vector.x + lhs.m21 * vector.y + lhs.m22 * vector.z + lhs.m23 * vector.w;
        result.w = lhs.m30 * vector.x + lhs.m31 * vector.y + lhs.m32 * vector.z + lhs.m33 * vector.w;

        return result;
    }

    static Inverse(m)
    {
        const det =
        m.m00 * (m.m11 * (m.m22 * m.m33 - m.m23 * m.m32) - m.m12 * (m.m21 * m.m33 - m.m23 * m.m31) + m.m13 * (m.m21 * m.m32 - m.m22 * m.m31)) -
        m.m01 * (m.m10 * (m.m22 * m.m33 - m.m23 * m.m32) - m.m12 * (m.m20 * m.m33 - m.m23 * m.m30) + m.m13 * (m.m20 * m.m32 - m.m22 * m.m30)) +
        m.m02 * (m.m10 * (m.m21 * m.m33 - m.m23 * m.m31) - m.m11 * (m.m20 * m.m33 - m.m23 * m.m30) + m.m13 * (m.m20 * m.m31 - m.m21 * m.m30)) -
        m.m03 * (m.m10 * (m.m21 * m.m32 - m.m22 * m.m31) - m.m11 * (m.m20 * m.m32 - m.m22 * m.m30) + m.m12 * (m.m20 * m.m31 - m.m21 * m.m30));

        if (det === 0) 
        {
            console.error("A matriz não é inversível!");
            return null;
        }

        const invDet = 1 / det;
        const result = new EngineMatrix4x4();

        result.m00 = (m.m11 * (m.m22 * m.m33 - m.m23 * m.m32) - m.m12 * (m.m21 * m.m33 - m.m23 * m.m31) + m.m13 * (m.m21 * m.m32 - m.m22 * m.m31)) * invDet;
        result.m01 = (m.m01 * (m.m23 * m.m32 - m.m22 * m.m33) - m.m02 * (m.m23 * m.m31 - m.m21 * m.m33) + m.m03 * (m.m22 * m.m31 - m.m21 * m.m32)) * invDet;
        result.m02 = (m.m01 * (m.m12 * m.m33 - m.m13 * m.m32) - m.m02 * (m.m11 * m.m33 - m.m13 * m.m31) + m.m03 * (m.m11 * m.m32 - m.m12 * m.m31)) * invDet;
        result.m03 = (m.m01 * (m.m13 * m.m22 - m.m12 * m.m23) - m.m02 * (m.m13 * m.m21 - m.m11 * m.m23) + m.m03 * (m.m12 * m.m21 - m.m11 * m.m22)) * invDet;
        result.m10 = (m.m10 * (m.m23 * m.m32 - m.m22 * m.m33) - m.m12 * (m.m20 * m.m33 - m.m23 * m.m30) + m.m13 * (m.m20 * m.m32 - m.m22 * m.m30)) * invDet;
        result.m11 = (m.m00 * (m.m22 * m.m33 - m.m23 * m.m32) - m.m02 * (m.m20 * m.m33 - m.m23 * m.m30) + m.m03 * (m.m20 * m.m32 - m.m22 * m.m30)) * invDet;
        result.m12 = (m.m00 * (m.m13 * m.m32 - m.m12 * m.m33) - m.m02 * (m.m10 * m.m33 - m.m13 * m.m30) + m.m03 * (m.m10 * m.m32 - m.m12 * m.m30)) * invDet;
        result.m13 = (m.m00 * (m.m12 * m.m23 - m.m13 * m.m22) - m.m02 * (m.m10 * m.m23 - m.m13 * m.m20) + m.m03 * (m.m10 * m.m22 - m.m12 * m.m20)) * invDet;
        result.m20 = (m.m10 * (m.m21 * m.m33 - m.m23 * m.m31) - m.m11 * (m.m20 * m.m33 - m.m23 * m.m30) + m.m13 * (m.m20 * m.m31 - m.m21 * m.m30)) * invDet;
        result.m21 = (m.m00 * (m.m23 * m.m31 - m.m21 * m.m33) - m.m01 * (m.m20 * m.m33 - m.m23 * m.m30) + m.m03 * (m.m20 * m.m31 - m.m21 * m.m30)) * invDet;
        result.m22 = (m.m00 * (m.m11 * m.m33 - m.m13 * m.m31) - m.m01 * (m.m10 * m.m33 - m.m13 * m.m30) + m.m03 * (m.m10 * m.m31 - m.m11 * m.m30)) * invDet;
        result.m23 = (m.m00 * (m.m13 * m.m21 - m.m11 * m.m23) - m.m01 * (m.m13 * m.m20 - m.m10 * m.m23) + m.m03 * (m.m11 * m.m20 - m.m10 * m.m21)) * invDet;
        result.m30 = (m.m10 * (m.m22 * m.m31 - m.m21 * m.m32) - m.m11 * (m.m20 * m.m32 - m.m22 * m.m30) + m.m12 * (m.m20 * m.m31 - m.m21 * m.m30)) * invDet;
        result.m31 = (m.m00 * (m.m21 * m.m32 - m.m22 * m.m31) - m.m01 * (m.m20 * m.m32 - m.m22 * m.m30) + m.m02 * (m.m20 * m.m31 - m.m21 * m.m30)) * invDet;
        result.m32 = (m.m00 * (m.m12 * m.m31 - m.m11 * m.m32) - m.m01 * (m.m10 * m.m32 - m.m12 * m.m30) + m.m02 * (m.m10 * m.m31 - m.m11 * m.m30)) * invDet;
        result.m33 = (m.m00 * (m.m11 * m.m22 - m.m12 * m.m21) - m.m01 * (m.m10 * m.m22 - m.m12 * m.m20) + m.m02 * (m.m10 * m.m21 - m.m11 * m.m20)) * invDet;

        return result;
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
