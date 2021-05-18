const baseAddress = "http://localhost:5000";

export const getReq = async (path: string) => {
	try {
		const data = await fetch(`${baseAddress}/${path}`, {
			method: "GET",
		});

		const json = await data.json();

		return json;
	} catch (error) {
		throw error;
	}
};

export const postReq = async (path: string, body: any) => {
	try {
		const data = await fetch(`${baseAddress}/${path}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		return data;
	} catch (error) {
		throw error;
	}
};

export const putReq = async (path: string, body: any) => {
	try {
		const data = await fetch(`${baseAddress}/${path}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		return data;
	} catch (error) {
		throw error;
	}
};

export const deleteReq = async (path: string) => {
	try {
		const data = await fetch(`${baseAddress}/${path}`, {
			method: "DELETE",
		});

		return data;
	} catch (error) {
		throw error;
	}
};
