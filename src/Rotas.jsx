import React from 'react';
import { Route, Routes } from "react-router-dom";
import FormCliente from './views/cliente/FormCliente';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
;

function Rotas() {
   return (
       <>

           <Routes>
               <Route path="/" element={ <Home/> } />
               <Route path='form-produto' element={<FormProduto/>} />
               <Route path="form-cliente" element={ <FormCliente/> } />         
           </Routes>

       </>
   )
}

export default Rotas
