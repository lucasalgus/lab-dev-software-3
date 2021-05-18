import { Sequelize } from "sequelize-typescript";

class Database {
	#sequelize: Sequelize;

	constructor() {
		this.#sequelize = new Sequelize({
			database: "moeda_estudantil",
			host: "localhost",
			port: 8889,
			username: "root",
			password: "root",
			dialect: "mysql",
			models: [__dirname + "/model"],
		});
	}

	get sequelize() {
		return this.#sequelize;
	}
}

export default Database;
