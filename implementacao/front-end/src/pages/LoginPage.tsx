import { FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { postReq } from "../api/api";

const LoginPage = () => {
	const login = async (event: FormEvent) => {
		event.preventDefault();
		const target = event.target as any;

		const email = target.elements.email.value;
		const password = target.elements.password.value;

		const login = await postReq("usuario/login", { email, senha: password });
		const json = await login.json();

		if (json?.type) {
			localStorage.setItem("type", json.type);
			localStorage.setItem("user", JSON.stringify(json.usuario));
			window.location.href = "/";
		} else {
			alert("Usuário ou senha inválidos.");
		}
	};

	return (
		<Form onSubmit={login}>
			<Form.Group controlId="email">
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" placeholder="Email" />
			</Form.Group>

			<Form.Group controlId="password">
				<Form.Label>Senha</Form.Label>
				<Form.Control type="password" placeholder="Senha" />
			</Form.Group>
			<br />
			<Button variant="primary" type="submit">
				Entrar
			</Button>
		</Form>
	);
};

export default LoginPage;
