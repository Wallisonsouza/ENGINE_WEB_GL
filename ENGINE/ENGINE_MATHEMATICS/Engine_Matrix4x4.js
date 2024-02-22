
import EngineVector4 from "./Engine_Vector4.js";
import EngineMatFloat from "./Engine_Mat_Float.js";
import EngineVector3 from "./Engine_Vector3.js";
import EngineQuaternion from "./Engine_Quaternion.js";

export default class EngineMatrix4x4
{
    /**
     * Cria uma nova instância de uma matriz 4x4.
     * 
     * @param {number} m00 - O valor na linha 0, coluna 0.
     * @param {number} m01 - O valor na linha 0, coluna 1.
     * @param {number} m02 - O valor na linha 0, coluna 2.
     * @param {number} m03 - O valor na linha 0, coluna 3.
     * @param {number} m10 - O valor na linha 1, coluna 0.
     * @param {number} m11 - O valor na linha 1, coluna 1.
     * @param {number} m12 - O valor na linha 1, coluna 2.
     * @param {number} m13 - O valor na linha 1, coluna 3.
     * @param {number} m20 - O valor na linha 2, coluna 0.
     * @param {number} m21 - O valor na linha 2, coluna 1.
     * @param {number} m22 - O valor na linha 2, coluna 2.
     * @param {number} m23 - O valor na linha 2, coluna 3.
     * @param {number} m30 - O valor na linha 3, coluna 0.
     * @param {number} m31 - O valor na linha 3, coluna 1.
     * @param {number} m32 - O valor na linha 3, coluna 2.
     * @param {number} m33 - O valor na linha 3, coluna 3.
     * @constructor
    */
    constructor(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)
    {
        this.m00 = m00;
        this.m01 = m01;
        this.m02 = m02;
        this.m03 = m03;
        this.m10 = m10;
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m20 = m20;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m30 = m30;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
    }

    /**
     * Obtém uma instância da matriz 4x4 preenchida com zeros.
     * 
     * @returns {EngineMatrix4x4} Uma instância da matriz 4x4 com todos os elementos definidos como zero.
    */
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

    /**
     * Obtém uma instância da matriz 4x4 que representa a matriz de identidade.
     * 
     * @returns {EngineMatrix4x4} Uma instância da matriz 4x4 que representa a matriz de identidade.
    */
    static get identity() 
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

    /**
     * Cria uma matriz de translação com base no vetor de posição fornecido.
     * 
     * @param {EngineVector3} vector Vetor de posição para a translação.
     * @returns {EngineMatrix4x4} Uma matriz de translação 4x4.
    */
    static GeometryTranslation(vector)
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

    /**
     * Cria uma matriz de rotação com base no quaternion de rotação fornecido.
     * 
     * @param {EngineQuaternion} quaternion O quaternion de rotação.
     * @returns {EngineMatrix4x4} Uma matriz de rotação 4x4.
    */
    static GeometryRotationQuaternion(quaternion) 
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
     * Retorna uma matriz de rotação de roll (em torno do eixo X) usando o ângulo de roll fornecido.
     * 
     * @param {number} roll O ângulo de roll em radianos.
     * @returns {EngineMatrix4x4} Uma matriz 4x4 de rotação de roll.
    */
    static GeometryRotationRoll(roll)
    {
        const sinTheta = Math.sin(roll);
        const cosTheta = Math.cos(roll);

        const result = new EngineMatrix4x4();
        
        result.m00 = 1;  
        result.m01 = 0;  
        result.m02 = 0;  
        result.m03 = 0;
        result.m10 = 0;  
        result.m11 = cosTheta;  
        result.m12 = -sinTheta;  
        result.m13 = 0;
        result.m20 = 0;  
        result.m21 = sinTheta;  
        result.m22 = cosTheta;  
        result.m23 = 0;
        result.m30 = 0;  
        result.m31 = 0;  
        result.m32 = 0;  
        result.m33 = 1;

        return result;
    }

    /**
     * Retorna uma matriz de rotação de pitch (em torno do eixo Y) usando o ângulo de pitch fornecido.
     * 
     * @param {number} pitch O ângulo de pitch em radianos.
     * @returns {EngineMatrix4x4} Uma matriz 4x4 de rotação de pitch.
    */
    static GeometryRotationPitch(pitch)
    {
        const sinTheta = Math.sin(pitch);
        const cosTheta = Math.cos(pitch);

        const result = new EngineMatrix4x4();
        
        result.m00 = cosTheta;  
        result.m01 = 0;  
        result.m02 = sinTheta;  
        result.m03 = 0;
        result.m10 = 0;  
        result.m11 = 1;  
        result.m12 = 0;  
        result.m13 = 0;
        result.m20 = -sinTheta;  
        result.m21 = 0;  
        result.m22 = cosTheta;  
        result.m23 = 0;
        result.m30 = 0;  
        result.m31 = 0;  
        result.m32 = 0;  
        result.m33 = 1;

        return result;
    }
    
