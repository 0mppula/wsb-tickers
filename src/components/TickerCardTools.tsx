import { FC, forwardRef, useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { FaChevronDown, FaChevronUp, FaCalendarAlt, FaSearch, FaTimes } from 'react-icons/fa';

import { InputIconContainer, TickerCardToolsContainer } from './TickerCardElements';
import { tickerType } from './TickerCards';

type TickerCardToolsProps = {
	date: Date;
	setDate: Function;
	tickers: tickerType[];
	setTickers: Function;
	filteredTickers: tickerType[];
	setFilteredTickers: Function;
};

const TickerCardTools: FC<TickerCardToolsProps> = ({
	date,
	setDate,
	tickers,
	setTickers,
	filteredTickers,
	setFilteredTickers,
}) => {
	const [query, setQuery] = useState<string>('');
	const [tickerSort, setTickerSort] = useState<number>(-1);
	const [commentsSort, setCommentsSort] = useState<number>(1);
	const [sentimentScoreSort, setSentimentScoreSort] = useState<number>(1);

	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

	useEffect(() => {
		let newTickers: tickerType[] = [...tickers];
		if (query) {
			newTickers = newTickers.filter((t) => t.ticker.includes(query.toUpperCase()));
			setFilteredTickers(newTickers);
		} else {
			setFilteredTickers(tickers);
		}
	}, [query, setFilteredTickers]);

	const handleTickerSort = () => {
		let newTickers: tickerType[] = [...tickers];
		let newFilteredTickers: tickerType[] = [...filteredTickers];

		// 1 IS FOR DECENDING ORDER
		const nextSortOrder = tickerSort * -1;
		newFilteredTickers.sort((a, b) =>
			a.ticker < b.ticker ? nextSortOrder : nextSortOrder * -1
		);
		newTickers.sort((a, b) => (a.ticker < b.ticker ? nextSortOrder : nextSortOrder * -1));

		setTickerSort(nextSortOrder);

		// Sort both the original tickers and the tickers filtered with query.
		setTickers(newTickers);
		setFilteredTickers(newFilteredTickers);
	};

	const handleCommentsSort = () => {
		let newTickers: tickerType[] = [...tickers];
		let newFilteredTickers: tickerType[] = [...filteredTickers];

		// -1 IS FOR DECENDING ORDER
		const nextSortOrder = commentsSort * -1;
		newFilteredTickers.sort((a, b) =>
			a.no_of_comments > b.no_of_comments ? nextSortOrder : nextSortOrder * -1
		);
		newTickers.sort((a, b) =>
			a.no_of_comments > b.no_of_comments ? nextSortOrder : nextSortOrder * -1
		);

		setCommentsSort(nextSortOrder);

		// Sort both the original tickers and the tickers filtered with query.
		setTickers(newTickers);
		setFilteredTickers(newFilteredTickers);
	};

	const handleSentimentScoreSort = () => {
		let newTickers: tickerType[] = [...tickers];
		let newFilteredTickers: tickerType[] = [...filteredTickers];

		// -1 IS FOR DECENDING ORDER
		const nextSortOrder = sentimentScoreSort * -1;
		newFilteredTickers.sort((a, b) =>
			a.sentiment_score > b.sentiment_score ? nextSortOrder : nextSortOrder * -1
		);
		newTickers.sort((a, b) =>
			a.sentiment_score > b.sentiment_score ? nextSortOrder : nextSortOrder * -1
		);

		setSentimentScoreSort(nextSortOrder);

		// Sort both the original tickers and the tickers filtered with query.
		setTickers(newTickers);
		setFilteredTickers(newFilteredTickers);
	};

	const handleInputContainerClick = () => {
		console.log('first');
		if (query) {
			setQuery('');
		}

		inputRef.current.focus();
	};

	// Custom date picker element
	const ExampleCustomInput: FC = forwardRef(({ onClick }: any, ref: any) => (
		<div className="tool-item" onClick={onClick}>
			<span>{moment(date).format('YYYY-MM-DD')} </span>
			<FaCalendarAlt style={{ marginTop: '-0.125rem' }} />
		</div>
	));

	return (
		<TickerCardToolsContainer>
			<div className="tool-item input">
				<input
					ref={inputRef}
					type="text"
					placeholder="AAPL"
					maxLength={5}
					value={query}
					onChange={(e) => setQuery(e.target.value.trim())}
				/>
				<InputIconContainer onClick={handleInputContainerClick} query={query.length > 0}>
					{query ? <FaTimes /> : <FaSearch />}
				</InputIconContainer>
			</div>
			<div className="tool-item" onClick={handleTickerSort}>
				Ticker {tickerSort === -1 ? <FaChevronUp /> : <FaChevronDown />}
			</div>
			<div className="tool-item" onClick={handleCommentsSort}>
				Comments {commentsSort === -1 ? <FaChevronDown /> : <FaChevronUp />}
			</div>
			<div className="tool-item" onClick={handleSentimentScoreSort}>
				Sentiment {sentimentScoreSort === -1 ? <FaChevronDown /> : <FaChevronUp />}
			</div>

			<DatePicker
				selected={date}
				onChange={(date: Date) => setDate(date)}
				customInput={<ExampleCustomInput />}
				minDate={new Date('2020-04-01')}
				maxDate={new Date()}
			/>
		</TickerCardToolsContainer>
	);
};

export default TickerCardTools;
