import React, { useContext } from 'react';

import { Route, Redirect } from 'react-router-dom';


import {Context} from './Context/AuthContext';

function PrivateRoute({component: Component, ...rest}){
    const { authenticated } = useContext(Context);

    return (<Route  
        {...rest}
        render={ props => (
        authenticated ? (
          
             <Component {...props} />
             
        ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location}}} />
                    )
    )} />)
}

export default PrivateRoute;