    /**
     * Retorna uma matriz de rotação de yaw (em torno do eixo Z) usando o ângulo de yaw fornecido.
     * 
     * @param {number} yaw O ângulo de yaw em radianos.
     * @returns {EngineMatrix4x4} Uma matriz 4x4 de rotação de yaw.
    */
    static GeometryRotationYaw(yaw)
    {
        const sinTheta = Math.sin(yaw);
        const cosTheta = Math.cos(yaw);

        const result = new EngineMatrix4x4();

        result.m00 = cosTheta;  
        result.m01 = -sinTheta;  
        result.m02 = 0;  
        result.m03 = 0;
        result.m10 = sinTheta;  
        result.m11 = cosTheta;  
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

    /**
     * Calcula uma matriz de rotação com base em ângulos de Euler (roll, pitch, yaw).
     * @param {EngineVector3} vector Um vetor contendo os ângulos de Euler (roll, pitch, yaw) em radianos.
     * @returns {EngineMatrix4x4} A matriz de rotação resultante.
    */
    static GeometryRotationEuler(vector)
    {
        const cosRoll = Math.cos(vector.x);
        const sinRoll = Math.sin(vector.x);
        const cosPitch = Math.cos(vector.y);
        const sinPitch = Math.sin(vector.y);
        const cosYaw = Math.cos(vector.z);
        const sinYaw = Math.sin(vector.z);

        const result = new EngineMatrix4x4();

        result.m00 = cosYaw * cosPitch;
        result.m01 = cosYaw * sinPitch * sinRoll - sinYaw * cosRoll;
        result.m02 = cosYaw * sinPitch * cosRoll + sinYaw * sinRoll;
        result.m03 = 0;
        result.m10 = sinYaw * cosPitch; 
        result.m11 = sinYaw * sinPitch * sinRoll + cosYaw * cosRoll;
        result.m12 = sinYaw * sinPitch * cosRoll - cosYaw * sinRoll;  
        result.m13 = 0;
        result.m20 = -sinPitch;  
        result.m21 = cosPitch * sinRoll;  
        result.m22 = cosPitch * cosRoll;  
        result.m23 = 0;
        result.m30 = 0;  
        result.m31 = 0;  
        result.m32 = 0;  
        result.m33 = 1;

        return result;
    }

    /**
     * Cria uma matriz de escala com base no vetor de escala fornecido.
     * 
     * @param {EngineVector3} vector O vetor de escala.
     * @returns {EngineMatrix4x4} Uma matriz de escala 4x4.
    */
    static GeometryScale(vector)
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

    /**
     * Cria uma matriz de projeção ortográfica para uma câmera.
     * 
     * @param {number} left Coordenada esquerda da viewport.
     * @param {number} right Coordenada direita da viewport.
     * @param {number} bottom Coordenada inferior da viewport.
     * @param {number} top Coordenada superior da viewport.
     * @param {number} zNear Distância para o plano de recorte próximo.
     * @param {number} zFar Distância para o plano de recorte distante.
     * @returns {EngineMatrix4x4} Uma matriz de projeção ortográfica 4x4.
    */
    static CameraOrthographic(left, right, bottom, top, zNear, zFar) 
    {
        const result = new EngineMatrix4x4();

        // Calcula os componentes da matriz de projeção ortográfica
        result.m00 = 2.0 / (right - left);
        result.m11 = 2.0 / (top - bottom);
        result.m22 = -2.0 / (zFar - zNear);
        result.m30 = -(right + left) / (right - left);
        result.m31 = -(top + bottom) / (top - bottom);
        result.m32 = -(zFar + zNear) / (zFar - zNear);

        // Zera os outros elementos da matriz que não foram definidos acima
        result.m01 = 0;
        result.m02 = 0;
        result.m03 = 0;
        result.m10 = 0;
        result.m12 = 0;
        result.m13 = 0;
        result.m20 = 0;
        result.m21 = 0;
        result.m23 = 0;
        result.m33 = 1;

        return result;
    }

    /**
     * Cria uma matriz de projeção perspectiva para uma câmera.
     * 
     * @param {number} fov Campo de visão (em graus).
     * @param {number} aspect Razão de aspecto da viewport.
     * @param {number} zNear Distância para o plano de recorte próximo.
     * @param {number} zFar Distância para o plano de recorte distante.
     * @returns {EngineMatrix4x4} Uma matriz de projeção perspectiva 4x4.
    */
    static CameraPerspective(fov, aspect, zNear, zFar)
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

    static CameraView(eye, forward, upWards)
    {   

        const fwd = EngineVector3.Normalize(forward);
        const right = EngineVector3.Cross(upWards, fwd);
        const up =  EngineVector3.Cross(fwd, right);

        const result = new EngineMatrix4x4()

        result.m00 = right.x;
        result.m01 = right.y;
        result.m02 = right.z;
        result.m03 = 0;
        result.m10 = up.x;
        result.m11 = up.y;
        result.m12 = up.z;
        result.m13 = 0;
        result.m20 = -fwd.x;
        result.m21 = -fwd.y;
        result.m22 = -fwd.z;
        result.m23 = 0;
        result.m30 = -EngineVector3.Dot(right, eye);
        result.m31 = -EngineVector3.Dot(up, eye);
        result.m32 = EngineVector3.Dot(fwd, eye);
        result.m33 = 1;

       return result;

    }

    static CameraTranslation(vector)
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

    static CameraRotation(quaternion) 
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
    static CameraLookAt(eye, center, up)
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
    * @description 
    * Multiplica uma EngineMatrix4x4 por um EngineVector4;
    * 
    * @param {EngineMatrix4x4} lhs Multiplicando EngineMatrix4x4;
    * @param {EngineVector4} vector Multiplicador EngineVector4;
    * @returns {EngineVector4} Vetor resultante;
    * @see EngineVector4
    * 
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
        
    //#region OBSOLETS

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


        /*static Camera_View(eye, up, right, foward)w
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
            result.m32 = -EngineVector3.Dot(foward, eye);
            result.m33 = 1;

        return result;
        }*/

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

    //#endregion
}
