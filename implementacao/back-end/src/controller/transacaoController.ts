import { Express } from "express";
import Aluno from "../model/aluno";

import Professor from "../model/professor";
import Transacao from "../model/transacao";
import Usuario from "../model/usuario";

class TransacaoController {
	static initialize(app: Express) {
		app.get("/transacao/:id", async (req: any, res: any) => {
			try {
				const transacoes = await Transacao.findAll({
					where: { destinatario_id: +req.params.id },
				});

				res.json(transacoes);
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});
	}
}

export default TransacaoController;
