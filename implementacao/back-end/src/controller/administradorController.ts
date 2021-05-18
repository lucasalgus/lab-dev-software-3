import { Express } from "express";

import Administrador from "../model/administrador";
import Usuario from "../model/usuario";

class AdministradorController {
	static initialize(app: Express) {
		app.get("/administrador", async (req: any, res: any) => {
			try {
				const administradores = await Administrador.findAll();

				res.json(administradores);
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});

		app.post("/administrador", async (req: any, res: any) => {
			try {
				const { body } = req;

				const usuario = await Usuario.create({
					email: body.email,
					senha: body.senha,
				});

				const administrador = await Administrador.create({
					usuario_id: usuario.id,
				});

				res.json(JSON.stringify(administrador));
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});
	}
}

export default AdministradorController;
