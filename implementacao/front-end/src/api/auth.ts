export const getType = () => {
	const tipo = localStorage.getItem("type");

	return tipo;
};

export const clearType = () => {
	localStorage.removeItem("type");
};
