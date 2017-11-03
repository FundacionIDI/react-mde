'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeList = makeList;
exports.makeHeader = makeHeader;
exports.makeACommandThatInsertsBeforeAndAfter = makeACommandThatInsertsBeforeAndAfter;

var _ReactMdeTextHelper = require('./ReactMdeTextHelper');

/**
 * Helper for creating commands that make lists
 * @export
 * @param {any} text
 * @param {any} selection
 * @param {any} insertionBeforeEachLine
 * @returns
 */
function makeList(text, selection, insertionBeforeEachLine) {
    var textInsertion = void 0;

    selection = (0, _ReactMdeTextHelper.selectCurrentWorkIfCarretIsInsideOne)(text, selection);

    // insert breaks before, if needed
    textInsertion = (0, _ReactMdeTextHelper.insertBreaksBeforeSoThatTheresAnEmptyLineBefore)(text, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;

    // inserts 'insertionBeforeEachLine' before each line
    textInsertion = (0, _ReactMdeTextHelper.insertBeforeEachLine)(text, insertionBeforeEachLine, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;

    // insert breaks after, if needed
    textInsertion = (0, _ReactMdeTextHelper.insertBreaksAfterSoThatTheresAnEmptyLineAfter)(text, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;

    return {
        text: text,
        selection: selection
    };
}

/**
 * Helper for creating a command that makes a header
 * @param {any} text
 * @param {any} selection
 * @param {any} insertionBefore
 * @returns
 */
function makeHeader(text, selection, insertionBefore) {
    selection = (0, _ReactMdeTextHelper.selectCurrentWorkIfCarretIsInsideOne)(text, selection);
    // the user is selecting a word section
    var insertionText = (0, _ReactMdeTextHelper.insertBefore)(text, insertionBefore, selection, false);
    var newText = insertionText.newText;
    var newSelection = insertionText.newSelection;
    return {
        text: newText,
        selection: newSelection
    };
}

function makeACommandThatInsertsBeforeAndAfter(text, selection, insertion) {
    selection = (0, _ReactMdeTextHelper.selectCurrentWorkIfCarretIsInsideOne)(text, selection);
    // the user is selecting a word section

    var _insertText = (0, _ReactMdeTextHelper.insertText)(text, insertion, selection[0]),
        textAfterFirstInsertion = _insertText.textAfterFirstInsertion,
        insertionLength = _insertText.insertionLength;

    var finalText = (0, _ReactMdeTextHelper.insertText)(textAfterFirstInsertion, insertion, selection[1] + insertionLength).newText;
    return {
        text: finalText,
        selection: [selection[0] + insertionLength, selection[1] + insertionLength]
    };
}