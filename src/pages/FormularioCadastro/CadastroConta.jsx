import React, { useState, useEffect, useContext} from 'react';
import { TextField, Button, Box, Container,
    Table, TableContainer,
    TableHead,
    TableCell,
    makeStyles,
    TableBody, TableRow, Grid} from '@material-ui/core';

import services from '../../services';

import AsyncSelect from 'react-select/async';

import { Context} from '../../Context/AuthContext';

import Header from '../../components/Header/Header';


function CadastroConta(props){
    const { token } = useContext(Context);
    let location = props.location.pathname;
    const [ lista, setLista] = useState([]);
    const [reload, setReload] = useState(true);
    const [ novo, setNovo ] = useState(false);

    // setando itens da conta
    const [nome, setNome ] = useState("");
    const [saldo, setSaldo] = useState("");
    const [ id, setId ] = useState(null);

    //  setando as contas para transferencia 

    const valorInicial = {
        value: 0, 
        label: 'Selecione'
    }

    const [ selectContaRemetente, setSelectContaRemetente ] = useState(valorInicial);
    const [ selectContaDestinatario, setSelectContaDestinatario ] = useState(valorInicial);

    // esse é o valor qe sera enviado na transferencia
    const [ valor, setValor] = useState("");


    const [ menuTransf, setMenuTransf ] = useState(false);

    useEffect(()=> {
        limpa();
        carregaDados();
        setReload(true); 
    }, [reload]);

    async function carregaDados(){
        
        await services.get(location, token)
                .then(response => setLista(response))
                .catch((error) => { alert("Ocorreu um erro ao buscar item => " + error)}); 
    }

    function limpa(){
     setNome("");
     setSaldo("");
     setId(null);
     setSelectContaRemetente(valorInicial);
     setSelectContaDestinatario(valorInicial);
     setValor("");
    }
    function menuNovo(){
        setNovo(!novo)
        if(novo){
            limpa();
        }
    }
    function menuTransferir(){
        setMenuTransf(!menuTransf)
        if(novo){
            limpa();
        }
    }
    function editar(item){
        setNovo(true);
        setId(item.id);
        setNome(item.nome);
        setSaldo(item.saldo);
    }

    async function adiciona(){ 
        if(id === null){
            await services.adiciona( location,{nome, saldo}, token);
        }else {
            await services.update(location, id, {nome, saldo}, token);  
        }
        
        setReload(false);
    }
    async function deleta(id){
        await services.delete(location, id, token);
         setReload(false);
     };

      //Configuracao dos dados para povoar o select
 const confSelect = (data) => ({
    value: data.id,
    label: data.nome,
  });


  //O select da Conta
  async function selectConta() {
    const data = await services.get("conta", token)
            .then((response) =>           
                response.map(confSelect))
    return data;
  }

  // funcao para transferir valor

  async function transferir(){


     await services.transfere(location, selectContaRemetente.value, selectContaDestinatario.value, {valor}, token )
                    .then(response => alert("Realizado com sucesso"))
                    .catch(error => alert(error));

     setReload(false);
  }

  const { botaoMenu } = useStyles();


    return(
        <Container>
        <Box>
            <Header />
        </Box>
        <Box>
        {menuTransf ? (<span></span>) : (<Button color="primary" onClick={() => menuNovo()}>{novo ? (<h3>FECHAR</h3>):(<h3>NOVO</h3>)}</Button>)}
        {novo ? (<span></span>) : (<Button color="primary" onClick={() => menuTransferir()}>{menuTransf ? (<h3>FECHAR</h3>):(<h3>TRANSFERIR</h3>)}</Button>)}
        
        {novo && (
            <form onSubmit={(event) => event.preventDefault()}>
            <h3>Cadastro Conta</h3>
            <TextField id="nomeConta" label="Titulo Conta" type="text"
            fullWidth="true" value={nome} onChange={({target}) => setNome(target.value)} />
            <TextField id="saldoConta" value={saldo} onChange={({target}) => setSaldo(target.value)} label="Saldo Conta" type="number"
            fullWidth="true" />
            <Box mt={3}>
            <Button variant="contained" color="primary" onClick={() => adiciona()}  >Salvar</Button>
            </Box>
        </form>
        )}  

        {menuTransf &&(
            <form onSubmit={(event) => event.preventDefault()}>
            <h3>Transferencia entre Contas</h3>
            <TextField id="saldoConta" value={valor} onChange={({target}) => setValor(target.value)} label="Valor a transferir:" type="number"
                fullWidth="true" />
            
            <h4>Selecione a conta de origem </h4>
                <AsyncSelect
            
            loadOptions={selectConta}
            value={selectContaRemetente}
            onChange={(data) => setSelectContaRemetente(data)}
            
            defaultOptions
          />
    
        <h4>Selecione a conta destinatario</h4>
                <AsyncSelect
            
            loadOptions={selectConta}
            value={selectContaDestinatario}
            onChange={(data) => setSelectContaDestinatario(data)}
            
            defaultOptions
          />
    
                <Box mt={3}>
                <Button variant="contained" color="primary" onClick={() => transferir()}  >Enviar</Button>
                </Box>
            </form>     
        )} 

        


        {/*  Inicio tabela  */ } 

        <TableContainer>
            <Table>
            <TableHead>
                <TableCell>ID</TableCell>
                <TableCell>Conta</TableCell>
                <TableCell>Saldo</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Excluir</TableCell>
                
            </TableHead>
            <TableBody>
                { lista.length > 0 && (
                
                lista.map(item => (
                    <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                            {item.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {item.nome}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {item.saldo.toFixed(2)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                        <Button  color="primary" onClick={() => editar(item)} >Editar </Button>
                        </TableCell>
                        <TableCell component="th" scope="row">
                        <Button  color="secondary" onClick={() => deleta(item.id)}>Excluir </Button>
                        </TableCell>
                    </TableRow>
                    )
                ))}
            </TableBody>
            </Table>
        </TableContainer>

        </Box>
        </Container>
    );
}

const useStyles = makeStyles(() => ({
    botaoMenu: {
        justifyContent: "space-between"
        
    }
  }))

export default CadastroConta;