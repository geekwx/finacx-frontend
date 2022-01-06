import React, { useState, useEffect} from 'react';

import services from '../../services';

import { Container,
    TextField,
    Button,
    Box,  
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    Radio,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow

} from '@material-ui/core';

import CheckIcon from '@material-ui/icons/Check';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';


import Header from '../../components/Header/Header';

/*
"nome":"user",
        "username": "usuario", 
        "senha": "user",
        "contaNaoExpirada": true,
        "contaNaoBloqueada": true,
        "credencialNaoExpirada": true,
        "ativo": true,
        "permissaoId": 3
        id
*/ 


/*
1	ADMIN
2	MANAGER
3	USER


*/ 
function CadastroUsuario(){
    let location = "/admin/usuario";


    const [id, setId] = useState(null);
    const [nome, setNome] = useState("");
    const [username, setUserName] = useState("");
    const [senha, setSenha] = useState("");
    const [contaNaoExpirada, setContaNaoExpirada] = useState(true);
    const [contaNaoBloqueada, setContaNaoBloqueada] = useState(true);
    const [credencialNaoExpirada, setCredencialNaoExpirada] = useState(true);
    const [ativo, setAtivo] = useState(true);
    const [permissaoId, setPermissaoId] = useState(3);

    

   //Carga padrao 
   const [ novo, setNovo ] = useState(false);
   const [ lista, setLista] = useState([]);
   const [reload, setReload] = useState(true);
   


    useEffect(() => {
        carregaDados();
        limpa();
        setReload(true); 
    }, [reload])


   async function carregaDados(){
    await services.get(location)
            .then(response => setLista(response))
            .catch((error) => { alert("Ocorreu um erro ao buscar item => " + error)});
 
}

async function adiciona(){
     
    if(id === null){
        console.log(nome, 
            username, 
            senha, 
            contaNaoExpirada, 
            contaNaoBloqueada, 
            credencialNaoExpirada, 
            ativo, 
            permissaoId)
        await services.adiciona(location , {nome, 
            username, 
            senha, 
            contaNaoExpirada, 
            contaNaoBloqueada, 
            credencialNaoExpirada, 
            ativo, 
            permissaoId});
    } else {
        await services.update(location, id, {nome, 
            username,  
            contaNaoExpirada, 
            contaNaoBloqueada, 
            credencialNaoExpirada, 
            ativo, 
            permissaoId});
    }
    setReload(false);
}
function iconeVouF(opcao){
    if(opcao){
        return <CheckIcon />
    }else {
        return <CheckBoxOutlineBlankIcon />
    }
}
function menuNovo(){
    setNovo(!novo)
    if(novo){
        limpa();
    }
}

function limpa(){
    setId(null);
    setUserName("");
    setNome("");
    setSenha("");
    setContaNaoExpirada(true);
    setContaNaoBloqueada(true);
    setCredencialNaoExpirada(true);
    setAtivo(true);
    setPermissaoId(3);
}

function editar(item){
    setNovo(true);
    setId(item.id);
    setUserName(item.username);
    setNome(item.nome);
    setContaNaoExpirada(item.contaNaoExpirada);
    setContaNaoBloqueada(item.contaNaoBloqueada);
    setCredencialNaoExpirada(item.credencialNaoExpirada);
    setAtivo(item.ativo);
    setPermissaoId(item.permissoes[0].id);

}
async function deleta(id){
    await services.delete(location, id);
    setReload(false);
}



    return(
        <Container>
            <Box>
            <Header />
            </Box>
            <Box>

<Button color="primary" onClick={() => menuNovo()}>{novo ? (<h3>FECHAR</h3>):(<h3>NOVO</h3>) }</Button>
        {novo && (
            <form>
            <h1 >Cadastro Usuario</h1>
            <TextField id="username" label="Nome de Usuario" type="text"
            fullWidth="true"  value={username} onChange={({target}) => setUserName(target.value)}  />
            <TextField id="nome" label="Nome Completo" type="text"
            fullWidth="true"  value={nome} onChange={({target}) => setNome(target.value)} />
        
            {id === null && (
                <TextField id="senha" label="Senha" type="password"
                fullWidth="true" mb={5}  value={senha} onChange={({target}) => setSenha(target.value)}/>
            )}
        
            

           <FormGroup row mt={45}>
            <FormLabel mt={5} mb={5}> Opções </FormLabel>
            <FormControlLabel control={<Checkbox color="primary"
            />} label="Conta Ativa" checked={ativo} onChange={({target}) => setAtivo(target.checked)}  />

           <FormControlLabel control={<Checkbox color="primary"
            />} label="Conta Não Expirada"   checked={contaNaoExpirada} onChange={({target}) => setContaNaoExpirada(target.checked)} />

           <FormControlLabel control={<Checkbox color="primary"
            />} label="Conta Não Bloqueada"  checked={contaNaoBloqueada} onChange={({target}) => setContaNaoBloqueada(target.checked)} />

           <FormControlLabel control={<Checkbox color="primary"
            />} label="Credencial Não Expirada"  checked={credencialNaoExpirada} onChange={({target}) => setCredencialNaoExpirada(target.checked)} />
           </FormGroup>
        
           <FormLabel component="legend">Tipo de Usuario</FormLabel>
           <RadioGroup aria-label="tipoUsuario" name="tipoUsuario" row 
           value={permissaoId} onChange={({target}) => setPermissaoId(target.value)}>
           <FormControlLabel value={3} checked={permissaoId == 3} control={<Radio />} label="USER" />
           <FormControlLabel value={2} checked={permissaoId == 2} control={<Radio />} label="MANAGER" />
           <FormControlLabel value={1} checked={permissaoId == 1} control={<Radio />} label="ADMIN" />
           </RadioGroup>

    
            <Box mt={3}>
            <Button variant="contained" color="primary" onClick={() => adiciona()} >Salvar</Button>
            </Box>
        </form> 
        )}
            
            <h1>Lista</h1>
            <TableContainer>
            <Table>
                <TableHead>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Conta Ativa</TableCell>
                <TableCell>Conta Não Expirada </TableCell>
                <TableCell>Conta Não Bloqueada </TableCell>
                <TableCell>Credencial Não Expirada </TableCell>
                <TableCell>Tipo </TableCell>
                <TableCell>Editar </TableCell>
                <TableCell>Excluir </TableCell>
                </TableHead>
                <TableBody> 
                    { lista.length > 0 && (
                        lista.map( item => (
                            <TableRow key={item.id}>
                                <TableCell component="th" scope="row">
                                    {item.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.username}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.nome}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {iconeVouF(item.ativo)}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {iconeVouF(item.contaNaoExpirada)}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {iconeVouF(item.contaNaoBloqueada)}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {iconeVouF(item.credencialNaoExpirada)}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.permissoes[0].descricao}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                <Button  color="primary" onClick={() => editar(item)} >Editar </Button>
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

export default CadastroUsuario;