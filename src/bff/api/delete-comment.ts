import axios from 'axios';

export const deleteComment = async (id: string) => {
	axios.delete(`${import.meta.env.VITE_BASE_URL}comments/${id}`);
};
