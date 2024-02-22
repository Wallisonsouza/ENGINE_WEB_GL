
export default class EngineMesh
{
    constructor()
    {
        // Defina os vértices do cubo
        this.vertex = new Float32Array([
            // Face frontal
            -0.5, 0.5, 0.5,  // Vértice 0
            -0.5, -0.5, 0.5, // Vértice 1
            0.5, -0.5, 0.5,  // Vértice 2
            0.5, 0.5, 0.5,   // Vértice 3
            
            // Face traseira
            -0.5, 0.5, -0.5, // Vértice 4
            -0.5, -0.5, -0.5,// Vértice 5
            0.5, -0.5, -0.5, // Vértice 6
            0.5, 0.5, -0.5,  // Vértice 7

            // Face superior
            -0.5, 0.5, -0.5, // Vértice 8 (mesmo que Vértice 4)
            -0.5, 0.5, 0.5,  // Vértice 9 (mesmo que Vértice 0)
            0.5, 0.5, 0.5,   // Vértice 10 (mesmo que Vértice 3)
            0.5, 0.5, -0.5,  // Vértice 11 (mesmo que Vértice 7)

            // Face inferior
            -0.5, -0.5, -0.5,// Vértice 12 (mesmo que Vértice 5)
            -0.5, -0.5, 0.5, // Vértice 13 (mesmo que Vértice 1)
            0.5, -0.5, 0.5,  // Vértice 14 (mesmo que Vértice 2)
            0.5, -0.5, -0.5, // Vértice 15 (mesmo que Vértice 6)

            // Face direita
            0.5, 0.5, -0.5,  // Vértice 16 (mesmo que Vértice 11)
            0.5, 0.5, 0.5,   // Vértice 17 (mesmo que Vértice 10)
            0.5, -0.5, 0.5,  // Vértice 18 (mesmo que Vértice 14)
            0.5, -0.5, -0.5, // Vértice 19 (mesmo que Vértice 6)

            // Face esquerda
            -0.5, 0.5, -0.5, // Vértice 20 (mesmo que Vértice 8)
            -0.5, 0.5, 0.5,  // Vértice 21 (mesmo que Vértice 9)
            -0.5, -0.5, 0.5, // Vértice 22 (mesmo que Vértice 13)
            -0.5, -0.5, -0.5,// Vértice 23 (mesmo que Vértice 12)
        ]);

        // Defina os índices para os vértices do cubo
        this.index = new Uint16Array([
            // Face frontal
            0, 1, 2,
            0, 2, 3,

            // Face traseira
            4, 5, 6,
            4, 6, 7,

            // Face superior
            8, 9, 10,
            8, 10, 11,

            // Face inferior
            12, 13, 14,
            12, 14, 15,

            // Face direita
            16, 17, 18,
            16, 18, 19,

            // Face esquerda
            20, 21, 22,
            20, 22, 23,
        ]);

    }
}