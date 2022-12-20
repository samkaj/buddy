import { FormEvent, useState } from 'react';
import { generate } from '../models/md-parser/generator';
import './notes.scss';

export const Notes = () => {
    const [output, setOutput] = useState<JSX.Element[]>();

    const onTextInput = (e: FormEvent<HTMLTextAreaElement>) => {
        setOutput(generate(e.currentTarget.value));
    };

    return (
        <>
            <section className="editor">
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
