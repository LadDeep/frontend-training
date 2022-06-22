import React from 'react';

export const Body = (props)=>{
    return (
        <div className="page-container">
            <main className="content-wrap">
                {props.children}
            </main>
        </div>
    )
}