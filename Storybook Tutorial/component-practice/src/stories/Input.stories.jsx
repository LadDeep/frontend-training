import { Input } from "./Input";
import { useState } from "react";
export default {
  title: "Example/Input",
  component: Input,
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
  },
};

const Template = (args) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <>
      <Input
        {...args}
        onChange={(...parms) => {
          setValue(...parms);
        }}
        value={value}
      />
      {/* <pre style={{ marginTop: 10 }}>{JSON.stringify({ value }, null, 2)}</pre> */}
    </>
  );
};

export const Default = Template.bind({});

export const Number = Template.bind({});
Number.args = {
  type: 'number',
};
export const Password = Template.bind({});
Password.args = {
  type: 'password',
};
export const Value = Template.bind({});
Value.args = {
  value: 'value',
};
