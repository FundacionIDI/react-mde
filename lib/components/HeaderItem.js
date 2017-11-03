'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeaderItem = function HeaderItem(_ref) {
    var icon = _ref.icon,
        onClick = _ref.onClick,
        tooltip = _ref.tooltip;

    // if icon is a text, print a font-awesome <i/>, otherwise, consider it a React component and print it
    var iconElement = _react2.default.isValidElement(icon) ? icon : _react2.default.createElement('i', { className: 'fa fa-' + icon, 'aria-hidden': 'true' });

    var buttonProps = {};

    if (tooltip) {
        buttonProps = {
            'aria-label': tooltip,
            className: 'tooltipped'
        };
    }

    return _react2.default.createElement(
        'li',
        { className: 'mde-header-item' },
        _react2.default.createElement(
            'button',
            _extends({ type: 'button' }, buttonProps, { onClick: onClick }),
            iconElement
        )
    );
};

HeaderItem.propTypes = {
    tooltip: _propTypes2.default.string,
    onClick: _propTypes2.default.func.isRequired,
    icon: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]).isRequired
};

HeaderItem.defaultProps = {
    tooltip: undefined
};

exports.default = HeaderItem;
module.exports = exports['default'];