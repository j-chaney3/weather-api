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
	const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${GOOGLE_API_KEY}`;
	axios
		.get(geocodingUrl)
		.then((response) => {
			if (response.status === 200) {
				const data = response.data;
				if (data.status === 'OK') {
					const location = data.results[0].geometry.location;
					res.json(location);
				} else {
					res.status(400).json({ error: 'Invalid Zipcode' });
				}
			} else {
				res.status(500).json({ error: 'request failed' });
			}
		})
		.catch((error) => {
			console.error('Error calling google geocoding API:', error.message);
			res.status(500).json({ error: 'An error occured with the google geocoordinates API' });
		});
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
