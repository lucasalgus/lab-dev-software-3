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
	tableName: "administrador",
	timestamps: false,
})
class Administrador extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id?: number;

	@ForeignKey(() => Usuario)
	@Column
	private usuario_id!: number;
	get usuarioId() {
		return this.usuario_id;
	}
}

export default Administrador;
