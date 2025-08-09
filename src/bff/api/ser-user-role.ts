import axios from 'axios';

export const setUserRole = async (id: string, roleId: string) => {
	const response = axios.patch(
		`${import.meta.env.VITE_BASE_URL}users/${id}`,
		{
			role_id: roleId,
		},
	);
	const { data } = await response;

	return data;
};
