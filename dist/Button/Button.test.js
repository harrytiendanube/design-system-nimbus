"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _Button = _interopRequireDefault(require("./Button"));

require("@testing-library/jest-dom/extend-expect");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

describe("Button", function () {
  it("Render Button", function () {
    var _render = (0, _react2.render)(
        /*#__PURE__*/ _react.default.createElement(
          _Button.default,
          {
            "data-testid": "button",
          },
          " this is my button "
        )
      ),
      getByTestId = _render.getByTestId;

    var button = getByTestId("button");
    expect(button).toHaveTextContent("this is my button");
  });
  it("Render Red Button", function () {
    var _render2 = (0, _react2.render)(
        /*#__PURE__*/ _react.default.createElement(
          _Button.default,
          {
            "data-testid": "button",
            className: "red",
          },
          " ",
          "this is my red button",
          " "
        )
      ),
      getByTestId = _render2.getByTestId;

    var button = getByTestId("button");
    expect(button).toHaveClass("red");
  });
  it("Render Blue Button", function () {
    var _render3 = (0, _react2.render)(
        /*#__PURE__*/ _react.default.createElement(
          _Button.default,
          {
            "data-testid": "button",
            className: "blue",
          },
          " ",
          "this is my blue button",
          " "
        )
      ),
      getByTestId = _render3.getByTestId;

    var button = getByTestId("button");
    expect(button).toHaveClass("blue");
  });
  it("Click on Button must run callback", function () {
    var callback = jest.fn();

    var _render4 = (0, _react2.render)(
        /*#__PURE__*/ _react.default.createElement(
          _Button.default,
          {
            "data-testid": "button",
            className: "blue",
            onClick: callback,
          },
          " ",
          "this is my button",
          " "
        )
      ),
      getByTestId = _render4.getByTestId;

    var button = getByTestId("button");

    _react2.fireEvent.click(button);

    expect(callback).toHaveBeenCalled();
  });
});
