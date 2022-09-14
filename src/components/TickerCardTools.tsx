import React, { useState, useRef, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { FaChevronDown, FaChevronUp, FaCalendarAlt } from 'react-icons/fa';

import { TickerCardToolsContainer } from './TickerCardElements';

const TickerCardTools = () => {
	const [date, setDate] = useState(new Date());

	// STUDY FORWARD REF
	const ExampleCustomInput = forwardRef(({ onClick }: any, ref) => (
		<div className="tool-item" onClick={onClick}>
			<span>Date {moment(date).format('YYYY-MM-DD')} </span>
			<FaCalendarAlt style={{ marginTop: '-0.125rem' }} />
		</div>
	));

	return (
		<TickerCardToolsContainer>
			<div className="tool-item">
				Ticker <FaChevronDown />
			</div>
			<div className="tool-item">
				Comments <FaChevronDown />
			</div>
			<div className="tool-item">
				Sentiment <FaChevronDown />
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
