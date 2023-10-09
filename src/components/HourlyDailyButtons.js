import { useDispatch, useSelector } from 'react-redux/';
import { setDailyForecast, setHourlyForecast } from '../features/forecastType/forecastTypeSlice';

const HourlyDailyButtons = () => {
	const dispatch = useDispatch();
	const { forecastType } = useSelector((state) => state.setForecastType);

	return (
		<div className="justify-items-center">
			<button
				onClick={() => {
					dispatch(setHourlyForecast());
				}}
				className={`${
					forecastType === 'hourly' ? 'bg-blue-800' : 'bg-blue-500'
				} hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mx-1 my-1 w-32 ju`}
			>
				Hourly
			</button>
			<button
				onClick={() => {
					dispatch(setDailyForecast());
				}}
				className={`${
					forecastType === 'daily' ? 'bg-blue-800' : 'bg-blue-500'
				} hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mx-1 my-1 w-32`}
			>
				Daily
			</button>
		</div>
	);
};

export default HourlyDailyButtons;
