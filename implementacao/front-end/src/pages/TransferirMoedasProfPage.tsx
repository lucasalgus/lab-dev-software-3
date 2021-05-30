import { FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { getReq, postReq } from "../api/api";

const TransferirMoedasPage = () => {
	const [modal, setModal] = useState(false);
	const [alunoId, setAlunoId] = useState<number>(0);
	const [alunos, setAlunos] = useState<any[]>([]);

	const getAlunos = async () => {
		const alunos = await getReq("aluno");

		setAlunos(alunos);
	};

	const transferir = async (event: FormEvent) => {
		event.preventDefault();
		const target = event.target as any;

		const quantidade = target.elements.quantidade.value;

		const json = localStorage.getItem("user");
		if (!json) {
			return;
		}

		const user = JSON.parse(json);
		const professor = await getReq(`professor/${user.id}`);

		await postReq("professor/transferir", {
			quantidade: +quantidade,
			alunoId,
			professorId: professor.id,
		});

		window.location.reload();
	};

	useEffect(() => {
		getAlunos().then();
	}, []);

	return (
		<>
			<h1>Alunos</h1>
			<div style={{ marginBottom: "20px" }} />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Nome</th>
						<th>-</th>
					</tr>
				</thead>
				<tbody>
					{alunos.map((i) => (
						<tr key={i.id}>
							<td>{i.id}</td>
							<td>{i.nome}</td>
							<td>
								<Button
									onClick={() => {
										setAlunoId(i.id);
										setModal(true);
									}}
								>
									Transferir
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={modal} onHide={() => setModal(false)}>
				<Modal.Header>
					<Modal.Title>Transferir</Modal.Title>
				</Modal.Header>
				<Form onSubmit={transferir}>
					<Modal.Body>
						<Form.Group controlId="quantidade">
							<Form.Label>Quantidade</Form.Label>
							<Form.Control type="number" placeholder="Quantidade" />
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
							Transferir
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default TransferirMoedasPage;
