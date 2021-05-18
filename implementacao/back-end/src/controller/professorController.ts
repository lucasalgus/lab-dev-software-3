import { Express } from "express";

import Professor from "../model/professor";
import Usuario from "../model/usuario";

class ProfessorController {
	static initialize(app: Express) {
		app.get("/professor", async (req: any, res: any) => {
			try {
				const professores = await Professor.findAll();

				res.json(professores);
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});

		app.post("/professor", async (req: any, res: any) => {
			try {
				const { body } = req;

				const usuario = await Usuario.create({
					email: body.email,
					senha: body.senha,
				});

				const professor = await Professor.create({
					nome: body.nome,
					cpf: body.cpf,
					departamento: body.departamento,
					saldo: 1000,
					usuario_id: usuario.id,
					instituicao_ensino_id: body.instituicaoEnsinoId,
				});

				res.json(JSON.stringify(professor));
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});
	}
}

export default ProfessorController;
