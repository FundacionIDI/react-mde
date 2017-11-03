'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _HeaderItemDropdownItem = require('./HeaderItemDropdownItem');

var _HeaderItemDropdownItem2 = _interopRequireDefault(_HeaderItemDropdownItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    icon: _propTypes2.default.string.isRequired,
    commands: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        content: _propTypes2.default.node.isRequired
    })).isRequired,
    onCommand: _propTypes2.default.func.isRequired
};

var DropdownHeaderItem = function (_Component) {
    _inherits(DropdownHeaderItem, _Component);

    function DropdownHeaderItem(props) {
        _classCallCheck(this, DropdownHeaderItem);

        var _this = _possibleConstructorReturn(this, (DropdownHeaderItem.__proto__ || Object.getPrototypeOf(DropdownHeaderItem)).call(this, props));

        _this.state = {
            open: false
        };

        _this.handleGlobalClick = _this.handleGlobalClick.bind(_this);
        _this.handleOpenDropdown = _this.handleOpenDropdown.bind(_this);
        return _this;
    }

    _createClass(DropdownHeaderItem, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('click', this.handleGlobalClick, false);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('click', this.handleGlobalClick, false);
        }
    }, {
        key: 'handleGlobalClick',
        value: function handleGlobalClick(e) {
            if (this.clickedOutside(e)) {
                this.closeDropdown();
            }
        }
    }, {
        key: 'openDropdown',
        value: function openDropdown() {
            this.setState({
                open: true
            });
        }
    }, {
        key: 'closeDropdown',
        value: function closeDropdown() {
            this.setState({
                open: false
            });
        }
    }, {
        key: 'clickedOutside',
        value: function clickedOutside(_ref) {
            var target = _ref.target;

            return this.state.open && this.dropdown && this.dropdownOpener && !this.dropdown.contains(target) && !this.dropdownOpener.contains(target);
        }
    }, {
        key: 'handleOnClickCommand',
        value: function handleOnClickCommand(e, command) {
            var onCommand = this.props.onCommand;

            onCommand(command);
            this.closeDropdown();
        }
    }, {
        key: 'handleOpenDropdown',
        value: function handleOpenDropdown() {
            this.openDropdown();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                icon = _props.icon,
                commands = _props.commands;
            var open = this.state.open;


            var items = commands.map(function (command, index) {
                return _react2.default.createElement(
                    _HeaderItemDropdownItem2.default,
                    { key: index, onClick: function onClick(e) {
                            return _this2.handleOnClickCommand(e, command);
                        } },
                    command.content
                );
            });

            var dropdown = open ? _react2.default.createElement(
                'ul',
                { className: 'react-mde-dropdown', ref: function ref(_ref2) {
                        _this2.dropdown = _ref2;
                    } },
                items
            ) : null;

            return _react2.default.createElement(
                'li',
                { className: 'mde-header-item' },
                _react2.default.createElement(
                    'button',
                    { type: 'button', ref: function ref(_ref3) {
                            _this2.dropdownOpener = _ref3;
                        }, onClick: this.handleOpenDropdown },
                    _react2.default.createElement('i', { className: 'fa fa-' + icon, 'aria-hidden': 'true' })
                ),
                dropdown
            );
        }
    }]);

    return DropdownHeaderItem;
}(_react.Component);

DropdownHeaderItem.propTypes = propTypes;

exports.default = DropdownHeaderItem;
module.exports = exports['default'];