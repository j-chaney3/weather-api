const HourlyDailyButtons = ({ hourly, setHourly }) => {
	return (
		<>
			<button
				onClick={() => {
					setHourly(true);
				}}
				className={`${
					hourly ? 'bg-blue-800' : 'bg-blue-500'
				} hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mx-1 my-1 w-32`}
			>
				Hourly
			</button>
			<button
				onClick={() => {
					setHourly(false);
				}}
				className={`${
					!hourly ? 'bg-blue-800' : 'bg-blue-500'
				} hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mx-1 my-1 w-32`}
			>
				Daily
			</button>
		</>
	);
};

export default HourlyDailyButtons;
