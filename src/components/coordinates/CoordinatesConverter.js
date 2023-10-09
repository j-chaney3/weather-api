import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCoordinates } from '../../features/coordinates/coordinatesSlice';
import { setHourlyForecast } from '../../features/forecastType/forecastTypeSlice';

import NavigatorCoords from './NavigatorCoords';

const CoordinatesConverter = () => {
	const dispatch = useDispatch();
	const [zipcode, setZipcode] = useState('');
	const [isValidZipcode, setIsValidZipcode] = useState(false);

	const handleConvertClick = async () => {
		try {
			dispatch(fetchCoordinates(zipcode));
		} catch (error) {
			console.error('Error fetching coordinates:', error);
		}
	};

	const validate = (value) => {
		const regex = /^\d{5}$/;

		if (regex.test(value)) {
			setIsValidZipcode(true);
		} else {
			setIsValidZipcode(false);
		}
	};

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-1 container py-2 px-1 mx-3">
			<NavigatorCoords />
			<div className="flex items-center justify-center">
				<label for="zipcode" className="pr-2">
					(US):
				</label>
				<input
					className="w-1/2 md:w-1/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
					type="text"
					placeholder="Zipcode"
					value={zipcode}
					id="zicode"
					name="zipcode"
					onChange={(event) => {
						setZipcode(event.target.value);
						validate(event.target.value);
						event.preventDefault();
					}}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							event.preventDefault();
							handleConvertClick();
							dispatch(setHourlyForecast());
						}
					}}
					maxLength={5}
				/>
				<button
					type="submit"
					id="check"
					onClick={() => {
						handleConvertClick();
						dispatch(setHourlyForecast());
					}}
					className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mx-2 my-4 disabled:bg-red-200 rounded-full`}
					disabled={!isValidZipcode}
				>
					<i className="fas fa-cloud-sun-rain text-sm text-white"></i>
				</button>
			</div>
		</div>
	);
};

export default CoordinatesConverter;
