import React from 'react';

export const IconLink = (props)=>{
    return (
        <a className="link" href={props.link} target="_blank" rel="noreferrer">
            <i className={props.icon} title={props.appName}></i>
        </a>
    )
}