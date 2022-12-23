import { FocusEvent, FormEvent, useState } from 'react';
import { generate } from '../models/md-parser/generator';
import './notes.scss';

export const Notes = () => {
    const [output, setOutput] = useState<JSX.Element[]>();
    const [noteName, setNoteName] = useState<string>('New note');

    const onTextInput = (e: FormEvent<HTMLTextAreaElement>) => {
        setOutput(generate(e.currentTarget.value));
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
                <div className="output">{output}</div>
            </section>
        </>
    );
};
