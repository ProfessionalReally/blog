import { getWeather, type WeatherResponse } from '@src/services';
import { type FC, useEffect, useState } from 'react';
import styled from 'styled-components';

type FooterContainerType = {
	className?: string;
};

const FooterContainer: FC<FooterContainerType> = ({ className }) => {
	const [weather, setWeather] = useState<null | WeatherResponse>(null);
	const [loading, setLoading] = useState(false);

	const fetchWeather = async (city: string) => {
		setLoading(true);
		const weather = await getWeather(city);
		console.log(weather);
		if (weather) {
			setWeather(weather);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchWeather('Moscow');
	}, []);

	return (
		<footer className={className}>
			<div>
				<div>Блог web-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{loading
						? 'Загрузка...'
						: weather && (
								<>
									<div>
										{weather.city}
										{', '}
										{new Date().toLocaleString('ru', {
											day: 'numeric',
											month: 'long',
										})}
									</div>
									<div>
										{weather.weather[0].description}
										{', '}
										{Math.round(weather.main.temp)}°C
									</div>
								</>
							)}
				</div>
			</div>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	border: 3px solid #adadad;
	box-shadow: 0 -7px 35px 9px #616161;
	font-weight: bold;
`;
