import {
	AutoIncrement,
	Column,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";

import Usuario from "./usuario";

@Table({
	tableName: "parceiro",
	timestamps: false,
})
class Parceiro extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id?: number;

	@Column
	nome!: string;

	@Column
	cnpj!: string;

	@ForeignKey(() => Usuario)
	@Column
	private usuario_id!: number;
	get usuarioId() {
		return this.usuario_id;
	}
}

export default Parceiro;
