import React, { useState } from 'react';
import { TextField, Button, Box, Container, TableContainer, Table, TableHead, TableCell, TableBody, TableRow  } from '@material-ui/core';
import { useEffect } from 'react';
import services from '../../services';


import Header from '../../components/Header/Header';

function CadastroCategoria(props){
    let location = props.location.pathname;
    
    const [ novo, setNovo ] = useState(false);
    const [ lista, setLista] = useState([]);
    const [reload, setReload] = useState(true);
    const [token, setToken] = useState({});

    // itens da categoria
    const [nome, setNome] = useState("");
    const [id, setId] = useState(null);
    

    useEffect(()=> {
        limpa();
        carregaDados();
        setReload(true); 
        
        
    }, [reload])


    async function carregaDados(){
        await services.get(location)
                .then(response => setLista(response))
                .catch((error) => { alert("Ocorreu um erro ao buscar item => " + error)});
     
    }


    function limpa(){
        setNome("");
        setId(null);
    }
    function menuNovo(){
        setNovo(!novo)
        if(novo){
            limpa();
        }
    }
    async function deleta(id){
        await services.delete(location, id);
         setReload(false);
     };
    async function edit(item){
         setNovo(true);
         setNome(item.nome);
         setId(item.id);
     }

    async function adiciona(){   
       
        if(id === null){
            await services.adiciona(location , {nome});
        } else {
            await services.update(location, id, {nome});
        }
        setReload(false);
    };


   
    return(
        <Container>
            <Box>
            <Header />
            </Box>
            <Box>
        <Button color="primary" onClick={() => menuNovo()}>{novo ? (<h3>FECHAR</h3>):(<h3>NOVO</h3>) }</Button>
         {novo && (
             <form>
             <h1 >Cadastro Categoria</h1>
             <TextField id="nomeCategoria" label="Nome Categoria" type="text"
             fullWidth="true" mb={5} value={nome} onChange={({target}) => setNome(target.value)}/>
             <Box mt={3}>
             <Button variant="contained" color="primary" onClick={() => adiciona()} >Salvar</Button>
             </Box>
         </form> 

         
         ) } 
        

        <h1>Lista</h1>
        <TableContainer>
            <Table>
            <TableHead>
                <TableCell>ID</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Excluir</TableCell>
            </TableHead>
            <TableBody>
                { lista.length > 0 &&
                (
                    lista.map( item => (
                        <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                            {item.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {item.nome}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <Button  color="primary" onClick={() => edit(item)} >Editar </Button>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <Button  color="secondary" onClick={() => deleta(item.id)}>Excluir </Button>
                        </TableCell>
                    </TableRow>
                    ))
                ) }


            </TableBody>
            </Table>
        </TableContainer>

        </Box>
        </Container>
    );
}

export default CadastroCategoria;