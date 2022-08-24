import axios from 'axios';
import {React, useState} from 'react'
import { Link, Outlet } from 'react-router-dom';



function Header(props) {
    
    return (
        <div>
            <nav className="navbar navbar-light">
                <div className="container">
                    <Link to='/'><p className="navbar-brand">conduit</p></Link>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                            <Link to='/' className="nav-link active" >Home</Link>
                        </li>
                        {!props.isLogin ?
                            <>
                                <li className="nav-item">
                                    <Link to='/sign-in' className="nav-link" >Sign in</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/sign-up' className="nav-link" >Sign up</Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link to='/newArticle' className="nav-link" >
                                        <i className="ion-compose"></i>&nbsp;New Article
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/settings' className="nav-link" >
                                        <i className="ion-gear-a"></i>&nbsp;Settings
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/${props.name}`} className="nav-link" > 
                                        {props.name}
                                    </Link>
                                </li>
                            </>
                        }


                    </ul>
                </div>
            </nav>

            <Outlet />
        </div>
    )
}

export default Header
