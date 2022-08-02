import React from "react";

export const decorators = [
  (Story) => (
    <div style={{ padding: "0 2em" }}>
      <Story />
    </div>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    values: [
      { name: "light", value: "#fefefe" },
      { name: "dark", value: "#101010" },
    ],
  },
};
