import { FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { getReq, postReq } from "../api/api";

const ProfessoresPage = () => {
	const [modal, setModal] = useState(false);
	const [professores, setProfessores] = useState<any[]>([]);

	const getProfessor = async () => {
		const instituicoes = await getReq("professor");

		setProfessores(instituicoes);
	};

	const addProfessor = async (event: FormEvent) => {
		event.preventDefault();
		const target = event.target as any;

		const email = target.elements.email.value;
		const senha = target.elements.senha.value;
		const nome = target.elements.nome.value;
		const cpf = target.elements.cpf.value;
		const departamento = target.elements.departamento.value;
		const instituicaoEnsinoId = target.elements.instituicaoEnsinoId.value;

		await postReq("professor", {
			email,
			senha,
			nome,
			cpf,
			departamento,
			instituicaoEnsinoId,
		});

		await getProfessor();
		setModal(false);
	};

	useEffect(() => {
		getProfessor().then();
	}, []);

	return (
		<>
			<h1>Professores</h1>
			<Button onClick={() => setModal(true)}>Adicionar novo</Button>
			<div style={{ marginBottom: "20px" }} />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Nome</th>
						<th>CPF</th>
						<th>Departamento</th>
						<th>Saldo</th>
						<th>Instituicao Ensino</th>
					</tr>
				</thead>
				<tbody>
					{professores.map((i) => (
						<tr key={i.id}>
							<td>{i.id}</td>
							<td>{i.nome}</td>
							<td>{i.cpf}</td>
							<td>{i.departamento}</td>
							<td>{i.saldo}</td>
							<td>{i.instituicaoEnsinoId}</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={modal} onHide={() => setModal(false)}>
				<Modal.Header>
					<Modal.Title>Cadastrar Professor</Modal.Title>
				</Modal.Header>
				<Form onSubmit={addProfessor}>
					<Modal.Body>
						<Form.Group controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="text" placeholder="Email" />
						</Form.Group>

						<Form.Group controlId="senha">
							<Form.Label>Senha</Form.Label>
							<Form.Control type="text" placeholder="Senha" />
						</Form.Group>

						<Form.Group controlId="nome">
							<Form.Label>Nome</Form.Label>
							<Form.Control type="text" placeholder="Nome" />
						</Form.Group>

						<Form.Group controlId="cpf">
							<Form.Label>CPF</Form.Label>
							<Form.Control type="text" placeholder="CPF" />
						</Form.Group>

						<Form.Group controlId="departamento">
							<Form.Label>Departamento</Form.Label>
							<Form.Control type="text" placeholder="Departamento" />
						</Form.Group>

						<Form.Group controlId="instituicaoEnsinoId">
							<Form.Label>Instituição de Ensino ID</Form.Label>
							<Form.Control type="number" placeholder="Departamento" />
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

export default ProfessoresPage;
