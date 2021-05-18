import { Express } from "express";

import Parceiro from "../model/parceiro";
import Usuario from "../model/usuario";

class ParceiroController {
	static initialize(app: Express) {
		app.get("/parceiro", async (req: any, res: any) => {
			try {
				const professores = await Parceiro.findAll();

				res.json(professores);
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});

		app.post("/parceiro", async (req: any, res: any) => {
			try {
				const { body } = req;

				const usuario = await Usuario.create({
					email: body.email,
					senha: body.senha,
				});

				const parceiro = await Parceiro.create({
					usuario_id: usuario.id,
				});

				res.json(JSON.stringify(parceiro));
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});
	}
}

export default ParceiroController;
