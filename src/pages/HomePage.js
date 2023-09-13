import { useState } from 'react';
import CoordinatesConverter from '../components/CoordinatesConverter';
import ForecastFetchHourly from '../components/ForecastFetchHourly';
import ForecastFetchDaily from '../components/ForecastFetchDaily';

const HomePage = () => {
	const [hourly, setHourly] = useState(true);

	if (hourly) {
		return (
			<div className="bg-slate-500">
				<div className="bg-slate-600 min-h-screen max-w-screen-md mx-auto bg-slate-300">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 container p-2 mx-auto">
						<div className="bg-slate-300">
							<CoordinatesConverter />
						</div>

						<div className="bg-slate-300">
							<button
								onClick={() => {
									setHourly(true);
								}}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1 my-1 w-32"
							>
								Hourly
							</button>
							<button
								onClick={() => {
									setHourly(false);
								}}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1 my-1 w-32"
							>
								Daily
							</button>
							<ForecastFetchHourly />
						</div>
					</div>
				</div>
			</div>
		);
	}
	if (!hourly) {
		return (
			<div className="bg-slate-500">
				<div className="bg-slate-600 min-h-screen max-w-screen-md mx-auto bg-slate-300">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 container p-2 mx-auto">
						<div className="bg-slate-300">
							<CoordinatesConverter />
						</div>

						<div className="bg-slate-300">
							<button
								onClick={() => {
									setHourly(true);
								}}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4 my-4"
							>
								Hourly
							</button>
							<button
								onClick={() => {
									setHourly(false);
								}}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4 my-4"
							>
								Daily
							</button>
							<ForecastFetchDaily />
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default HomePage;
