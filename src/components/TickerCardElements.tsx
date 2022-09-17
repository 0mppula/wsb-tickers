import styled from 'styled-components';

export const TickerCardsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	width: 100%;
	gap: 1rem;
	margin-bottom: 2rem;
`;

export const TickerCardToolsContainer = styled.div`
	font-size: 1.5rem;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	margin-bottom: 1rem;
	row-gap: 0.5rem;
	width: 100%;

	div.tool-item {
		display: flex;
		gap: 0.5rem;
		align-items: flex-start;
		justify-content: center;
		font-size: 1.25rem;
		cursor: pointer;
		transition: 0.3s all;
		padding: 0.6875rem 1rem 0.1875rem;
		border-radius: 4px;
		user-select: none;
		margin-right: 0.5rem;

		&.input {
			width: 100px;
			padding: 0 !important;
			position: relative;

			@media only screen and (max-width: 496px) {
				width: 100%;
				margin: 0;
			}
		}

		&:hover {
			background-color: var(--bg-color-light);
		}

		span {
			width: 100px;
		}
	}
`;

interface InputIconContainerProps {
	query: boolean;
	onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const InputIconContainer = styled.div<InputIconContainerProps>`
	user-select: none;
	color: #c0c0c0;
	position: absolute;
	display: flex;
	top: 5px;
	right: 6px;
`;

export const LoadingContainer = styled.p`
	padding: 3rem 1rem;
`;

export const TickerCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: var(--bg-color-light);
	width: calc(25% - (1rem * (3 / 4)));
	border-radius: 4px;
	padding: 1rem;
	color: var(--primary-text-color);

	@media only screen and (max-width: 992px) {
		width: calc(50% - (1rem * (1 / 2)));
	}
	@media only screen and (max-width: 576px) {
		width: 100%;
	}

	h2 {
		width: 100%;
		font-size: 2rem;
		margin-bottom: 0.5rem;
		justify-self: flex-start;
	}

	div {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		justify-content: center;
		align-items: flex-start;
		font-size: 1.25rem;
	}

	.card-top {
		display: flex;
		flex-direction: row;
		justify-self: flex-end;
	}

	.sentiment-emoji {
		margin: 0;
		text-align: right;
		font-size: 1.625rem;

		&.bull {
			margin-top: -0.5rem;
		}
		&.bear {
			margin-top: -0.1875rem;
		}
	}

	.danger {
		color: var(--danger);
	}
	.success {
		color: var(--success);
	}
`;
