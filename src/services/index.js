import api from "./api";

const services = {
    adiciona: async function (path, envio){   
        console.log("Dentro de service")
        console.log("Path =>" + path)
        console.log("Envio => "+ envio )
      await api.post(path , envio);    
    },
    update: async function(path, id ,envio){
        await api.put( path + "/" + id, envio);
    },
    delete: async (path, id) => {
        await api.delete(path +"/"+ id);
    },
    get: async (path) => {
        let req = await api.get(path);


        return req.data;
    },
    transfere: async (path,  contaRemetente, contaDestinatario, valor) => {
        await api.post( path + "/transfere/"+contaRemetente+"/"+contaDestinatario , valor);
    }
}

export default services;
