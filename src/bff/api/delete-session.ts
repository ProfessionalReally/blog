import axios from 'axios';

export const deleteSession = async (id: string) => {
	axios.delete(`${import.meta.env.VITE_BASE_URL}sessions/${id}`);
};
