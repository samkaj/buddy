import { FocusEvent, FormEvent, useState } from 'react';
import './notes.scss';
import ReactMarkdown from 'react-markdown';

export const Notes = () => {
    const [output, setOutput] = useState<string>('');
    const [noteName, setNoteName] = useState<string>('New note');

    const onTextInput = (e: FormEvent<HTMLTextAreaElement>) => {
        setOutput(e.currentTarget.value);
    };

    const onFilenameChange = (e: FocusEvent<HTMLInputElement>) => {
        setNoteName(e.currentTarget.value);
    };

    return (
        <>
            <input
                type="text"
                name="Note name"
                id="filename"
                placeholder={noteName}
                className="filename"
                onBlur={onFilenameChange}
            />
            <section className="editor shadow">
                <textarea
                    className="input code"
                    spellCheck={false}
                    name="markdown"
                    onInput={onTextInput}
                    tabIndex={-1}
                    id="inputText"
                ></textarea>
                <div className="output">
                    <ReactMarkdown children={output} />
                </div>
            </section>
        </>
    );
};
