import { Express } from "express";
import { readFile } from "fs";
import multer from "multer";
import { resolve } from "path";

import Vantagem from "../model/vantagem";

const upload = multer({ dest: "uploads/" });

class VantagemController {
	static initialize(app: Express) {
		app.get("/vantagem", async (req: any, res: any) => {
			try {
				const vantagens = await Vantagem.findAll();

				res.json(vantagens);
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});

		app.get("/vantagem/:parceiroId", async (req: any, res: any) => {
			try {
				const vantagens = await Vantagem.findAll({
					where: { parceiro_id: req.params.parceiroId },
				});

				res.json(vantagens);
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});

		app.get("/vantagem/imagem/:id", (req: any, res: any) => {
			const pathname = resolve(__dirname, `../../uploads/${req.params.id}`);

			readFile(pathname, (err, data) => {
				if (err) {
					readFile(resolve(__dirname, `../../404_image.png`), (err, data) => {
						res.writeHead(200, { "Content-Type": "image/png" });
						res.end(data);
					});

					return;
				}

				res.writeHead(200, { "Content-Type": "image/png" });
				res.end(data);
			});
		});

		app.post(
			"/vantagem/imagem",
			upload.single("imagem"),
			(req: any, res: any) => {
				res.json({
					url: "http://localhost:5000/vantagem/imagem/" + req.file.filename,
				});
			}
		);

		app.post("/vantagem", async (req: any, res: any) => {
			try {
				const { body } = req;

				const vantagem = await Vantagem.create({
					descricao: body.descricao,
					imagem: body.imagem,
					valor: body.valor,
					parceiro_id: body.parceiroId,
				});

				res.json(vantagem);
			} catch (error) {
				res.json(JSON.stringify(error));
			}
		});

		app.delete("/vantagem/:id", async (req: any, res: any) => {
			try {
				const { id } = req.params;
				const vantagem = await Vantagem.findOne({ where: { id } });

				vantagem?.destroy();

				res.json({});
			} catch (error) {
				res.json(error);
			}
		});
	}
}

export default VantagemController;
