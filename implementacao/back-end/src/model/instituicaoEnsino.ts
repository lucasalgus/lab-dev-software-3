import {
	AutoIncrement,
	Column,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";

@Table({
	tableName: "instituicao_ensino",
	timestamps: false,
})
class InstituicaoEnsino extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id?: number;

	@Column
	nome!: string;
}

export default InstituicaoEnsino;
