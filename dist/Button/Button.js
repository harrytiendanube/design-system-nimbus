"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./Button.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

/**
  Utiliza `Button` como componente de acción.
*/
var Button = function Button(props) {
  return /*#__PURE__*/ _react.default.createElement(
    "button",
    _extends({}, props, {
      className: "button ".concat(props.className),
    }),
    props.children
  );
};

Button.defaultProps = {
  className: "",
};
Button.propTypes = {
  /**
    Escribe dentro de las las etiquetas para renderizar el contenido.
  */
  children: _propTypes.default.node.isRequired,

  /**
   * Cambia el estilo del componente
   */
  className: _propTypes.default.string,
};
var _default = Button;
exports.default = _default;
