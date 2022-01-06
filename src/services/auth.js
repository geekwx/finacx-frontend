import api from "./api";


const auth = {
    logar: async function (envio) {
        const dado =  await api.post('/auth', envio);
       
         
         console.log(dado);
         localStorage.setItem('token', JSON.stringify(dado.data.token))
         localStorage.setItem('username', JSON.stringify(dado.data.username))
         localStorage.setItem('tipo', JSON.stringify(dado.data.permissoes[0].descricao))
 
         console.log(localStorage.getItem('token'));
    }
}

export default auth;