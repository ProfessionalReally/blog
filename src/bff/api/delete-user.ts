import axios from 'axios';

export const deleteUser = (id: string) => {
	axios.delete(`${import.meta.env.VITE_BASE_URL}users/${id}`);
};
