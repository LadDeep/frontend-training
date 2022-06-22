import React from 'react';

export const NavLink = (props)=>{
    return (
        <a href={props.to}>{props.children}</a>
    )
}