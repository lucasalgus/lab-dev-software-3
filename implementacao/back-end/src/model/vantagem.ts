import {
	AutoIncrement,
	Column,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";

import Parceiro from "./parceiro";

@Table({
	tableName: "vantagem",
	timestamps: false,
})
class Vantagem extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id?: number;

	@Column
	descricao!: string;

	@Column
	imagem!: string;

	@Column
	valor!: number;

	@ForeignKey(() => Parceiro)
	@Column
	private parceiro_id!: number;
	get parceiroId() {
		return this.parceiro_id;
	}
}

export default Vantagem;
