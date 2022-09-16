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

interface TickerCardsProps {
	refresh: number;
}

const TickerCards: FC<TickerCardsProps> = ({ refresh }) => {
	const [tickers, setTickers] = useState<tickerType[] | null>(null);
	const [filteredTickers, setFilteredTickers] = useState<tickerType[] | null>(tickers);
	const [loading, setLoading] = useState<Boolean>(false);
	const [date, setDate] = useState<Date>(new Date());
	const [tooFast, setTooFast] = useState<Boolean>(false);

	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			try {
				// 'https://tradestie.com/api/v1/apps/reddit?date=2022-04-03'
				const formattedDate = moment(date).format('YYYY-MM-DD');
				const url = `/api/v1/apps/reddit?date=${formattedDate}`;
				const response = await axios.get(url);

				setTooFast(false);
				setTickers(response.data);
				setFilteredTickers(response.data);
			} catch ({ request: { status } = null }) {
				// The API's limit is 10 calls / min if exceeded response status will be 429
				if (status === 429) {
					setTooFast(true);
					console.log("The API's limit is 10 calls");
				}
			}
			setLoading(false);
		};

		getData();
	}, [date]);

	useEffect(() => {
		setDate(new Date());
	}, [refresh]);

	if (loading || tooFast)
		return (
			<p>
				{(loading && 'LOADING...') ||
					(tooFast && "Slow down the API's limit is 10 calls per minute!")}
			</p>
		);

	console.log(filteredTickers);

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
						{filteredTickers?.length > 0 &&
							filteredTickers?.map((ticker, index): any => (
								<TickerCard
									key={`${ticker}-${index}`}
									ticker={ticker}
									index={index}
								/>
							))}
					</TickerCardsContainer>
				</>
			)}
		</>
	);
};

export default TickerCards;
