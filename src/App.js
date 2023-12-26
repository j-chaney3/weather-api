import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import TestPlaces from './pages/TestPlaces';
import SiteFooter from './components/pageComponents/Footer';
import SiteHeader from './components/pageComponents/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="App">
				<SiteHeader />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="test" element={<TestPlaces />} />
				</Routes>
				<SiteFooter />
			</div>
		</Router>
	);
}

export default App;
