import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

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
	const [filteredTickers, setFilteredTickers] = useState<tickerType[] | null>(tickers);
	const [loading, setLoading] = useState<Boolean>(false);
	const [date, setDate] = useState<Date>(new Date());
	const [tooFast, setTooFast] = useState<Boolean>(false);

	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			// 'https://tradestie.com/api/v1/apps/reddit?date=2022-04-03'
			const formattedDate = moment(date).format('YYYY-MM-DD');
			const url = `/api/v1/apps/reddit?date=${formattedDate}`;
			const response = await axios.get(url);

			setLoading(false);
			// The API's limit is 10 calls / min if exceeded response status will be 429
			if (response.status === 429) {
				setTooFast(true);
				return;
			}

			setTickers(response.data);
			setFilteredTickers(response.data);
			setTooFast(false);
		};

		getData();
	}, [date]);

	if (loading) return <p>LOADING...</p>;

	return (
		<>
			{tickers && filteredTickers && (
				<>
					<TickerCardTools
						date={date}
						setDate={setDate}
						tickers={tickers}
						setTickers={setTickers}
						filteredTickers={filteredTickers}
						setFilteredTickers={setFilteredTickers}
					/>

					<TickerCardsContainer>
						{filteredTickers?.map((ticker, index): any => (
							<TickerCard key={`${ticker}-${index}`} ticker={ticker} index={index} />
						))}
					</TickerCardsContainer>
				</>
			)}
		</>
	);
};

export default TickerCards;
