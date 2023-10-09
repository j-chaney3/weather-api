import { formatDate, formatTime } from '../../../utilities/dateTimeFormat';
import { selectCurrent } from '../../../features/nwsFetch/forecastHourlyFetchSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const CurrentWeather = ({ city, state, zipcode, updated, latitude, longitude, high, low }) => {
	const current = useSelector(selectCurrent);
	const { forecastType } = useSelector((state) => state.setForecastType);

	let selectedForecast;
	switch (forecastType) {
		case 'hourly':
			selectedForecast = 'Hourly Forecast';
			break;
		case 'daily':
			selectedForecast = 'Daily Forecast';
			break;
		default:
			selectedForecast = '';
			break;
	}

	return (
		<div>
			<h1 className="font-bold">
				{city}, {state} | {selectedForecast}
			</h1>
			<div className="inline-block">
				<p className="italic text-sm">
					Updated at: {formatDate(updated)}, {formatTime(updated)}
				</p>
			</div>
			<div>
				<p>Latitude: {latitude || 'N/A'}</p>
				<p>Longitude: {longitude || 'N/A'}</p>
			</div>

			<div className="m-1 text-md">
				<p>
					Low: {low} °F / High: {high} °F
				</p>
				<p>Current Temperature: {current.temperature}°F </p>
			</div>
		</div>
	);
};

export default CurrentWeather;
