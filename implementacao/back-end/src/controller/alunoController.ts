import { Express } from "express";

import Aluno from "../model/aluno";
import Usuario from "../model/usuario";

class AlunoController {
	static initialize(app: Express) {
		app.get("/aluno", async (req: any, res: any) => {
			try {
				const alunos = await Aluno.findAll();

				res.json(alunos);
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});

		app.post("/aluno", async (req: any, res: any) => {
			try {
				const { body } = req;

				const usuario = await Usuario.create({
					email: body.email,
					senha: body.senha,
				});

				const aluno = await Aluno.create({
					id: body.id,
					nome: body.nome,
					cpf: body.cpf,
					rg: body.rg,
					endereco: body.endereco,
					curso: body.curso,
					saldo: body.saldo,
					usuario_id: usuario.id,
					instituicao_ensino_id: body.instituicao_ensino_id,
				});

				res.json(JSON.stringify(aluno));
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});
	}
}

export default AlunoController;
