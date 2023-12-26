import { useState } from 'react';

const SiteHeader = () => {
	const [navbarOpen, setNavbarOpen] = useState(false);
	return (
		<>
			<nav className="CustomNav relative flex flex-wrap items-center justify-between bg-slate-700 mb-0">
				<div className="container px-2 mx-auto flex flex-wrap items-center justify-between">
					<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
						<p className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
							Weather Forecast
						</p>
						<button
							className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
							type="button"
							onClick={() => setNavbarOpen(!navbarOpen)}
						>
							<i className="fas fa-bars"></i>
						</button>
					</div>
					<div
						className={
							'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')
						}
						id="example-navbar-danger"
					>
						<ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
							<li className="nav-item">
								<a
									className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
									href="https://www.linkedin.com/in/james-c-b3a05585/"
									target="_blank"
									rel="noreffer"
								>
									<i className="fab fa-linkedin text-lg leading-lg text-white opacity-75"></i>
								</a>
							</li>
							<li className="nav-item">
								<a
									className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
									href="https://github.com/j-chaney3/weather-api"
									target="_blank"
									rel="noreffer"
								>
									<i className="fab fa-github text-lg leading-lg text-white opacity-75"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default SiteHeader;
