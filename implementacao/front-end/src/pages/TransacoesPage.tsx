import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getReq } from "../api/api";
import { getType } from "../api/auth";

const TransacoesPage = () => {
	const [transacoes, setTransacoes] = useState([]);

	const getTransacoes = async () => {
		if (getType() === "professor") {
			const json = localStorage.getItem("user");
			if (!json) {
				return;
			}

			const user = JSON.parse(json);
			const professor = await getReq(`professor/${user.id}`);

			const transacoes = await getReq(`transacao/${professor.id}`);

			setTransacoes(transacoes);
		} else {
			const json = localStorage.getItem("user");
			if (!json) {
				return;
			}

			const user = JSON.parse(json);
			const aluno = await getReq(`aluno/${user.id}`);

			const transacoes = await getReq(`transacao/${aluno.id}`);

			setTransacoes(transacoes);
		}
	};

	useEffect(() => {
		getTransacoes();
	}, []);

	return (
		<>
			<h1>Transações</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Remetente</th>
						<th>Valor</th>
					</tr>
				</thead>
				<tbody>
					{transacoes.map((transacao: any) => (
						<tr key={transacao.id}>
							<td>{transacao.id}</td>
							<td>{transacao.remetente_id}</td>
							<td>{transacao.valor}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default TransacoesPage;
