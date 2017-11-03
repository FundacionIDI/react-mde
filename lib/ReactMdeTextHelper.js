'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.insertText = insertText;
exports.insertBefore = insertBefore;
exports.insertAfter = insertAfter;
exports.getBreaksNeededForEmptyLineBefore = getBreaksNeededForEmptyLineBefore;
exports.getBreaksNeededForEmptyLineAfter = getBreaksNeededForEmptyLineAfter;
exports.insertBreaksBeforeSoThatTheresAnEmptyLineBefore = insertBreaksBeforeSoThatTheresAnEmptyLineBefore;
exports.insertBreaksAfterSoThatTheresAnEmptyLineAfter = insertBreaksAfterSoThatTheresAnEmptyLineAfter;
exports.insertBeforeEachLine = insertBeforeEachLine;
exports.getSurroundingWord = getSurroundingWord;
exports.selectCurrentWorkIfCarretIsInsideOne = selectCurrentWorkIfCarretIsInsideOne;
// TEXT INSERTION HELPERS

/**
 * Inserts text in the given position
 *
 * @param {any} text
 * @param {any} insertionText
 * @param {any} position
 * @returns
 */
function insertText(text, insertionText, position) {
    var newText = [text.slice(0, position), insertionText, text.slice(position)].join('');
    return { newText: newText, insertionLength: insertionText.length };
}

/**
 * Inserts the given text before. The selection is moved ahead so the
 *
 * @export
 * @param {any} text
 * @param {any} insertionText
 * @param {any} selection
 * @returns
 */
function insertBefore(text, insertionText, selection) {
    var includeTheInsertionInTheSelectioStart = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    var textInsertion = insertText(text, insertionText, selection[0]);
    var newText = textInsertion.textAfterFirstInsertion;
    var insertionLength = textInsertion.insertionLength;
    var newSelection = void 0;

    if (includeTheInsertionInTheSelectioStart) {
        // in this case, the text inserted before will be part of the resulting selection
        newSelection = [selection[0], selection[1] + insertionLength];
    } else {
        // in this case, the inserted before will NOT be part of the resulting selection
        newSelection = selection.map(function (s) {
            return s + textInsertion.insertionLength;
        });
    }

    return { newText: newText, newSelection: newSelection };
}

/**
 * Inserts the given text after. The selection will change to encompass the new text
 *
 * @export
 * @param {any} text
 * @param {any} insertionText
 * @param {any} selection
 * @returns
 */
function insertAfter(text, insertionText, selection) {
    var textInsertion = insertText(text, insertionText, selection[1]);
    var newText = textInsertion.textAfterFirstInsertion;
    var insertionLength = textInsertion.insertionLength;
    var newSelection = [selection[0], selection[1] + insertionLength];

    return { newText: newText, newSelection: newSelection };
}

/**
 *  Gets the number of breaks needed so that there will be an empty line between the previous text
 */
function getBreaksNeededForEmptyLineBefore() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var startPosition = arguments[1];

    if (startPosition === 0) return 0;

    // rules:
    // - If we're in the first line, no breaks are needed
    // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
    //      may need to insert 0, 1 or 2 breaks

    var neededBreaks = 2;
    var isInFirstLine = true;
    for (var i = startPosition - 1; i >= 0 && neededBreaks >= 0; i--) {
        switch (text.charCodeAt(i)) {
            case 32:
                continue;
            case 10:
                {
                    neededBreaks--;
                    isInFirstLine = false;
                    break;
                }
            default:
                return neededBreaks;
        }
    }
    return isInFirstLine ? 0 : neededBreaks;
}

/**
 *  Gets the number of breaks needed so that there will be an empty line after the next text
 */
function getBreaksNeededForEmptyLineAfter(text, startPosition) {
    if (!text) throw Error('Argument \'text\' should be truthy');
    if (startPosition === text.length - 1) return 0;

    // rules:
    // - If we're in the first line, no breaks are needed
    // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
    //      may need to insert 0, 1 or 2 breaks

    var neededBreaks = 2;
    var isInLastLine = true;
    for (var i = startPosition; i < text.length && neededBreaks >= 0; i++) {
        switch (text.charCodeAt(i)) {
            case 32:
                continue;
            case 10:
                {
                    neededBreaks--;
                    isInLastLine = false;
                    break;
                }
            default:
                return neededBreaks;
        }
    }
    return isInLastLine ? 0 : neededBreaks;
}

