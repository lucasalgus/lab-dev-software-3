import express from "express";
import cors from "cors";

import AdministradorController from "./controller/administradorController";

import Administrador from "./model/administrador";
import Usuario from "./model/usuario";
import Database from "./utils/database";
import AlunoController from "./controller/alunoController";
import ParceiroController from "./controller/parceiroController";
import ProfessorController from "./controller/professorController";
import UsuarioController from "./controller/usuarioController";
import Aluno from "./model/aluno";
import InstituicaoEnsino from "./model/instituicaoEnsino";
import Parceiro from "./model/parceiro";
import Professor from "./model/professor";
import Transacao from "./model/transacao";
import Vantagem from "./model/vantagem";

const app = express();
const port = 5000;
const db = new Database();

db.sequelize.addModels([
	Administrador,
	Aluno,
	InstituicaoEnsino,
	Parceiro,
	Professor,
	Transacao,
	Usuario,
	Vantagem,
]);

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
	res.send("API Moeda Estudantil");
	// const adm = await Administrador.create({ usuario_id: 2 });
});

AdministradorController.initialize(app);
AlunoController.initialize(app);
ParceiroController.initialize(app);
ProfessorController.initialize(app);
UsuarioController.initialize(app);

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
