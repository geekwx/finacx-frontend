import React, {useContext} from "react";
import { Switch, Route} from 'react-router-dom';

import Inicial from './pages/Inicial/Inicial'



import CadastroCategoria from "./pages/FormularioCadastro/CadastroCategoria";
import CadastroConta from "./pages/FormularioCadastro/CadastroConta";
import CadastroMovimento from "./pages/FormularioCadastro/CadastroMovimento";

import CadastroUsuario from './pages/Usuario/CadastroUsuario';


import Login from './pages/Login/Login'

import PrivateRoute from "./PrivateRoute";

function Routes(){
   
    return(
        <div>
          
            
             <Switch>

                <Route path="/" exact component={Login} />
                <PrivateRoute path="/app"  component={Inicial} />
                <PrivateRoute path="/categoria"  component={CadastroCategoria} />
                <PrivateRoute path="/conta"  component={CadastroConta} />
                <PrivateRoute path="/movimento"  component={CadastroMovimento} />
                <PrivateRoute path="/admin"  component={CadastroUsuario} />

         </Switch>
              
        </div>
    );
}

export default Routes;
