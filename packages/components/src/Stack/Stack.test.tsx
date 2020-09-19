/* eslint-disable spellcheck/spell-checker */
import * as React from "react";
import { render } from "@testing-library/react";

import { Stack, Label } from "..";

const myHAligment = "start";
const myVAligment = "center";

describe("<Stack />", () => {
  it("render", () => {
    const { container } = render(
      <Stack wrap vertical>
        <Stack.Item fill>
          <Label id="label-1" label="Label text 1" />
        </Stack.Item>
        <Stack.Item>
          <Label id="label-2" label="Label text 2" />
        </Stack.Item>
      </Stack>,
    );
    const divs = container.querySelectorAll("div");
    expect(divs[0]).toHaveClass(
      `nimbus--stack-wrapper h-alignment--${myHAligment} v-alignment--${myVAligment} stack--wrap`,
    );
    expect(divs[1]).toHaveClass(`nimbus--stack-item stack-item--fill`);
    expect(divs[2]).toHaveClass(`nimbus--stack-item`);
  });
});
