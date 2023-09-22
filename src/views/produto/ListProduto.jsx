import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListProduto () {

   const [lista, setLista] = useState([]);

   useEffect(() => {
       carregarLista();
   }, [])

   function carregarLista() {

       axios.get("http://localhost:8082/api/produto")
       .then((response) => {
           setLista(response.data)
           
       })
       .catch((error) => {
        // Handle the error here
        console.error('Axios Error:', error); 
   })};
   
return(
    <div>
        <MenuSistema />
        <div style={{marginTop: '3%'}}>

            <Container textAlign='justified' >

                <h2> Produtos </h2>
                <Divider />

                <div style={{marginTop: '4%'}}>
                    <Button
                        label='Novo'
                        circular
                        color='orange'
                        icon='clipboard outline'
                        floated='right'
                        as={Link}
                        to='/form-produto'
                    />
             <br/><br/><br/>
                  
                  <Table color='orange' sortable celled>

                      <Table.Header>
                          <Table.Row>
                              <Table.HeaderCell>Titulo</Table.HeaderCell>
                              <Table.HeaderCell>Descrição</Table.HeaderCell>
                              <Table.HeaderCell>Valor Unitario</Table.HeaderCell>
                              <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                          </Table.Row>
                      </Table.Header>
                 
                      <Table.Body>

                          { lista.map(produto => (

                              <Table.Row key={produto.id}>
                                  <Table.Cell>{produto.titulo}</Table.Cell>
                                  <Table.Cell>{produto.descricao}</Table.Cell>
                                  <Table.Cell>{"R$ "+produto.valorUnitario}</Table.Cell>
                                  
                                  
                                  <Table.Cell textAlign='center'>

                                      <Button
                                          inverted
                                          circular
                                          color='green'
                                          title='Clique aqui para editar os dados deste produto'
                                          icon>
                                               <Icon name='edit' />
                                      </Button> &nbsp;
                                      <Button
                                               inverted
                                               circular
                                               color='red'
                                               title='Clique aqui para remover este produto'
                                               icon>
                                                   <Icon name='trash' />
                                           </Button>

                                       </Table.Cell>
                                   </Table.Row>
                               ))}

                           </Table.Body>
                       </Table>
                   </div>
               </Container>
           </div>

       </div>
   )
}
      
            
