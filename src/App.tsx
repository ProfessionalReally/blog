import styled from 'styled-components';

const Div = styled.div`
	text-align: center;
`;

export const App = () => (
	<Div>
		<i aria-hidden='true' className='fa fa-car'></i>
		Hello world
	</Div>
);
