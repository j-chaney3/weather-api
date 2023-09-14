import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCoordinates } from '../features/coordinates/coordinatesSlice';

const CoordinatesConverter = () => {
	const dispatch = useDispatch();
	//const { latitude, longitude } = useSelector((state) => state.coordinates);

	const [zipcode, setZipcode] = useState('');
	const [isValidZipcode, setIsValidZipcode] = useState(false);

	const handleConvertClick = async () => {
		try {
			dispatch(fetchCoordinates(zipcode)); // Dispatch the fetchCoordinates action
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
		<div>
			<input
				type="text"
				placeholder="Enter zipcode"
				value={zipcode}
				// onChange={
				// 	(event) => setZipcode(event.target.value)
				// }
				onChange={(event) => {
					setZipcode(event.target.value);
					validate(event.target.value);
				}}
				maxLength={5}
			/>
			<button
				id="check"
				onClick={handleConvertClick}
				className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4 my-4 disabled:bg-red-200`}
				disabled={!isValidZipcode}
			>
				Check Weather!
			</button>
		</div>
	);
};

export default CoordinatesConverter;
