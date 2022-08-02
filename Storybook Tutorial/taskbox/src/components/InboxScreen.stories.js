import React from "react";

import InboxScreen from "./InboxScreen";
import store from "../lib/store";
import { rest } from "msw";
import { MockedState } from "./TaskList.stories";
import { Provider } from "react-redux";
import {
  within,
  userEvent
} from "@storybook/testing-library";

export default {
  title: "InboxScreen",
  component: InboxScreen,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

export const Default = {
  parameters: {
    msw: {
      handlers: [
        rest.get(
          "https://jsonplaceholder.typicode.com/todos?userId=1",
          (req, res, ctx) => {
            return res(ctx.json(MockedState.tasks));
          }
        ),
      ],
    },
  },
};

export const Error = {
  parameters: {
    msw: {
      handlers: [
        rest.get(
          "https://jsonplaceholder.typicode.com/todos?userId=1",
          (req, res, ctx) => {
            return res(ctx.status(403));
          }
        ),
      ],
    },
  },
};

export const PinnedTask = {
  parameters: Default.parameters ,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByTestId("success");

    userEvent.click(canvas.getByRole("button", { name: "pinTask-1" }));
    userEvent.click(canvas.getByRole("button", { name: "pinTask-5" }));
  },
};

export const ArchivedTask = {
  parameters: Default.parameters ,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByTestId("success");

    const pin = document.getElementById("archiveTask-5");
    console.log(pin)
    console.log(await canvas.findByTestId("archiveTask-5"))
    userEvent.click(pin)
    userEvent.click( canvas.getByTestId("archiveTask-5"));
    userEvent.click(await canvas.findByTestId("archiveTask-3"));
    // fireEvent.click(canvas.getByRole("checkbox", { name: "archiveTask-5" }));
  },
};
