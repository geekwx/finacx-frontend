import React, { useContext } from "react";

import {
  AppBar, makeStyles, Toolbar, Typography, Button, 
} from "@material-ui/core";
import {  BrowserRouter, withRouter } from "react-router-dom";
import { Context } from "../../Context/AuthContext";




function Header(props) {
  
  const { username, tipo, fazerLogout } = useContext(Context);
  const { history } = props;
  
  /*
  Itens do menu
  */
  const menuItens = [
    {
      menuTitle: "Categoria",
      pageURL: "/categoria"
    },
    {
      menuTitle: "Conta",
      pageURL: "/conta"
    },
    {
      menuTitle: "Movimento",
      pageURL: "/movimento"
    }
  ];

  
  const botaoLink = (pageURL) => {
    history.push(pageURL)
    
    
  };

  

  

  const { logo, menuStyle, toolBar, logolink, mensagemBar } = useStyles();

  const displayDesk = () => {
    return <Toolbar className={toolBar}>
      {finacxLogo}
      {mensagem}
      {menuOpcao}
      {extraOpcao}

    </Toolbar>
  };


  const finacxLogo = (
    <Typography className={logo} variant="h6" component="h1">
      <a className={logolink} href="#" > 
       FinancX </a>
    </Typography>
  );

  const menuOpcao = (
    <div className={menuStyle}>

      {menuItens.map(menuItem => {
        const {menuTitle, pageURL} = menuItem;
        return(
          <Button className={menuStyle} onClick={() =>botaoLink(pageURL)}>{menuTitle}</Button>
        )
      })}


    </div>
  );
    const extraOpcao = (
      <div className={menuStyle}>
        {tipo === 'ADMIN' && (
          <Button className={menuStyle} onClick={() =>botaoLink('/admin')}>Usuario</Button>
          
        )}
        <Button className={menuStyle} onClick={() => fazerLogout()}>Sair</Button>

      </div>
    );

  const mensagem = (
    <div className={mensagemBar}>
    Bem vindo {username}!
    </div>
  )
  return (
    <header>
      <BrowserRouter>
        <AppBar>{displayDesk()}</AppBar>


      </BrowserRouter>

    </header>
  );
}

const useStyles = makeStyles(() => ({
  logo: {
    fontFamily: "Ubuntu Mono, monospace",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
logolink: {
  color: "#FFFEFE",
  textDecoration: "none"
},
'&:hover': {
  color: "#FFFEFE",
 },
  menuStyle: {
    color: "#FFFEFE",
    textAlign: "right",
    marginLeft: "38px",
    size: "18px",
    fontWeight: 'bold'
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between"
  },
  mensagemBar: {
    fontFamily: "Ubuntu Mono, monospace",
    size: "18px",
    fontWeight: 600,
    fontWeight: 'bold'
  }
}))

export default withRouter(Header);