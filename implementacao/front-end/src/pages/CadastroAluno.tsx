import { FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getReq, postReq } from "../api/api";

const CadastroAlunoPage = () => {
	const [instituicoes, setInstituicoes] = useState<any[]>([]);

	const addAluno = async (event: FormEvent) => {
		event.preventDefault();
		const { target } = event as any;

		const email = target.elements.email.value;
		const senha = target.elements.senha.value;
		const nome = target.elements.nome.value;
		const cpf = target.elements.cpf.value;
		const rg = target.elements.rg.value;
		const endereco = target.elements.endereco.value;
		const curso = target.elements.curso.value;
		const instituicaoEnsinoId = target.elements.instituicaoEnsinoId.value;

		await postReq("aluno", {
			email,
			senha,
			nome,
			cpf,
			rg,
			endereco,
			curso,
			instituicaoEnsinoId,
		});

		window.location.pathname = "/login";
	};

	useEffect(() => {
		getReq("instituicao-ensino").then((instituicoes) => {
			setInstituicoes(instituicoes);
		});
	}, []);

	return (
		<Form onSubmit={addAluno}>
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

			<Form.Group controlId="endereco">
				<Form.Label>Endereço</Form.Label>
				<Form.Control type="text" placeholder="Endereço" />
			</Form.Group>

			<Form.Group controlId="rg">
				<Form.Label>RG</Form.Label>
				<Form.Control type="text" placeholder="RG" />
			</Form.Group>

			<Form.Group controlId="cpf">
				<Form.Label>CPF</Form.Label>
				<Form.Control type="text" placeholder="CPF" />
			</Form.Group>

			<Form.Group controlId="curso">
				<Form.Label>Curso</Form.Label>
				<Form.Control type="text" placeholder="Curso" />
			</Form.Group>

			<Form.Group controlId="instituicaoEnsinoId">
				<Form.Label>Instituição de Ensino</Form.Label>
				<Form.Control as="select">
					{instituicoes.map((i) => (
						<option key={i.id} value={i.id}>
							{i.nome}
						</option>
					))}
				</Form.Control>
			</Form.Group>

			<br />

			<Button variant="primary" type="submit">
				Cadastrar
			</Button>
		</Form>
	);
};

export default CadastroAlunoPage;
