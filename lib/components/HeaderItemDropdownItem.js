'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
    onClick: _propTypes2.default.func.isRequired,
    children: _propTypes2.default.node.isRequired
};

var HeaderItemDropdownItem = function HeaderItemDropdownItem(_ref) {
    var children = _ref.children,
        onClick = _ref.onClick;
    return _react2.default.createElement(
        'li',
        { className: 'mde-dropdown-header-item' },
        _react2.default.createElement(
            'button',
            { type: 'button', onClick: onClick },
            children
        )
    );
};

HeaderItemDropdownItem.propTypes = propTypes;

exports.default = HeaderItemDropdownItem;
module.exports = exports['default'];