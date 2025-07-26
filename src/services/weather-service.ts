import axios from 'axios';

export type WeatherResponse = {
	city: string;
	main: {
		temp: number;
	};
	weather: {
		description: string;
		icon: string;
	}[];
};

export const weatherApi = axios.create({
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 5000,
});

export const getWeather = async (city: string) => {
	try {
		const { data } = await weatherApi.get(
			`${import.meta.env.VITE_BASE_WEATHER_URL}`,
			{
				params: {
					appid: import.meta.env.VITE_WEATHER_API_KEY,
					lang: 'ru',
					q: city,
					units: 'metric',
				},
			},
		);

		const weatherData: WeatherResponse = {
			city: data.name,
			main: {
				temp: data.main.temp,
			},
			weather: [
				{
					description: data.weather[0].description,
					icon: data.weather[0].icon,
				},
			],
		};
		return weatherData;
	} catch (error) {
		console.log('Ошибка при получении погоды: ', error);
		return null;
	}
};
