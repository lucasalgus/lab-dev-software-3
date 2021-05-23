import { FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { deleteReq, getReq, postReq } from "../api/api";

const CadastrarVantagemPage = () => {
	const [modal, setModal] = useState(false);
	const [vantagens, setVantagens] = useState<any[]>([]);

	const getVantagem = async () => {
		const vantagens = await getReq("vantagem");

		setVantagens(vantagens);
	};

	const deleteVantagem = async (id: number) => {
		await deleteReq(`vantagem/${id}`);
		await getVantagem();
	};

	const addVantagem = async (event: FormEvent) => {
		event.preventDefault();
		const target = event.target as any;

		const data = new FormData();
		data.append("imagem", target.elements.imagem.files[0]);

		const descricao = target.elements.descricao.value;
		const valor = target.elements.valor.value;

		const json = localStorage.getItem("user");
		if (!json) {
			return;
		}

		const user = JSON.parse(json);

		try {
			const parceiro = await getReq(`parceiro/${user.id}`);

			const req = await fetch("http://localhost:5000/vantagem/imagem", {
				method: "POST",
				body: data,
			});

			const json = await req.json();

			await postReq("vantagem", {
				descricao,
				valor,
				parceiroId: parceiro.id,
				imagem: json.url,
			});
		} catch (error) {
			alert("Erro :(");
		}

		await getVantagem();
		setModal(false);
	};

	useEffect(() => {
		getVantagem().then();
	}, []);

	return (
		<>
			<h1>Vantagens</h1>
			<Button onClick={() => setModal(true)}>Adicionar novo</Button>
			<div style={{ marginBottom: "20px" }} />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Descrição</th>
						<th>Imagem</th>
						<th>Valor</th>
						<th>-</th>
					</tr>
				</thead>
				<tbody>
					{vantagens.map((i) => (
						<tr key={i.id}>
							<td>{i.id}</td>
							<td>{i.descricao}</td>
							<td>{<img src={i.imagem} alt="" height="300" />}</td>
							<td>{i.valor}</td>
							<td>
								<Button
									variant="danger"
									onClick={() => {
										deleteVantagem(i.id);
									}}
								>
									Excluir
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={modal} onHide={() => setModal(false)}>
				<Modal.Header>
					<Modal.Title>Cadastrar Instituição</Modal.Title>
				</Modal.Header>
				<Form onSubmit={addVantagem}>
					<Modal.Body>
						<Form.Group controlId="descricao">
							<Form.Label>Descrição</Form.Label>
							<Form.Control type="text" placeholder="Descrição" />
						</Form.Group>

						<br />

						<Form.Group controlId="imagem">
							<Form.Label>Imagem</Form.Label>
							<Form.Control type="file" placeholder="Imagem" />
						</Form.Group>
						<Form.Group controlId="valor">
							<Form.Label>Valor</Form.Label>
							<Form.Control type="number" placeholder="Valor" />
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

export default CadastrarVantagemPage;
