import React from 'react'
import * as ButtonStories from './Button.stories';
import { ButtonGroup } from './ButtonGroup'

export default{
    title: 'Example/ButtonGroup',
    component: ButtonGroup,
}

const Template = args => <ButtonGroup {...args}/>;

export const LikeDislikeGroup = Template.bind({});
LikeDislikeGroup.args = {
    buttons: [
        {...ButtonStories.LikeButton.args},
        {...ButtonStories.DislikeButton.args},
    ]
}