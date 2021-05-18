import {
	AutoIncrement,
	Column,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";

import Professor from "./professor";
import Aluno from "./aluno";

@Table({
	tableName: "transacao",
	timestamps: false,
})
class Transacao extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id?: number;

	@Column
	valor!: number;

	@ForeignKey(() => Professor)
	@Column
	private remetente_id!: number;
	get remetenteId() {
		return this.remetente_id;
	}

	@ForeignKey(() => Aluno)
	@Column
	private destinatario_id!: number;
	get destinatarioId() {
		return this.destinatario_id;
	}
}

export default Transacao;
