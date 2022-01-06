import { useState, } from "react";
import api from "../../services/api";




function useAuth(props){
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [tipo, setTipo] = useState("");
    
  

  
    function fazerLogin(){
        const tokenB = localStorage.getItem('token');
        if(tokenB) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(tokenB)}`;
            setAuthenticated(true);
            setUsername(JSON.parse(localStorage.getItem('username')));
            setTipo(JSON.parse(localStorage.getItem('tipo')));

        }
        setAuthenticated(true);
    }
    function fazerLogout(){
        
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('tipo');
        setAuthenticated(false);
        
    }

  
    return { authenticated, username, tipo, fazerLogin, fazerLogout}


}


export default useAuth;