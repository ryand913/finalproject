import React, { useContext } from 'react';
import { NavLink} from 'react-router-dom';
import Context from '../Context'

const Header = (props) => {
    const things = useContext(Context)
    console.log(Context)
    return(
    <header>
    <div className="wrap header--flex">
        <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
        <nav>
            <ul className="header--signedout">
                <li>
                <NavLink to="/signin">Sign In</NavLink>
                </li>
                <li>
                <NavLink to="/signout">Sign Out</NavLink>
                </li>
            </ul>
        </nav>
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
                <nav>
                    <ul className="header--signedin">
                        <li>Welcome, Joe Smith!</li>
                        <li><NavLink to="/signout">Sign Out</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    </div>
    </header>
    )
}

export default Header;