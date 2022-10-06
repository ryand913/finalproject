import React from 'react';
import { NavLink} from 'react-router-dom';

const Header = () => (

    <header>
    <div class="wrap header--flex">
        <h1 class="header--logo"><NavLink to="/">Courses</NavLink></h1>
        <nav>
            <ul class="header--signedout">
                <li>
                <NavLink to="/signin">Sign In</NavLink>
                </li>
                <li>
                <NavLink to="/signout">Sign Out</NavLink>
                </li>
            </ul>
        </nav>
    </div>
    </header>
        )

export default Header;