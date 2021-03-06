import { FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { getReq, postReq } from "../api/api";

const InstituicoesPage = () => {
	const [modal, setModal] = useState(false);
	const [instituicoes, setInstituicoes] = useState<any[]>([]);

	const getInstituicoes = async () => {
		const instituicoes = await getReq("instituicao-ensino");

		setInstituicoes(instituicoes);
	};

	const addInstituicao = async (event: FormEvent) => {
		event.preventDefault();
		const target = event.target as any;

		const nome = target.elements.nome.value;

		await postReq("instituicao-ensino", {
			nome,
		});

		await getInstituicoes();
		setModal(false);
	};

	useEffect(() => {
		getInstituicoes().then();
	}, []);

	return (
		<>
			<h1>Instituições de Ensino</h1>
			<Button onClick={() => setModal(true)}>Adicionar novo</Button>
			<div style={{ marginBottom: "20px" }} />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Nome</th>
					</tr>
				</thead>
				<tbody>
					{instituicoes.map((i) => (
						<tr key={i.id}>
							<td>{i.id}</td>
							<td>{i.nome}</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={modal} onHide={() => setModal(false)}>
				<Modal.Header>
					<Modal.Title>Cadastrar Instituição</Modal.Title>
				</Modal.Header>
				<Form onSubmit={addInstituicao}>
					<Modal.Body>
						<Form.Group controlId="nome">
							<Form.Label>Nome</Form.Label>
							<Form.Control type="text" placeholder="Nome" />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							type="button"
							onClick={() => setModal(false)}
						>
							Fechar
						</Button>
						<Button variant="primary" type="submit">
							Cadastrar
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default InstituicoesPage;
