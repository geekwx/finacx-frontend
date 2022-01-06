
import './App.css';

import '@fontsource/roboto';



import {  makeStyles } from '@material-ui/core';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';

import { AuthProvider } from './Context/AuthContext';


function App() {
  const {boxMain} = useStyles();
  return (
    <AuthProvider>

  
  
      
      <Router>
      <div className={boxMain}> 
         <Routes /> 
  
      </div> 
  

   
    </Router>
    </AuthProvider>
  );
}

const useStyles = makeStyles(() => ({
 boxMain: {
   marginTop: "12vh"
}
}))

export default App;
