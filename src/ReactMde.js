import React, { Component } from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import HeaderGroup from './components/HeaderGroup';
import HeaderItem from './components/HeaderItem';
import HeaderItemDropdown from './components/HeaderItemDropdown';
import MarkdownHelp from './components/MarkdownHelp';

import {
    getSelection,
    setSelection
} from './ReactMdeSelectionHelper';

class ReactMde extends Component {

    constructor() {
        super();
        this.converter = new showdown.Converter();
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    /**
     * Handler for the textarea value change
     * @param {any} e
     * @memberOf ReactMde
     */
    handleValueChange(e) {
        const { onChange } = this.props;
        onChange({ text: e.target.value, selection: null });
    }

    /**
     * Executes a command
     * @param {function} command
     * @memberOf ReactMde
     */
    executeCommand(command) {
        const { value: { text } } = this.props;

        const newValue = command.execute(text, getSelection(this.textarea));

        // let's select EVERYTHING and replace with the result of the command.
        // This will cause an 'inconvenience' which is: Ctrl + Z will select the whole
        // text. But this is the LEAST possible inconvenience. We can pretty much live
        // with it. I've tried everything in my reach, including reimplementing the textarea
        // history. That caused more problems than it solved.

        this.textarea.focus();
        setSelection(this.textarea, 0, this.textarea.value.length);
        document.execCommand('insertText', false, newValue.text);

        setSelection(this.textarea, newValue.selection[0], newValue.selection[1]);
    }

    /**
     * Renders react-mde
     * @returns
     * @memberOf ReactMde
     */
    render() {
        const {
            value: { text },
            commands,
            textareaId,
            textareaName
        } = this.props;

        const html = this.converter.makeHtml(text) || '<p>&nbsp</p>';

        let header = null;
        if (commands) {
            header = (<div className="mde-header">
                {
                    commands.map((cg, i) => (<HeaderGroup key={i}>
                        {
                            cg.map((c, j) => {
                                if (c.type === 'dropdown') {
                                    return (<HeaderItemDropdown
                                        key={j}
                                        icon={c.icon}
                                        commands={c.subCommands}
                                        onCommand={cmd => this.executeCommand(cmd)}
                                    />);
                                }
                                return <HeaderItem key={j} icon={c.icon} tooltip={c.tooltip} onClick={() => this.executeCommand(c)} />;
                            })
                        }
                    </HeaderGroup>))
                }
            </div>);
        }

        return (
            <div className="react-mde">
                {header}
                <div className="mde-text">
                    <textarea
                        onChange={this.handleValueChange}
                        value={text}
                        ref={(c) => { this.textarea = c; }}
                        id={textareaId}
                        name={textareaName}
                    />
                </div>
                <div className="mde-preview" dangerouslySetInnerHTML={{ __html: html }} />
                <div className="mde-help">
                    <MarkdownHelp />
                </div>
            </div>
        );
    }
}

ReactMde.propTypes = {
    commands: PropTypes.array,
    value: PropTypes.shape({
        text: PropTypes.string.isRequired,
        selection: PropTypes.arrayOf(PropTypes.number)
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    textareaId: PropTypes.string.isRequired,
    textareaName: PropTypes.string.isRequired
};

ReactMde.defaultProps = {
    commands: undefined
};

export default ReactMde;
