"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

require("./Button.scss");

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

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

/**
  Utiliza `Button` como componente de acción.
*/
var Button = function Button(_ref) {
  var start = _ref.start,
    children = _ref.children,
    end = _ref.end,
    className = _ref.className,
    color = _ref.color,
    outline = _ref.outline,
    defaultProps = _objectWithoutProperties(_ref, [
      "start",
      "children",
      "end",
      "className",
      "color",
      "outline",
    ]);

  return /*#__PURE__*/ _react.default.createElement(
    "button",
    _extends({}, defaultProps, {
      className: ""
        .concat(className, " button_")
        .concat(color)
        .concat(outline ? "_outline" : ""),
    }),
    start &&
      /*#__PURE__*/ _react.default.createElement(_Icon.default, {
        name: start,
        className: "button_start",
      }),
    children,
    end &&
      /*#__PURE__*/ _react.default.createElement(_Icon.default, {
        name: end,
        className: "button_end",
      })
  );
};

Button.defaultProps = {
  className: "",
  color: "primary",
  outline: false,
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

  /**
   * Colores "primary", "secondary", "Light", "Danger", "Transparent"
   */
  color: _propTypes.default.oneOf([
    "primary",
    "secondary",
    "light",
    "danger",
    "transparent",
  ]),

  /**
   * Nombre del Icono que mostrará al comienzo del botón.
   */
  start: _propTypes.default.string,

  /**
   * Nombre del Icono que mostrará al final del botón.
   */
  end: _propTypes.default.string,

  /**
   * Fondo transparente con borde de color.
   */
  outline: _propTypes.default.bool,
};
var _default = Button;
exports.default = _default;
