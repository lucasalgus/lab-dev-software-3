import { Express } from "express";
import Administrador from "../model/administrador";
import Aluno from "../model/aluno";

import Parceiro from "../model/parceiro";
import Professor from "../model/professor";
import Usuario from "../model/usuario";

class UsuarioController {
	static initialize(app: Express) {
		app.post("/usuario/login", async (req: any, res: any) => {
			try {
				const usuarios = await Usuario.findAll();
				const administradores = await Administrador.findAll();
				const alunos = await Aluno.findAll();
				const parceiros = await Parceiro.findAll();
				const professores = await Professor.findAll();

				const { email, senha } = req.body;

				const usuario = usuarios.find(
					(u) => u.email === email && u.senha === senha
				);

				if (!usuario) {
					res.json({ usuario });
				}

				const isAdministrador = administradores.find(
					(u) => u.usuarioId === usuario?.id
				);
				const isAluno = alunos.find((u) => u.usuarioId === usuario?.id);
				const isParceiro = parceiros.find((u) => u.usuarioId === usuario?.id);
				const isProfessor = professores.find(
					(u) => u.usuarioId === usuario?.id
				);

				res.json({
					usuario,
					type: isAdministrador
						? "administrador"
						: isAluno
						? "aluno"
						: isParceiro
						? "parceiro"
						: isProfessor
						? "professor"
						: null,
				});
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});
	}
}

export default UsuarioController;
