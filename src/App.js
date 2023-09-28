import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import SiteFooter from './components/pageComponents/Footer';
import SiteHeader from './components/pageComponents/Header';

function App() {
	return (
		<div className="App">
			<SiteHeader />
			<HomePage />
			<SiteFooter />
		</div>
	);
}

export default App;
