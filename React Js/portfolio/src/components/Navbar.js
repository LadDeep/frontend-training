import React from 'react';
import { NavLink } from './NavLink'
const Logo = (props)=>{
    return (
        <a href={props.linkTo} className="brand">Deep</a>
    )

}
export const Navbar = ()=>{
    return (
        <nav className="nav-bar">
            <Logo linkTo="index.html"/>
            <div className="nav-links">
                <NavLink to="work.html">Work</NavLink>
                <NavLink to="about.html">About</NavLink>
                <NavLink to="blog.html">Blog</NavLink>
                <NavLink to="contact.html">Contact</NavLink>
            </div>
        </nav>
    )
}