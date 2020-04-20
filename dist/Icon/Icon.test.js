"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _Icon = _interopRequireDefault(require("./Icon"));

require("@testing-library/jest-dom/extend-expect");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

describe("Icon", function () {
  it("Render Icon", function () {
    var iconName = "Alicorn";

    var _render = (0, _react2.render)(
        /*#__PURE__*/ _react.default.createElement(_Icon.default, {
          name: "".concat(iconName),
        })
      ),
      getByTestId = _render.getByTestId; // Should be find a componente with prefix 'icon-' Example: icon-foo

    expect(getByTestId("icon-".concat(iconName))).toBeInTheDocument();
  });
});
