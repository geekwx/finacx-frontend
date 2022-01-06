import React, {useContext} from 'react';
import { TextField, Button, Box, Container, Grid,   } from '@material-ui/core';
import Header from '../../components/Header/Header';

import {Context} from '../../Context/AuthContext';


function Inicial() {
    const { username } = useContext(Context);
    return(
      
        
        <Container>
            
            <Box> 
            <Header />
            </Box>
            <Box> 
            <h1 >INICIO </h1>
        

            <h3>  {username} </h3>

            <p> Seja bem vindo ao sistema de gestão financeira, você poderar adicionar os seus debitos e creditos e separar por categorias e contas. 
                Muito obrigado por utilizar a Financx.
            </p>
            </Box>
        </Container>
        
    );
}

export default Inicial;