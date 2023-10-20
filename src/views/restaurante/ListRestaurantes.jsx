import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListRestaurantes() {
    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    useEffect(() => {
        carregarLista();
    }, []);

    async function remover() {
        await axios
            .delete("http://localhost:8082/api/restaurante/" + idRemover)
            .then((response) => {
                console.log("Restaurante removido com sucesso.");

                axios.get("http://localhost:8082/api/restaurante").then((response) => {
                    setLista(response.data);
                });
            })
            .catch((error) => {
                console.log("Erro ao remover um restaurante.");
            });
        setOpenModal(false);
    }

    function confirmaRemover(id) {
        setOpenModal(true);
        setIdRemover(id);
    }

    function carregarLista() {
        axios
            .get("http://localhost:8082/api/restaurante")
            .then((response) => {
                setLista(response.data);
            })
            .catch((error) => {
                // Handle the error here
                console.error("Axios Error:", error);
            });
    }

    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: "3%" }}>
                <Container textAlign="justified">
                    <h2> Restaurantes </h2>
                    <Divider />

                    <div style={{ marginTop: "4%" }}>
                        <Button
                            label="Novo"
                            circular
                            color="orange"
                            icon="clipboard outline"
                            floated="right"
                            as={Link}
                            to="/form-restaurantes"
                        />
                        <br />
                        <br />
                        <br />

                        <Table color="orange" sortable celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>Cnpj</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Pedido Minimo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {lista.map((restaurante) => (
                                    <Table.Row key={restaurante.id}>
                                        <Table.Cell>{restaurante.nome}</Table.Cell>
                                        <Table.Cell>{restaurante.cnpj}</Table.Cell>
                                        <Table.Cell>{"R$ " + restaurante.valorPedidoMin}</Table.Cell>

                                        <Table.Cell textAlign="center">
                                            <Button
                                                inverted
                                                circular
                                                color="green"
                                                title="Clique aqui para editar os dados deste restaurante"
                                                icon
                                            >
                                                <Link
                                                    to="/form-restaurantes"
                                                    state={{ id: restaurante.id }}
                                                    style={{ color: "green" }}
                                                >
                                                    {" "}
                                                    <Icon name="edit" />{" "}
                                                </Link>
                                            </Button>{" "}
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color="red"
                                                title="Clique aqui para remover este restaurante"
                                                icon
                                                onClick={(e) => confirmaRemover(restaurante.id)}
                                            >
                                                <Icon name="trash" />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name="trash" />
                    <div style={{ marginTop: "5%" }}>
                        {" "}
                        Tem certeza que deseja remover esse registro?{" "}
                    </div>
                </Header>
                <Modal.Actions>
                    <Button
                        basic
                        color="red"
                        inverted
                        onClick={() => setOpenModal(false)}
                    >
                        <Icon name="remove" /> Não
                    </Button>
                    <Button color="green" inverted onClick={() => remover()}>
                        <Icon name="checkmark" /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}
