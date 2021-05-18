import {
	AutoIncrement,
	Column,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";

@Table({
	tableName: "usuario",
	timestamps: false,
})
class Usuario extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id?: number;

	@Column
	email!: string;

	@Column
	senha!: string;
}

export default Usuario;
