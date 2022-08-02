import React from 'react'
import { Button } from './Button'

export const ButtonGroup = (props) => {
    const buttonList = props.buttons
    return (
        buttonList.map(args => (
            <Button {...args}/>
        ))
    )
}
