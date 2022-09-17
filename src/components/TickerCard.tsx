import { FC } from 'react';

import { TickerCardContainer } from './TickerCardElements';
import { tickerType } from './TickerCards';

interface TickerCardProps {
	ticker: tickerType;
	index: number;
}

const TickerCard: FC<TickerCardProps> = ({ ticker, index }) => {
	return (
		<TickerCardContainer key={`${ticker}-${index}`}>
			<div className="card-top">
				<h2>{ticker.ticker}</h2>
				<h2
					className={`sentiment-emoji ${
						ticker.sentiment === 'Bullish' ? 'bull' : 'bear'
					}`}
				>
					{ticker.sentiment === 'Bullish' ? '🐂' : '🐻'}
				</h2>
			</div>
			<div>
				<p>
					Sentiment:{' '}
					<span className={`${ticker.sentiment_score <= 0 ? 'danger' : 'success'}`}>
						{ticker.sentiment}
					</span>
				</p>
				<p>
					Sentiment Score:{' '}
					<span className={`${ticker.sentiment_score <= 0 ? 'danger' : 'success'}`}>
						{ticker.sentiment_score}
					</span>
				</p>
				<p>Comments: {ticker.no_of_comments}</p>
			</div>
		</TickerCardContainer>
	);
};

export default TickerCard;
