import { FC, useEffect, useState } from 'react';
import axios from 'axios';

import { TickerCardsContainer } from './TickerCardElements';
import TickerCard from './TickerCard';
import TickerCardTools from './TickerCardTools';

export type tickerType = {
	no_of_comments: number; // "no_of_comments": 49,
	sentiment: string; // "sentiment": "Bearish",
	sentiment_score: number; // "sentiment_score": -0.392,
	ticker: string; // "ticker": "BBBY"
};

const TickerCards: FC = () => {
	const [tickers, setTickers] = useState<tickerType[] | null>(null);

	useEffect(() => {
		const getData = async () => {
			// 'https://tradestie.com/api/v1/apps/reddit?date=2022-04-03'
			const url = '/api/v1/apps/reddit';
			const response = await axios.get(url);
			setTickers(response.data);

			// TOO MANY == response.status 429
		};

		getData();
	}, []);

	return (
		<>
			<TickerCardTools />

			<TickerCardsContainer>
				{tickers &&
					tickers?.map((ticker, index): any => (
						<TickerCard key={`${ticker}-${index}`} ticker={ticker} index={index} />
					))}
			</TickerCardsContainer>
		</>
	);
};

export default TickerCards;
