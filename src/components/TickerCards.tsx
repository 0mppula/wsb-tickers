import axios from 'axios';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';

import TickerCard from './TickerCard';
import { LoadingContainer, TickerCardsContainer } from './TickerCardElements';
import TickerCardTools from './TickerCardTools';

export interface tickerType {
	no_of_comments: number; // "no_of_comments": 49,
	sentiment: string; // "sentiment": "Bearish",
	sentiment_score: number; // "sentiment_score": -0.392,
	ticker: string; // "ticker": "BBBY"
}

interface TickerCardsProps {
	refresh: number;
}

const TickerCards: FC<TickerCardsProps> = ({ refresh }) => {
	const [tickers, setTickers] = useState<tickerType[] | null>(null);
	const [filteredTickers, setFilteredTickers] = useState<tickerType[] | null>(tickers);
	const [loading, setLoading] = useState<Boolean>(false);
	const [date, setDate] = useState<Date>(new Date('2023-10-14'));
	const [tooFast, setTooFast] = useState<Boolean>(false);

	const dateIsAfterApiShutdown = moment(moment(date).format('YYYY-MM-DD')).isAfter('2023-10-14');

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
			} catch ({ request: { status } = null }: any) {
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
		if (refresh > 0) {
			setDate(new Date('2023-10-14'));
		}
	}, [refresh]);

	if (loading || tooFast)
		return (
			<LoadingContainer>
				{(loading && 'LOADING...') ||
					(tooFast &&
						"Slow down the API's limit is 10 calls per minute! (refresh the page after 1 minute)")}
			</LoadingContainer>
		);

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
						{filteredTickers?.length > 0 ? (
							filteredTickers?.map((ticker, index): any => (
								<TickerCard
									key={`${ticker}-${index}`}
									ticker={ticker}
									index={index}
								/>
							))
						) : (
							<span style={{ padding: '1rem' }}>
								{dateIsAfterApiShutdown
									? `The API that powers this app is app doesn't return any sentiment data after
										${moment('2023-10-14').format('LL')}. 😢`
									: 'No sentiment data found for this date.'}
							</span>
						)}
					</TickerCardsContainer>
				</>
			)}
		</>
	);
};

export default TickerCards;
