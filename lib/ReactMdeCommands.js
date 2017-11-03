'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactMdeTextHelper = require('./ReactMdeTextHelper');

var _ReactMdeCommandHelper = require('./ReactMdeCommandHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    makeHeader: {
        type: 'dropdown',
        icon: 'header',
        subCommands: [{
            content: _react2.default.createElement(
                'p',
                { className: 'header-1' },
                'Header'
            ),
            execute: function execute(text, selection) {
                return (0, _ReactMdeCommandHelper.makeHeader)(text, selection, '# ');
            }
        }, {
            content: _react2.default.createElement(
                'p',
                { className: 'header-2' },
                'Header'
            ),
            execute: function execute(text, selection) {
                return (0, _ReactMdeCommandHelper.makeHeader)(text, selection, '## ');
            }
        }, {
            content: _react2.default.createElement(
                'p',
                { className: 'header-3' },
                'Header'
            ),
            execute: function execute(text, selection) {
                return (0, _ReactMdeCommandHelper.makeHeader)(text, selection, '### ');
            }
        }]
    },

    makeBold: {
        icon: 'bold',
        tooltip: 'Add bold text',
        execute: function execute(text, selection) {
            return (0, _ReactMdeCommandHelper.makeACommandThatInsertsBeforeAndAfter)(text, selection, '**');
        }
    },

    makeItalic: {
        icon: 'italic',
        tooltip: 'Add italic text',
        execute: function execute(text, selection) {
            return (0, _ReactMdeCommandHelper.makeACommandThatInsertsBeforeAndAfter)(text, selection, '_');
        }
    },

    makeLink: {
        icon: 'link',
        tooltip: 'Insert a link',
        execute: function execute(text, selection) {
            var _insertText = (0, _ReactMdeTextHelper.insertText)(text, '[', selection[0]),
                textAfterFirstInsertion = _insertText.textAfterFirstInsertion,
                insertionLength = _insertText.insertionLength;

            var finalText = (0, _ReactMdeTextHelper.insertText)(textAfterFirstInsertion, '](url)', selection[1] + insertionLength).textAfterFirstInsertion;
            return {
                text: finalText,
                selection: [selection[0] + insertionLength, selection[1] + insertionLength]
            };
        }
    },

    makeQuote: {
        icon: 'quote-right',
        tooltip: 'Insert a quote',
        execute: function execute(text, selection) {
            selection = (0, _ReactMdeTextHelper.selectCurrentWorkIfCarretIsInsideOne)(text, selection);

            var textInsertion = void 0;

            textInsertion = (0, _ReactMdeTextHelper.insertBreaksBeforeSoThatTheresAnEmptyLineBefore)(text, selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            textInsertion = (0, _ReactMdeTextHelper.insertBefore)(text, '> ', selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            textInsertion = (0, _ReactMdeTextHelper.insertBreaksAfterSoThatTheresAnEmptyLineAfter)(text, selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            return {
                text: text,
                selection: selection
            };
        }
    },

    makeCode: {
        icon: 'code',
        tooltip: 'Insert code',
        execute: function execute() {
            var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var selection = arguments[1];

            selection = (0, _ReactMdeTextHelper.selectCurrentWorkIfCarretIsInsideOne)(text, selection);

            if (text.slice(selection[0], selection[1]).indexOf('\n') === -1) {
                // when there's no breaking line
                return (0, _ReactMdeCommandHelper.makeACommandThatInsertsBeforeAndAfter)(text, selection, '`');
            }
            var textInsertion = void 0;

            // insert breaks before, if needed
            textInsertion = (0, _ReactMdeTextHelper.insertBreaksBeforeSoThatTheresAnEmptyLineBefore)(text, selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            // inserts ```\n before
            textInsertion = (0, _ReactMdeTextHelper.insertBefore)(text, '```\n', selection, false);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            // inserts ```\n after
            textInsertion = (0, _ReactMdeTextHelper.insertAfter)(text, '\n```', selection, false);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            // insert breaks after, if needed
            textInsertion = (0, _ReactMdeTextHelper.insertBreaksAfterSoThatTheresAnEmptyLineAfter)(text, selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            return { text: text, selection: selection };
        }
    },

    makeImage: {
        icon: 'picture-o',
        tooltip: 'Insert a picture',
        execute: function execute(text, selection) {
            var _insertText2 = (0, _ReactMdeTextHelper.insertText)(text, '![', selection[0]),
                textAfterFirstInsertion = _insertText2.textAfterFirstInsertion,
                insertionLength = _insertText2.insertionLength;

            var finalText = (0, _ReactMdeTextHelper.insertText)(textAfterFirstInsertion, '](image-url)', selection[1] + insertionLength).newText;
            return {
                text: finalText,
                selection: [selection[0] + insertionLength, selection[1] + insertionLength]
            };
        }
    },

    makeUnorderedList: {
        icon: 'list-ul',
        tooltip: 'Add a bulleted list',
        execute: function execute(text, selection) {
            return (0, _ReactMdeCommandHelper.makeList)(text, selection, '- ');
        }
    },

    makeOrderedList: {
        icon: 'list-ol',
        tooltip: 'Add a numbered list',
        execute: function execute(text, selection) {
            return (0, _ReactMdeCommandHelper.makeList)(text, selection, function (item, index) {
                return index + 1 + '. ';
            });
        }
    },

    getDefaultCommands: function getDefaultCommands() {
        return [[this.makeHeader, this.makeBold, this.makeItalic], [this.makeLink, this.makeQuote, this.makeCode, this.makeImage], [this.makeUnorderedList, this.makeOrderedList]];
    }
};
module.exports = exports['default'];