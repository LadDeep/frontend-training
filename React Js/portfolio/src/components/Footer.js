import React from 'react';
import { IconLink } from './IconLink';

export const Footer = (props)=>{
    const medias = props.media;
    const mediaIconsList = medias.map((media, i)=>
        <li key={i}>
            <IconLink 
                link={media.link}
                icon={media.icon}
                appName={media.name}
            />
        </li>
    );
    return (
        <footer className="footer">    
          <span>Connect On</span>
          <ul>
            {mediaIconsList}
          </ul>
          <span>&copy;2022 Deep Lad | Enigma </span>
        </footer>
    )
}