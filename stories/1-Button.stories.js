import React from "react";
import { withKnobs, select, text, color } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { Button } from "../src/components";

export default {
  title: "Button",
  decorators: [withKnobs, withA11y],
  parameters: {
    component: Button,
    componentSubtitle: "Botón básico",
  },
}; /* Badge component metadata */

export const NoText = () => <Button></Button>;
export const Text = () => (
  <Button className={select("Class", ["default", "blue", "red"])}>
    Texto inicial
  </Button>
);
export const TextCode = () => <Button>Texto inicial 2</Button>;
