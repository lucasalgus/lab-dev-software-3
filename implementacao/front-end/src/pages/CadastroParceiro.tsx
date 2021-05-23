import { FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { postReq } from "../api/api";

const CadastroParceiroPage = () => {
	const addParceiro = async (event: FormEvent) => {
		event.preventDefault();
		const { target } = event as any;

		const email = target.elements.email.value;
		const senha = target.elements.senha.value;
		const nome = target.elements.nome.value;
		const cnpj = target.elements.cnpj.value;

		await postReq("parceiro", {
			email,
			senha,
			nome,
			cnpj,
		});

		window.location.pathname = "/login";
	};

	return (
		<Form onSubmit={addParceiro}>
			<Form.Group controlId="email">
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" placeholder="Email" />
			</Form.Group>

			<Form.Group controlId="senha">
				<Form.Label>Senha</Form.Label>
				<Form.Control type="password" placeholder="Senha" />
			</Form.Group>

			<Form.Group controlId="nome">
				<Form.Label>Nome</Form.Label>
				<Form.Control type="text" placeholder="Nome" />
			</Form.Group>

			<Form.Group controlId="cnpj">
				<Form.Label>CNPJ</Form.Label>
				<Form.Control type="text" placeholder="CNPJ" />
			</Form.Group>

			<br />

			<Button variant="primary" type="submit">
				Cadastrar
			</Button>
		</Form>
	);
};

export default CadastroParceiroPage;
