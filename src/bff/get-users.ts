import axios from 'axios';

export const getUsers = async () => {
	const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}users`);

	return data;
};
