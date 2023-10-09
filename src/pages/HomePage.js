import { useSelector } from 'react-redux';
import CoordinatesConverter from '../components/coordinates/CoordinatesConverter';
import DailyForecast from '../components/forecasts/daily/DailyForecast';
import HourlyForecast from '../components/forecasts/hourly/HourlyForecast';
import HourlyDailyButtons from '../components/HourlyDailyButtons';

const HomePage = () => {
	const { err } = useSelector((state) => state.coordinates);
	const { forecastType } = useSelector((state) => state.setForecastType);

	let selectedForecast;
	switch (forecastType) {
		case 'hourly':
			selectedForecast = <HourlyForecast />;
			break;
		case 'daily':
			selectedForecast = <DailyForecast />;
			break;
		default:
			selectedForecast = <HourlyForecast />;
			break;
	}

	return (
		<div className="bg-slate-500">
			<div className="bg-slate-300 min-h-screen max-w-screen-md mx-auto">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 container p-2 mx-auto">
					<div className="bg-slate-300">
						<CoordinatesConverter />
					</div>

					<div className="bg slate-300">
						{!err && <HourlyDailyButtons />}
						{selectedForecast}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
