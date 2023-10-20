import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormRestaurantes() {
    function formatarData(dataParam) {
        if (dataParam === null || dataParam === "" || dataParam === undefined) {
            return "";
        }

        let arrayData = dataParam.split("-");
        return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
    }
    const { state } = useLocation();
    const [idRestaurante, setIdRestaurante] = useState();

    const [nome, setNome] = useState();
    const [cnpj, setCnpj] = useState();
    const [valorPedidoMin, setValorPedidoMin] = useState();
   
    function salvar() {
        let restauranteRequest = {
            nome: nome,
            cnpj: cnpj,
            valorPedidoMin: valorPedidoMin,
            
        };

        if (idRestaurante != null) {
            //Alteração:
            axios
                .put("http://localhost:8082/api/restaurante/" + idRestaurante, restauranteRequest)
                .then((response) => {
                    console.log("Restaurante alterado com sucesso.");
                })
                .catch((error) => {
                    console.log("Erro ao alter um Restaurante.");
                });
        } else {
            //Cadastro:
            axios
                .post("http://localhost:8082/api/restaurante", restauranteRequest)
                .then((response) => {
                    console.log("Restaurante cadastrado com sucesso.");
                })
                .catch((error) => {
                    console.log("Erro ao incluir o Restaurante.");
                });
        }
    }

    useEffect(() => {
        if (state != null && state.id != null) {
            axios
                .get("http://localhost:8082/api/restaurante/" + state.id)
                .then((response) => {
                    setIdRestaurante(response.data.id);
                    setNome(response.data.nome);
                    setCnpj(response.data.cnpj);
                    setValorPedidoMin(response.data.valorPedidoMin);
                    
                });
        }
    }, [state]);

    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: "3%" }}>
                <Container textAlign="justified">
                    {idRestaurante === undefined && (
                        <h2>
                            {" "}
                            <span style={{ color: "darkgray" }}>
                                {" "}
                                Restaurante &nbsp;
                                <Icon name="angle double right" size="small" />{" "}
                            </span>{" "}
                            Cadastro
                        </h2>
                    )}
                    {idRestaurante != undefined && (
                        <h2>
                            {" "}
                            <span style={{ color: "darkgray" }}>
                                {" "}
                                Restaurante &nbsp;
                                <Icon name="angle double right" size="small" />{" "}
                            </span>{" "}
                            Alteração
                        </h2>
                    )}

                    <Divider />

                    <div style={{ marginTop: "4%" }}>
                        <Form>
                            <Form.Group widths="equal">
                                <Form.Input
                                    required
                                    fluid
                                    label="Nome"
                                    maxLength="100"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />

                                <Form.Input required fluid label="Cnpj">
                                    <InputMask
                                        required
                                        mask="99.999.999/9999-99"
                                        value={cnpj}
                                        onChange={(e) => setCnpj(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input fluid label="Valor Pedido Min" width={6}>
                                    <InputMask
                                        
                                        value={valorPedidoMin}
                                        onChange={(e) => setValorPedidoMin(e.target.value)}
                                    />
                                </Form.Input>

                                
                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: "4%" }}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition="left"
                                color="orange"
                            >
                                <Icon name="reply" />
                                <Link to={"/list-restaurantes"}>Voltar</Link>
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition="left"
                                color="blue"
                                floated="right"
                                onClick={() => salvar()}
                            >
                                <Icon name="save" />
                                Salvar
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
