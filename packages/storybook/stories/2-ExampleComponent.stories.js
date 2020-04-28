import React from "react";
import { ExampleComponent } from "@tiendanube/components";

export default {
  title: "ExampleComponent",
  component: ExampleComponent,
};

export const ToStorybook = () => (
  <ExampleComponent text="Create React Library Example 😄" />
);

ToStorybook.story = {
  name: "Example component",
};
