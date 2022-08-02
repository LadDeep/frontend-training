import React from "react";
import { useState } from "react";
import { Button } from "./Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: "Button",
};
Primary.parameters = {
  backgrounds: {
    values: [
      { name: "red", value: "#f00" },
      { name: "green", value: "#0f0" },
      { name: "blue", value: "#00f" },
    ],
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};

export const PrimaryWithHooks = () => {
  const [value, setValue] = useState("Secondary");
  const [isPrimary, setIsPrimary] = useState(false);

  const handleClick = () => {
    if (!isPrimary) {
      setValue("Primary");
      setIsPrimary(true);
    }
  };

  return <Button primary={isPrimary} onClick={handleClick} label={value} />;
};
PrimaryWithHooks.storyName = "New name";

export const LikeButton = Template.bind({});
LikeButton.args = {
  ...Small.args,
  label: "👍",
};

export const DislikeButton = Template.bind({});
DislikeButton.args = {
  ...Small.args,
  label: "👎",
};
