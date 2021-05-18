import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import Switch from "react-bootstrap/esm/Switch";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { clearType, getType } from "./api/auth";
import LoginPage from "./pages/LoginPage";
import ProfessoresPage from "./pages/ProfessoresPage";
import InstituicoesPage from "./pages/InstituicoesPage";

function App() {
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
								<Link className="nav-link" to="/cadastro">
									Cadastro
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
								<Link className="nav-link" to="/">
									Trocar moedas
								</Link>
							</>
						) : null}

						{getType() === "parceiro" ? (
							<>
								<Link className="nav-link" to="/">
									Cadastrar vantagem
								</Link>
							</>
						) : null}

						{getType() === "professor" ? (
							<>
								<Link className="nav-link" to="/">
									Transferir moedas
								</Link>
							</>
						) : null}

						{getType() ? (
							<Link className="nav-link" to="#" onClick={clearType}>
								Sair
							</Link>
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
						<Route exact path="/professores">
							<ProfessoresPage />
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
