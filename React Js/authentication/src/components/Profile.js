import React from 'react'

const Profile = (props) => {
    return (
        <div>
            <img src={props.user.profileImg}/>
                <h2>{props.user.name}</h2>
                <div>
                    <Info heading="Id" info={props.user.id} />
                    <Info heading="Type" info={props.user.type} />
                    <Info heading="Language" info={props.user.lang} />
                </div>
        </div>
    )
}

export default Profile

const Info = (props) => {
    return (
        <div>
            <h4 className="user-info-heading">{props.heading}</h4>
            <span>{props.info}</span>
        </div>
    )
}
