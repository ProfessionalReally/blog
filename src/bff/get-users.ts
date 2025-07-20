export const getUsers = () =>
	fetch(`${import.meta.env.VITE_BASE_URL}/users`).then((res) => res.json());
