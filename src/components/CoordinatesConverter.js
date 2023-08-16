import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoordinates } from '../features/coordinates/coordinatesSlice';

const CoordinatesConverter = () => {
	const dispatch = useDispatch();
	const { latitude, longitude } = useSelector((state) => state.coordinates);

	const [zipcode, setZipcode] = useState('');

	const handleConvertClick = async () => {
		try {
			dispatch(fetchCoordinates(zipcode)); // Dispatch the fetchCoordinates action
		} catch (error) {
			console.error('Error fetching coordinates:', error);
		}
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Enter zipcode"
				value={zipcode}
				onChange={(event) => setZipcode(event.target.value)}
			/>
			<button
				onClick={handleConvertClick}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4 my-4"
			>
				Convert
			</button>
		</div>
	);
};

export default CoordinatesConverter;
