import React from "react";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';


function Paginacao({pagina, voltar, avancar, funAvancar, funVoltar}){

    return(
       <div>
           { voltar ? (
               <IconButton aria-label="left" onClick={funVoltar} color="primary">
               <ArrowBackIcon />
               </IconButton>
           )  : (
            <IconButton aria-label="left" disabled color="primary">
            <ArrowBackIcon/>
            </IconButton>
           ) }
           
           
           {pagina}
            {  avancar ? (
                <IconButton  aria-label="right" onClick={funAvancar} color="primary">
                <ArrowForwardIcon/>
            </IconButton>
            ) : (
                <IconButton disabled aria-label="right" color="primary">
               <ArrowForwardIcon/>
           </IconButton>     
            )

            }
           
       </div>
    );
}

export default Paginacao;