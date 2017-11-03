'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _showdown = require('showdown');

var _showdown2 = _interopRequireDefault(_showdown);

var _HeaderGroup = require('./components/HeaderGroup');

var _HeaderGroup2 = _interopRequireDefault(_HeaderGroup);

var _HeaderItem = require('./components/HeaderItem');

var _HeaderItem2 = _interopRequireDefault(_HeaderItem);

var _HeaderItemDropdown = require('./components/HeaderItemDropdown');

var _HeaderItemDropdown2 = _interopRequireDefault(_HeaderItemDropdown);

var _MarkdownHelp = require('./components/MarkdownHelp');

var _MarkdownHelp2 = _interopRequireDefault(_MarkdownHelp);

var _ReactMdeSelectionHelper = require('./ReactMdeSelectionHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactMde = function (_Component) {
    _inherits(ReactMde, _Component);

    function ReactMde() {
        _classCallCheck(this, ReactMde);

        var _this = _possibleConstructorReturn(this, (ReactMde.__proto__ || Object.getPrototypeOf(ReactMde)).call(this));

        _this.converter = new _showdown2.default.Converter();
        _this.handleValueChange = _this.handleValueChange.bind(_this);
        return _this;
    }

    /**
     * Handler for the textarea value change
     * @param {any} e
     * @memberOf ReactMde
     */


    _createClass(ReactMde, [{
        key: 'handleValueChange',
        value: function handleValueChange(e) {
            var onChange = this.props.onChange;

            onChange({ text: e.target.value, selection: null });
        }

        /**
         * Executes a command
         * @param {function} command
         * @memberOf ReactMde
         */

    }, {
        key: 'executeCommand',
        value: function executeCommand(command) {
            var text = this.props.value.text;


            var newValue = command.execute(text, (0, _ReactMdeSelectionHelper.getSelection)(this.textarea));

            // let's select EVERYTHING and replace with the result of the command.
            // This will cause an 'inconvenience' which is: Ctrl + Z will select the whole
            // text. But this is the LEAST possible inconvenience. We can pretty much live
            // with it. I've tried everything in my reach, including reimplementing the textarea
            // history. That caused more problems than it solved.

            this.textarea.focus();
            (0, _ReactMdeSelectionHelper.setSelection)(this.textarea, 0, this.textarea.value.length);
            document.execCommand('insertText', false, newValue.text);

            (0, _ReactMdeSelectionHelper.setSelection)(this.textarea, newValue.selection[0], newValue.selection[1]);
        }

        /**
         * Renders react-mde
         * @returns
         * @memberOf ReactMde
         */

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                text = _props.value.text,
                commands = _props.commands,
                textareaId = _props.textareaId,
                textareaName = _props.textareaName;


            var html = this.converter.makeHtml(text) || '<p>&nbsp</p>';

            var header = null;
            if (commands) {
                header = _react2.default.createElement(
                    'div',
                    { className: 'mde-header' },
                    commands.map(function (cg, i) {
                        return _react2.default.createElement(
                            _HeaderGroup2.default,
                            { key: i },
                            cg.map(function (c, j) {
                                if (c.type === 'dropdown') {
                                    return _react2.default.createElement(_HeaderItemDropdown2.default, {
                                        key: j,
                                        icon: c.icon,
                                        commands: c.subCommands,
                                        onCommand: function onCommand(cmd) {
                                            return _this2.executeCommand(cmd);
                                        }
                                    });
                                }
                                return _react2.default.createElement(_HeaderItem2.default, { key: j, icon: c.icon, tooltip: c.tooltip, onClick: function onClick() {
                                        return _this2.executeCommand(c);
                                    } });
                            })
                        );
                    })
                );
            }

            return _react2.default.createElement(
                'div',
                { className: 'react-mde' },
                header,
                _react2.default.createElement(
                    'div',
                    { className: 'mde-text' },
                    _react2.default.createElement('textarea', {
                        onChange: this.handleValueChange,
                        value: text,
                        ref: function ref(c) {
                            _this2.textarea = c;
                        },
                        id: textareaId,
                        name: textareaName
                    })
                ),
                _react2.default.createElement('div', { className: 'mde-preview', dangerouslySetInnerHTML: { __html: html } }),
                _react2.default.createElement(
                    'div',
                    { className: 'mde-help' },
                    _react2.default.createElement(_MarkdownHelp2.default, null)
                )
            );
        }
    }]);

    return ReactMde;
}(_react.Component);

ReactMde.propTypes = {
    commands: _propTypes2.default.array,
    value: _propTypes2.default.shape({
        text: _propTypes2.default.string.isRequired,
        selection: _propTypes2.default.arrayOf(_propTypes2.default.number)
    }).isRequired,
    onChange: _propTypes2.default.func.isRequired,
    textareaId: _propTypes2.default.string.isRequired,
    textareaName: _propTypes2.default.string.isRequired
};

ReactMde.defaultProps = {
    commands: undefined
};

exports.default = ReactMde;
module.exports = exports['default'];