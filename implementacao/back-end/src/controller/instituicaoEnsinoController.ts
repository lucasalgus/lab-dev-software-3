import { Express } from "express";

import InstituicaoEnsino from "../model/instituicaoEnsino";

class InstituicaoEnsinoController {
	static initialize(app: Express) {
		app.get("/instituicao-ensino", async (req: any, res: any) => {
			try {
				const instituicoesEnsino = await InstituicaoEnsino.findAll();

				res.json(instituicoesEnsino);
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});

		app.post("/instituicao-ensino", async (req: any, res: any) => {
			try {
				const { body } = req;

				const instituicaoEnsino = await InstituicaoEnsino.create({
					nome: body.nome,
				});

				res.json(JSON.stringify(instituicaoEnsino));
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});
	}
}

export default InstituicaoEnsinoController;
