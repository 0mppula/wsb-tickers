import { FC } from 'react';
import styled from 'styled-components';

import TickerCards from './components/TickerCards';
import './index.css';

const Container = styled.div`
	padding-top: 1rem;
	display: flex;
	min-height: 100vh;
	width: min(1200px, 93vw);
	margin: 0 auto;
	flex-direction: column;
	align-items: center;
`;

const Header = styled.h1`
	font-size: 3rem;
	text-transform: uppercase;
	margin-bottom: 1rem;
`;

const App: FC = () => {
	return (
		<Container>
			<Header>WSB-Tickers</Header>
			<TickerCards />
		</Container>
	);
};

export default App;
