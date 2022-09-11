import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = ({logout, token}) => {
    return (
        <header>
            <nav>
               <Link to='/'>HOME</Link>
               <Link to='/posts'>POSTS</Link> 

                { token ? (
                    <Fragment>
                        <Link to='/profile'>PROFILE</Link> 
                        <Link to='/' onClick={() => logout()}>LOGOUT</Link>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Link to='/register'>REGISTER</Link>
                        <Link to='/login'>LOGIN</Link>
                    </Fragment>
                )
                }

            </nav>
        </header>
    )
}

export default Navbar;