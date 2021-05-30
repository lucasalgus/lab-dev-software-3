import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import Switch from "react-bootstrap/esm/Switch";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { clearType, getType } from "./api/auth";
import LoginPage from "./pages/LoginPage";
import ProfessoresPage from "./pages/ProfessoresPage";
import InstituicoesPage from "./pages/InstituicoesPage";
import CadastroParceiroPage from "./pages/CadastroParceiro";
import CadastroAlunoPage from "./pages/CadastroAluno";
import { useEffect, useState } from "react";
import { getReq } from "./api/api";
import TransferirMoedasProfPage from "./pages/TransferirMoedasProfPage";
import CadastrarVantagemPage from "./pages/CadastrarVantagemPage";
import TrocarMoedasPage from "./pages/TrocarMoedasPage";
import TransacoesPage from "./pages/TransacoesPage";

function App() {
	const [saldo, setSaldo] = useState(0);

	useEffect(() => {
		const json = localStorage.getItem("user");
		if (!json) {
			return;
		}
		const user = JSON.parse(json);
		if (getType() === "professor") {
			getReq(`professor/${user.id}`).then((prof) => {
				setSaldo(prof.saldo);
			});
		}
		if (getType() === "aluno") {
			getReq(`aluno/${user.id}`).then((aluno) => {
				setSaldo(aluno.saldo);
			});
		}
	}, []);

	return (
		<div>
			<BrowserRouter>
				<Navbar bg="light">
					<Navbar.Brand href="/">Moeda Estudantil</Navbar.Brand>
					<Nav>
						<Link className="nav-link" to="/">
							Início
						</Link>
						{!getType() ? (
							<>
								<Link className="nav-link" to="/login">
									Login
								</Link>
								<Link className="nav-link" to="/cadastro-aluno">
									Cadastro Aluno
								</Link>
								<Link className="nav-link" to="/cadastro-parceiro">
									Cadastro Parceiro
								</Link>
							</>
						) : null}

						{getType() === "administrador" ? (
							<>
								<Link className="nav-link" to="/professores">
									Professores
								</Link>
								<Link className="nav-link" to="/instituicoes">
									Instituições
								</Link>
							</>
						) : null}

						{getType() === "aluno" ? (
							<>
								<Link className="nav-link" to="/trocar-moedas">
									Trocar moedas
								</Link>
								<Link className="nav-link" to="/transacoes">
									Transações
								</Link>
							</>
						) : null}

						{getType() === "parceiro" ? (
							<>
								<Link className="nav-link" to="/cadastrar-vantagem">
									Cadastrar Vantagem
								</Link>
							</>
						) : null}

						{getType() === "professor" ? (
							<>
								<Link className="nav-link" to="/transferir-moedas-prof">
									Transferir Moedas
								</Link>
								<Link className="nav-link" to="/transacoes">
									Transações
								</Link>
							</>
						) : null}

						{getType() ? (
							<Link
								className="nav-link"
								to="#"
								onClick={() => {
									clearType();
									window.location.reload();
								}}
							>
								Sair
							</Link>
						) : null}

						{getType() === "professor" || getType() === "aluno" ? (
							<span className="nav-link">Saldo: {saldo}</span>
						) : null}
					</Nav>
				</Navbar>
				<div style={{ margin: "20px 40px" }}>
					<Switch>
						<Route exact path="/">
							<h1>Home Moeda Estudantil</h1>
						</Route>
						<Route exact path="/login">
							<LoginPage />
						</Route>
						<Route exact path="/cadastro-aluno">
							<CadastroAlunoPage />
						</Route>
						<Route exact path="/cadastro-parceiro">
							<CadastroParceiroPage />
						</Route>
						<Route exact path="/trocar-moedas">
							<TrocarMoedasPage />
						</Route>
						<Route exact path="/transferir-moedas-prof">
							<TransferirMoedasProfPage />
						</Route>
						<Route exact path="/cadastrar-vantagem">
							<CadastrarVantagemPage />
						</Route>
						<Route exact path="/professores">
							<ProfessoresPage />
						</Route>
						<Route exact path="/transacoes">
							<TransacoesPage />
						</Route>
						<Route exact path="/instituicoes">
							<InstituicoesPage />
						</Route>
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
