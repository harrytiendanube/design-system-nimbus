"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = exports.variantIcons = exports.icons = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _proLightSvgIcons = require("@fortawesome/pro-light-svg-icons");

var _freeBrandsSvgIcons = require("@fortawesome/free-brands-svg-icons");

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var icons = _objectSpread(
  {},
  _proLightSvgIcons.fal,
  {},
  _freeBrandsSvgIcons.fab
);

exports.icons = icons;
var variantIcons = Object.keys(icons).map(function (icon) {
  return icon.substring(2);
});
exports.variantIcons = variantIcons;
var DEFAULT_COLOR = "inherit";
var DEFAULT_SIZE = "sm";
/*
 *   example icon to use icons["fa" + "Accusoft"]
 *   ${param} name : string in Capitalized
 */

var Icon = function Icon(_ref) {
  var name = _ref.name,
    className = _ref.className,
    size = _ref.size,
    color = _ref.color,
    defaultProps = _objectWithoutProperties(_ref, [
      "name",
      "className",
      "size",
      "color",
    ]);

  return /*#__PURE__*/ _react.default.createElement(
    _reactFontawesome.FontAwesomeIcon,
    _extends({}, defaultProps, {
      className: "icon ".concat(className),
      icon: icons["fa".concat(name)],
      size: size,
      color: color,
      "data-testid": "icon-".concat(name),
    })
  );
};

Icon.propTypes = {
  /**
   * Icon classeName's
   */
  className: _propTypes.default.string,

  /**
   * Icon name's
   */
  name: _propTypes.default.string.isRequired,

  /**
   * Icon sizes's
   */
  size: _propTypes.default.string,

  /**
   * Icon color's
   */
  color: _propTypes.default.string,
};
Icon.defaultProps = {
  className: "",
  size: DEFAULT_SIZE,
  color: DEFAULT_COLOR,
};
var _default = Icon;
exports.default = _default;
