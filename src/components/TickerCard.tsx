import { FC } from 'react';

import { TickerCardContainer } from './TickerCardElements';
import { tickerType } from './TickerCards';

type TickerCardProps = { ticker: tickerType; index: number };

const TickerCard: FC<TickerCardProps> = ({ ticker, index }) => {
	return (
		<TickerCardContainer key={`${ticker}-${index}`}>
			<p>{ticker.sentiment}</p>
		</TickerCardContainer>
	);
};

export default TickerCard;
