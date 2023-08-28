import CoordinatesConverter from '../components/CoordinatesConverter';
import ForecastFetch from '../components/ForecastFetch';

const HomePage = () => {
	return (
		<div className="bg-slate-600 min-h-screen">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 container p-2 mx-auto">
				<div className="bg-slate-300">
					<CoordinatesConverter />
				</div>
				<div className="bg-slate-300">
					<ForecastFetch />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
