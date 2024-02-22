const storageName = "EngineStorage";
var version = 1;
const partitionName = "Engine3dObjects"; 

async function OpenStorage(name) 
{
    return new Promise(function(resolve, reject) 
    {
        var request = indexedDB.open(name);
      
        request.onsuccess = function(event) 
        {   
            resolve(event.target.result);
            console.log("banco de dados aberto com sucesso");
        };

        request.onupgradeneeded = function(event)
        {
            const db = event.target.result;
         
            if (!db.objectStoreNames.contains(partitionName)) 
            {
                db.createObjectStore(partitionName,{ autoIncrement: true });
                db.createObjectStore("EngineConfig",{ autoIncrement: true });
            }
        }

        request.onerror = function(event) 
        {
            reject("Erro ao abrir ou criar o banco de dados: " + event.target.errorCode);
        }
    });
}

async function AddObject(db, partitionName,  object)
{
    return new Promise(function(resolve, reject)
    {
        const transaction = db.transaction(partitionName, "readwrite");
        const objectStore = transaction.objectStore(partitionName);
        const request = objectStore.add(object);
       
        request.onsuccess = function() 
        {
            resolve("Objeto adicionado com sucesso");
            console.log("aaa");
        };

        request.onerror = function(event) 
        {
            reject("Erro ao adicionar objeto: " + event.target.errorCode);
        };
    });
}

async function getAllObjectsFromPartition(db, partitionName) 
{
    return new Promise(function(resolve, reject)
    {
        const transaction = db.transaction(partitionName, "readonly");
        const objectStore = transaction.objectStore(partitionName);
        const request = objectStore.getAll();

        request.onerror = function()
        {
            reject(`Erro ao recuperar objetos da partição ${partitionName}`);
        };

        request.onsuccess = function (event)
        {
            resolve(event.target.result);
        };
    });
}



async function GetObject(db, partionName)
{
    return new Promise(function(resolve, reject)
    {

        var transaction = db.transaction(partionName, "readonly");
        var objectStore = transaction.objectStore(partionName);
        var request = objectStore.openCursor();
        var objectsArray = [];
        
        request.onsuccess = function(event)
        {
            var cursor = event.target.result;
            if(cursor)
            {   
                objectsArray.push(cursor.value);
                cursor.continue();
            }

            else
            {   
                resolve(objectsArray);
                console.log("todos os dados foram lidos com sucesso")
            }
        }
    })
}

async function recoveryFile() 
{
    try 
    {
        const storage = await OpenStorage(storageName);
        const objects = await GetObject(storage, partitionName);
       
        return objects; 
    } 
    
    catch (error)
    {
        console.error(error);
        throw error; 
    }
}
