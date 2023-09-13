import CoordinatesConverter from '../components/CoordinatesConverter';
import ForecastFetchHourly from '../components/ForecastFetchHourly';

const HomePage = () => {
	return (
		<div className="bg-slate-500">
			<div className="bg-slate-600 min-h-screen max-w-screen-md mx-auto bg-slate-300">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 container p-2 mx-auto">
					<div className="bg-slate-300">
						<CoordinatesConverter />
					</div>
					<div className="bg-slate-300">
						<ForecastFetchHourly />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
