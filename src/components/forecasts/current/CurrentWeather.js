import { formatDate, formatTime } from '../../../utilities/dateTimeFormat';

const CurrentWeather = ({ city, state, zipcode, updated, latitude, longitude, high, low }) => {
	return (
		<div>
			<h1 className="font-bold">
				{city}, {state} {zipcode ? ` - ${zipcode}` : ''}
			</h1>
			<h2 className="font-semibold">
				Updated at: {formatDate(updated)}, {formatTime(updated)}
			</h2>
			<p>Latitude: {latitude || 'N/A'}</p>
			<p>Longitude: {longitude || 'N/A'}</p>
			<div className="m-3 text-md">
				Today's Temperatures - Low: {low} °F / High: {high} °F
			</div>
		</div>
	);
};

export default CurrentWeather;
