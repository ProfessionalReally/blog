import axios from 'axios';

export const deletePost = async (id: string) => {
	axios.delete(`${import.meta.env.VITE_BASE_URL}posts/${id}`);
};
