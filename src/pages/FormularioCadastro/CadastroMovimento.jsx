import React, { useState, useEffect, useContext} from 'react';
import { TextField, Button,  MenuItem, Box, Container, 
     TableContainer, Table, TableHead, TableCell , TableBody, TableRow, makeStyles, 
} from '@material-ui/core';

import AsyncSelect from 'react-select/async';


import services from '../../services';


import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from "@date-io/moment";
import "moment/locale/pt-br";
import Paginacao from '../../components/Paginacao';


import Header from '../../components/Header/Header'

import { Context} from '../../Context/AuthContext';
moment.locale("pt-br");

function CadastroMovimento(props){
    let location = props.location.pathname;
    const { token } = useContext(Context);

    const [locale, setLocale] = useState("pt-br");
 
    const [reload, setReload] = useState(true);
    const [ novo, setNovo ] = useState(false);

    //busca de lista
   const [ lista, setLista] = useState([]);

    //items do movimento
    
    const [ id, setId ] = useState(null);
    const [descricao, setDescricao ] = useState("");
    const [tipo, setTipo ] = useState("");
    const [valor, setValor] = useState("");
    const [dataMovimento, setDataMovimento] = useState(new Date());
     
    //Setando o valor default do select 
    const valorInicial = {
        value: 0, 
        label: 'Selecione'
    }

    const [selectContaId, setSelectContaId] = useState(valorInicial);
    const [selectCategoriaId, setSelectCategoriaId] = useState(valorInicial);

    // teste de paginacao 

    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [voltar, setVoltar]= useState(false);
    const [avancar, setAvancar] = useState(false);


   
    useEffect(()=> {
        
        //limpa todos os usestate
       limpa();   
        carregaDados();

        setReload(true); 
    }, [reload])

    async function carregaDados(){
        let localizacaoPagina = location + "?page="+page;
        await services.get(localizacaoPagina, token)
                .then(response => {
                    carregarPaginacao(response);
                    setLista(response.content);
                })
                .catch((error) => { alert("Ocorreu um erro ao buscar item => " + error)}); 
    }

    function carregarPaginacao(dados){
        setTotalPage(dados.totalPages);
        setPage(dados.number);
        
        //  verificando pagina igual a 0 ou menor
        if(page > 0){
            setVoltar(true);
        }else{
            setVoltar(false);
        }

        // verificando pagina maior ou igual
        if(page <= totalPage ){
            setAvancar(true);
        }else{
            setAvancar(false);
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
        setDescricao("");
        setValor("");
        setTipo("");
        setSelectContaId(valorInicial);
        setSelectCategoriaId(valorInicial);
       
    }
    

    async function adiciona(){ 
        let dataCriacao = moment(dataMovimento._d).format('L');
        let contaId = selectContaId.value;
        let categoriaId = selectCategoriaId.value;    

        if(id === null){
            await services.adiciona(location, {
               id, 
               descricao,
               tipo, 
               valor, 
               dataCriacao, 
               contaId, 
               categoriaId
           }, token)
        }else {
            await services.update(location, id, { descricao,
                tipo, 
                valor, 
                dataCriacao, 
               contaId, 
                categoriaId
                }, token);  
        }
        
        setReload(false);
    }
    async function deleta(id){
        await services.delete(location, id, token);
         setReload(false);
     };


     function editar(item){
        setNovo(true); 
        setId(item.id);
         setDescricao(item.descricao);
         setValor(item.valor);
         setTipo(0);
         //Adicionando os select
         let conta = confSelect(item.conta);
         setSelectContaId(conta);
         let categoria = confSelect(item.categoria);
         setSelectCategoriaId(categoria);            
         
    }

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

  //O select da Categoria
  async function selectCategoria() {
    const data = await services.get("categoria", token)
            .then((response) => response.map(confSelect))
    return data;
  }

  const { despesa, receita, transferencia } = useStyles();




  const funcaoAvancar = () => {
    setPage(page+1);
    setReload(false);
  }

  const funcaoVoltar = () => {
    setPage(page-1);
    setReload(false);
  }


    return(
        
        <Container>
            <Box>
            <Header />
            </Box>
            <Box>
         <div> 
              <Button color="primary" onClick={() => menuNovo()}>{novo ? (<h3>FECHAR</h3>):(<h3>NOVO</h3>)}</Button>
             { novo && (     
        <form>
            <h3>Cadastro Conta</h3>
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}  locale={locale} >
            <DatePicker  value={dataMovimento}
             onChange={date => setDataMovimento(date)} />
            </MuiPickersUtilsProvider>
            <TextField id="descricao" label="Descricao Movimento" type="text"
            fullWidth="true" value={descricao} onChange={({target}) => setDescricao(target.value)}/>

          
            <TextField id="selectTipo" value={tipo} onChange={({target}) => setTipo(target.value)}  label="Tipo" select fullWidth>
                <MenuItem value="0">Despesa</MenuItem>
                <MenuItem value="1">Receita</MenuItem>

            </TextField>
         
        <h4>Selecione a sua conta</h4>
            <AsyncSelect
        
        loadOptions={selectConta}
        value={selectContaId}
        onChange={(data) => setSelectContaId(data)}
        
        defaultOptions
      />
     <h4>Selecione a categoria</h4>
            <AsyncSelect
        loadOptions={selectCategoria}
        onChange={(data) => {
            setSelectCategoriaId(data);
        }}
        value={selectCategoriaId}
        defaultOptions
      />

            <TextField id="valor" label="Valor do Movimento" type="number"
            fullWidth="true" value={valor} onChange={({target}) => setValor(target.value)}/>
  
            <Box mt={3}>
            <Button variant="contained" color="primary" onClick={ () => adiciona()
            }  >Salvar</Button>
           
            </Box>

        </form>
            )}

            {/*  Inicio tabela  */ } 

            <TableContainer>
            <Table>
            <TableHead>
                <TableCell>ID</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Conta</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Excluir</TableCell>
                
            </TableHead>
            <TableBody>
                { lista.length > 0 && (
                
                lista.map((item, index) => (
                  
                  
                    <TableRow  key={item.id}>
                        <TableCell component="th" scope="row">
                            {item.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {item.descricao}
                        </TableCell>
                        {/* Criando uma condicao para coloracao especial do tipo na tabela */}
                        { item.tipo == "DESPESA" && (
                        <TableCell className={despesa} component="th" scope="row">
                            { item.valor.toFixed(2)}
                        </TableCell>
                        )}
                        { item.tipo == "RECEITA" && (
                            <TableCell className={receita} component="th" scope="row">
                            {item.valor.toFixed(2)}
                        </TableCell>
                        )}
                        { item.tipo == "TRANSFERENCIA" && (
                            <TableCell className={transferencia} component="th" scope="row">
                            {item.valor.toFixed(2)}
                        </TableCell>
                        )}
                        
                        <TableCell component="th" scope="row">
                            { moment(item.dataCriacao).format('L')}
                        </TableCell>
                        <TableCell component="th" scope="row">
                           { item.conta.nome }
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {item.categoria.nome}
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


        </div>  
         
        <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
 
>

                                <Paginacao pagina={page}
                                voltar={voltar}
                                avancar={avancar}
                                funAvancar={funcaoAvancar}
                                funVoltar={funcaoVoltar}
                                />
                            </Box>

                            </Box>
         </Container> 
    );
}


const useStyles = makeStyles(() => ({
    despesa: {
        backgroundColor: "#ffcccc"
        
    }, 
    receita: {
        backgroundColor: "#ccffcc" 
    }, 
    transferencia:{
        backgroundColor: '#d6f5f5'
    }
  }))
  
  



export default CadastroMovimento;