import { FC, useState } from 'react';
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
	position: relative;

	span {
		position: absolute;
		top: 0;
		right: 0;
		width: 105%;
		transform: translate(2.5%, 0);
		height: 42px;
		cursor: pointer;
	}
`;

const Footer = styled.footer`
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 1rem;
	gap: 0.25rem;

	a {
		color: #c0c0c0;
	}

	span {
		color: #c0c0c0;
	}
`;

const App: FC = () => {
	const [refresh, setRefresh] = useState<number>(0);
	return (
		<Container>
			<Header>
				<span onClick={() => setRefresh(refresh + 1)} /> WSB-Tickers
			</Header>
			<TickerCards refresh={refresh} />

			<Footer>
				<span>Developed By:</span>
				<a href="https://github.com/0mppula" target="_blank" rel="noopener noreferrer">
					Omar Kraidié
				</a>
			</Footer>
		</Container>
	);
};

export default App;
