import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarItems } from './SidebarItems';
import { IconContext } from "react-icons";
import './Navbar.css';

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: "#0f00ed" }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars' onClick={showSidebar}>
                        <FaIcons.FaBars />
                    </Link>
                </div>
            </IconContext.Provider>
            <nav className={ sidebar ? 'nav-menu active' : 'nav-menu' }>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <IconContext.Provider value={{ color: "#0f00ed" }}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    </IconContext.Provider>
                    {SidebarItems.map((item, idx) => {
                        return (
                            <li key={idx} className='nav-list-item'>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Navbar;