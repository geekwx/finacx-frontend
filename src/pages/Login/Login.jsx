import React, { useState, useContext } from 'react';

import { makeStyles, Box,
    Typography} from '@material-ui/core';

import {
    Button,
    TextField
} from '@material-ui/core';

import auth from '../../services/auth'


import { Context} from '../../Context/AuthContext';

function Login(props){
    
    //  funcao de history 
    const { history } = props;


    const {formulario, logo } = useStyles();

    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");
    const { authenticated, tipo, fazerLogin, fazerLogout} = useContext(Context);

    //  funcao de login

    async function logar(){
      
        await auth.logar( {
            username, senha
        })
        .then(response => {
            console.log("Logou!!");
            fazerLogin();
        history.push('/app');    
        })
        .catch(err => {alert("Username ou Senha incorreto!!!")
        history.push('/app');
    })
        
    }


    //funcao de contexto

    console.log(authenticated);
    console.log("tipo => "+ tipo);
    console.log("fazerLogin =>" + fazerLogin);
    

    return(
        <Box display="flex" justifyContent="center"
        
        color="#3f51b5"
        >
        <form className={formulario}>

        <Typography  className={logo} variant="h1" component="h1">
            FinancX
         </Typography>
            

            <h3> Login </h3>

            <Box marginBottom={5}>
            <TextField 
            
            id="username" label="Username" type="text"
            fullWidth="true"  onChange={({target}) => setUsername(target.value)} />

            <TextField id="senha" label="Senha"  type="password"
            fullWidth="true"  onChange={({target}) => setSenha(target.value)} />

            </Box>
            
            <Button color="primary" onClick={() => logar()} > ACESSAR </Button>
           
            
           
        </form>
        </Box>
    );

}

const useStyles = makeStyles(() => ({
    formulario: {
    alignItems: 'center'  
   },
   logo: {
    fontFamily: "Ubuntu Mono, monospace",
    fontWeight: 600,
    color: "#3f51b5",
    textAlign: "left",
  }
   
   }))
   
export default Login;