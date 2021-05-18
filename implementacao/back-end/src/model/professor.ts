import {
	AutoIncrement,
	Column,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";

import Usuario from "./usuario";
import InstituicaoEnsino from "./instituicaoEnsino";

@Table({
	tableName: "professor",
	timestamps: false,
})
class Professor extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id?: number;

	@Column
	nome!: string;

	@Column
	cpf!: string;

	@Column
	departamento!: string;

	@Column
	saldo!: number;

	@ForeignKey(() => Usuario)
	@Column
	private usuario_id!: number;
	get usuarioId() {
		return this.usuario_id;
	}

	@ForeignKey(() => InstituicaoEnsino)
	@Column
	private instituicao_ensino_id!: number;
	get instituicaoEnsinoId() {
		return this.instituicao_ensino_id;
	}
}

export default Professor;
