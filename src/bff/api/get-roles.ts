import axios from 'axios';

export const getRoles = async () => {
	const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}roles`);

	return data;
};
