import { Express } from "express";
import Aluno from "../model/aluno";

import Professor from "../model/professor";
import Transacao from "../model/transacao";
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

		app.get("/professor/:id", async (req: any, res: any) => {
			try {
				const professor = await Professor.findOne({
					where: { usuario_id: +req.params.id },
				});

				res.json(professor);
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});

		app.post("/professor/add-saldo", async (req: any, res: any) => {
			try {
				const professores = await Professor.findAll();

				professores.forEach((professor) => {
					professor.saldo += 1000;
					professor.save();
				});

				res.json({});
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});

		app.post("/professor/transferir", async (req: any, res: any) => {
			try {
				const { body } = req;

				const professor = await Professor.findOne({
					where: { id: +body.professorId },
				});
				const aluno = await Aluno.findOne({ where: { id: +body.alunoId } });

				if (!professor || !aluno) {
					return;
				}

				if (professor.saldo < body.quantidade || professor.saldo <= 0) {
					return;
				}

				professor.saldo -= body.quantidade;
				aluno.saldo += body.quantidade;

				professor.save();
				aluno.save();

				await Transacao.create({
					valor: body.quantidade,
					remetente_id: body.professorId,
					destinatario_id: body.alunoId,
				});

				res.json({});
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
