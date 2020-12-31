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
                    <Link to='#' className='navbar-main-icon' onClick={showSidebar}>
                        <FaIcons.FaBars />
                    </Link>
                </div>
            </IconContext.Provider>
            <nav className={ sidebar ? 'navbar-menu active' : 'navbar-menu' }>
                <ul className='navbar-menu-list' onClick={showSidebar}>
                    <IconContext.Provider value={{ color: "#0f00ed" }}>
                    <li className='navbar-main-icon'>
                        <Link to='#'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    </IconContext.Provider>
                    {SidebarItems.map((item, idx) => {
                        return (
                            <li key={idx} className='navbar-menu-list-item'>
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