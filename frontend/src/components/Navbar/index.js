import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../styles/Navbar.css';

function Navbar() {
    return (
        <div className="navbar-wrapper">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/entries" activeClassName="active">
                            Sessions
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/add-entry" activeClassName="active">
                            Add Entry
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