/**
 * Inserts breaks before, only if needed. The returned selection will not include this breaks
 *
 * @export
 * @param {any} text
 * @param {any} selection
 * @returns
 */
function insertBreaksBeforeSoThatTheresAnEmptyLineBefore(text, selection) {
    var breaksNeededBefore = getBreaksNeededForEmptyLineBefore(text, selection[0]);
    var insertionBefore = Array(breaksNeededBefore + 1).join('\n');

    var newText = text;
    var newSelection = selection;

    // if line-breaks have to be added before
    if (insertionBefore) {
        var textInsertion = insertText(text, insertionBefore, selection[0]);
        newText = textInsertion.textAfterFirstInsertion;
        newSelection = selection.map(function (s) {
            return s + textInsertion.insertionLength;
        });
    }

    return { newText: newText, newSelection: newSelection };
}

/**
 * Inserts breaks after, only if needed. The returned selection will not include this breaks
 *
 * @export
 * @param {any} text
 * @param {any} selection
 * @returns
 */
function insertBreaksAfterSoThatTheresAnEmptyLineAfter(text, selection) {
    var breaksNeededBefore = getBreaksNeededForEmptyLineAfter(text, selection[1]);
    var insertionAfter = Array(breaksNeededBefore + 1).join('\n');

    var newText = text;
    var newSelection = selection;

    // if line-breaks have to be added before
    if (insertionAfter) {
        var textInsertion = insertText(text, insertionAfter, selection[1]);
        newText = textInsertion.textAfterFirstInsertion;
        newSelection = selection.map(function (s) {
            return s + textInsertion.insertionLength;
        });
    }

    return { newText: newText, newSelection: newSelection };
}

/**
 * Inserts insertionString before each line
 */
function insertBeforeEachLine(text, insertion, selection) {
    var substring = text.slice(selection[0], selection[1]);
    var lines = substring.split(/\n/);

    var insertionLength = 0;
    var modifiedText = lines.map(function (item, index) {
        if (typeof insertion === 'string') {
            insertionLength += insertion.length;
            return insertion + item;
        } else if (typeof insertion === 'function') {
            var insertionResult = insertion(item, index);
            insertionLength += insertionResult.length;
            return insertion(item, index) + item;
        }
        throw Error('insertion is expected to be either a string or a function');
    }).join('\n');

    var newText = text.slice(0, selection[0]) + modifiedText + text.slice(selection[1]);
    return { newText: newText, newSelection: [selection[0], selection[1] + insertionLength] };
}

// MISC

/**
 * Gets the word surrounding the given position. Word delimiters are spaces and line-breaks
 *
 * @export
 * @param {any} text
 * @param {any} position
 */
function getSurroundingWord(text, position) {
    if (!text) throw Error('Argument \'text\' should be truthy');

    var isWordDelimiter = function isWordDelimiter(c) {
        return c === ' ' || c.charCodeAt(0) === 10;
    };

    // leftIndex is initialized to 0 because if position is 0, it won't even enter the iteration
    var leftIndex = 0;
    // rightIndex is initialized to text.length because if position is equal to text.length it won't even enter the interation
    var rightIndex = text.length;

    // iterate to the left
    for (var i = position; i - 1 > -1; i--) {
        if (isWordDelimiter(text[i - 1])) {
            leftIndex = i;
            break;
        }
    }

    // iterate to the right
    for (var _i = position; _i < text.length; _i++) {
        if (isWordDelimiter(text[_i])) {
            rightIndex = _i;
            break;
        }
    }

    return {
        word: text.slice(leftIndex, rightIndex),
        position: [leftIndex, rightIndex]
    };
}

/**
 * Returns the selection of the current work if selection[0] is equal to selection[1] and carret is inside a word
 *
 * @export
 * @param {any} text
 * @param {any} selection
 */
function selectCurrentWorkIfCarretIsInsideOne(text, selection) {
    if (text && text.length && selection[0] === selection[1]) {
        // the user is pointing to a word
        return getSurroundingWord(text, selection[0]).position;
    }
    return selection;
}