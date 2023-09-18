const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(
	cors({
		origin: 'http://localhost:3001',
		methods: 'GET',
		credentials: true,
	})
);

app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const port = 3000;

app.get('/geocode/:zipcode', async (req, res) => {
	const { zipcode } = req.params;

	try {
		const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${GOOGLE_API_KEY}`;
		const response = await axios.get(geocodingUrl);

		if (response.status === 200) {
			const data = response.data;
			if (data.status === 'OK') {
				const location = data.results[0].geometry.location;
				res.json(location);
			} else {
				res.status(400).json({ error: 'Geocoding request failed' });
			}
		} else {
			res.status(500).json({ error: 'Geocoding request failed' });
		}
	} catch (error) {
		console.error('Error calling the Geocoding API:', error.message);
		res.status(500).json({ error: 'An error occurred while calling the Geocoding API' });
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
