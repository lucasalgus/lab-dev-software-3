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
	tableName: "aluno",
	timestamps: false,
})
class Aluno extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id?: number;

	@Column
	nome!: string;

	@Column
	cpf!: string;

	@Column
	rg!: string;

	@Column
	endereco!: string;

	@Column
	curso!: string;

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

export default Aluno;
