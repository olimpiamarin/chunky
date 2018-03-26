'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.breakpoints = undefined;
exports.renderResponsiveLarge = renderResponsiveLarge;
exports.renderResponsiveSmall = renderResponsiveSmall;
exports.renderResponsive = renderResponsive;

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var breakpoints = exports.breakpoints = {
  main: 1224
};

function renderResponsiveLarge(component) {
  return React.createElement(
    _reactResponsive2.default,
    { minDeviceWidth: breakpoints.main },
    component
  );
}

function renderResponsiveSmall(component) {
  return React.createElement(
    _reactResponsive2.default,
    { maxDeviceWidth: breakpoints.main },
    component
  );
}

function renderResponsive(key, small, large) {
  return React.createElement(
    'div',
    { key: key },
    renderResponsiveSmall(small),
    renderResponsiveLarge(large)
  );
}