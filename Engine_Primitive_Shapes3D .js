class EnginePrimitiveShapes3D 
{
    constructor() 
    {   
        this.cube = new EngineCube();
    }

    static GetForm(form)
    {
        switch (form) 
        {
            case "cube":

                return new EngineCube();

            case "cylinder":

                return new EngineCylinder();
            
            case "sphere":

                return new EngineSphere();
            
            case "triangle":

                return new EngineTriangle();

            default:
                break;
        }
    }

    static ExpandGeometry(vertices, indices) 
    {
        const expandedVertices = [];
     
        for (let i = 0; i < indices.length; i += 2) 
        {
            const index1 = indices[i] * 3;
            const index2 = indices[i + 1] * 3;
    
            expandedVertices.push(vertices[index1], vertices[index1 + 1], vertices[index1 + 2]);
            expandedVertices.push(vertices[index2], vertices[index2 + 1], vertices[index2 + 2]);
        }
    
        return new Float32Array(expandedVertices);
    }
}



class EngineCube
{
    vertex = new Float32Array([

        -1.000000, -1.000000, 1.000000,
        -1.000000, 1.000000, 1.000000,
        -1.000000, -1.000000, -1.000000,
        -1.000000, 1.000000, -1.000000,
        1.000000, -1.000000, 1.000000,
        1.000000, 1.000000, 1.000000,
        1.000000, -1.000000, -1.000000,
        1.000000, 1.000000, -1.000000
    ]);
    index = new Uint16Array([


        8, 9, 10,
        10, 11, 8,
        14, 15, 12,
        12, 13, 14,
        16, 17, 18,
        18, 19, 16,
        20, 21, 22,
        22, 23, 20
    ]);
      
}

class EngineCylinder 
{
    stacks = 10; 
    slices = 20; 
    radius = 1.0; 
    height = 4.0; 

    vertex = [];
    index = [];
    
    constructor() 
    {
        // Criar os vértices das laterais do cilindro
        for (let i = 0; i <= this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                const theta = (j / this.slices) * 2 * Math.PI;
                const x = this.radius * Math.cos(theta);
                const y = this.height * (i / this.stacks) - this.height / 2;
                const z = this.radius * Math.sin(theta);

                this.vertex.push(x, y, z);
            }
        }

        // Criar os índices das laterais do cilindro
        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                const nextIndex = (j + 1) % this.slices;

                const current = i * this.slices + j;
                const next = i * this.slices + nextIndex;
                const belowCurrent = current + this.slices;
                const belowNext = next + this.slices;

                // Duas triângulos formando um quadrilátero
                this.index.push(current, next, belowCurrent);
                this.index.push(next, belowNext, belowCurrent);
            }
        }

        // Criar os vértices e índices da face superior do cilindro
        const topCenterIndex = this.vertex.length / 3; // Índice do vértice no topo do cilindro

        this.vertex.push(0, this.height / 2, 0); // Adiciona o vértice no topo do cilindro

        for (let j = 0; j < this.slices; j++) {
            const current = j;
            const next = (j + 1) % this.slices;

            // Triângulo formando a face superior
            this.index.push(topCenterIndex, current, next);
        }

        // Criar os vértices e índices da face inferior do cilindro
        const bottomCenterIndex = topCenterIndex + 1; // Índice do vértice na base do cilindro

        this.vertex.push(0, -this.height / 2, 0); // Adiciona o vértice na base do cilindro

        for (let j = 0; j < this.slices; j++) {
            const current = j + (this.stacks * this.slices);
            const next = (j + 1) % this.slices + (this.stacks * this.slices);

            // Triângulo formando a face inferior
            this.index.push(bottomCenterIndex, current, next);
        }
    }
}

class EngineTriangle 
{
    constructor() 
    {
        this.vertex = new Float32Array([
            // BASE
            -1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, -1.0, -1.0,
            0.0, 1.0, 0.0,
        ]);

        this.index = new Uint16Array([
            // Base
            0, 1, 2,
            0, 2, 3,

            // Lateral 1
            0, 4, 1,

            // Lateral 2
            1, 4, 2,

            // Lateral 3
            2, 4, 3,

            // Lateral 4
            3, 4, 0
        ]);

        this.color = new Float32Array([

            // Base - vermelho
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,

            // Lateral 1 - verde
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,

            // Lateral 2 - azul
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,

            // Lateral 3 - amarelo
            1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,

            // Lateral 4 - roxo
            1.0, 0.0,  1.0,
            1.0, 0.0,  1.0,
            1.0, 0.0,  1.0,
        ]);
    }
}

class EngineSphere
{
    vertex
}