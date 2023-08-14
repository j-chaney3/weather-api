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
			<button onClick={handleConvertClick}>Convert</button>
			<div>
				Latitude: {latitude}
				<br />
				Longitude: {longitude}
			</div>
		</div>
	);
};

export default CoordinatesConverter;
