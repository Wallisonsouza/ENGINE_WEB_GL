class ObjToArraysConverter 
{
    static ObjToEngineObject(obj) 
    {
        const lines = obj.split('\n');

        const dataArray = {
            vertex: [],
            normalVertex: [],
            vertexIndex: [],

            textureVertex: [],
            normalIndex: [],
            textureIndex: []
          
        };

        lines.forEach(line => {
            const parts = line.trim().split(/\s+/);

            switch(parts[0]) {
                case 'v':
                    const vertex = parts.slice(1).map(parseFloat);
                    dataArray.vertex.push(...vertex);
                    break;

                case 'vn':
                    const normal = parts.slice(1).map(parseFloat);
                    dataArray.normalVertex.push(...normal);
                    break;

                case 'vt':
                    const textureVertex = parts.slice(1).map(parseFloat);
                    dataArray.textureVertex.push(...textureVertex);
                    break;

                case 'f':
                    parts.slice(1).forEach(vertex => {
                        const indices = vertex.split('/').map(indexStr => {
                            return parseInt(indexStr.split('/')[0]) - 1;
                        });
                
                        // Índice de vértices
                        dataArray.vertexIndex.push(indices[0]);
                
                        // Índice de coordenadas de textura
                        if (indices[1] !== undefined && NaN)
                            dataArray.textureIndex.push(indices[1]);
                
                        // Índice de normais
                        if (indices[2] !== undefined)
                            dataArray.normalIndex.push(indices[2]);
                    });

                    break;

                default:
                    console.warn('Linha não reconhecida:', parts[0]);
                    break;
            }
        });

        console.log(dataArray);
        return dataArray;
      
    }
}
