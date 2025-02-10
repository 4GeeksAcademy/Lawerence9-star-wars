import React, { useContext } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-flex d-flex col justify-content-between">
				<div className="m-2">
					<Link to="/">
						<img height={"40"} src="https://starwars.chocobar.net/star-wars-logo.png" alt="" />
					</Link>
				</div>
				<div className="">
					<Link to="/contacts">
						<span className="navbar-brand">Contacts</span>
					</Link>
					<Link to="/characters">
						<span className="navbar-brand">Characters</span>
					</Link>
					<Link to="/planets">
						<span className=" navbar-brand">Planets</span>
					</Link>
					<Link to="/starships">
						<span className="navbar-brand">Starships</span>
					</Link>
					<div className="dropdown navbar-brand d-inline-block">
						<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favourites
						</button>
						<ul className="dropdown-menu dropdown-menu-end">
						<li className="dropdown-item">{''}</li>
						</ul>
					</div>
				</div>
				{/* <div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div> */}
			</div>
		</nav>
	);
};
