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
        if (e.currentTarget.value === '') setNoteName('New note');
        else setNoteName(e.currentTarget.value);
    };

    return (
        <>
            <input
                type='text'
                name='Note name'
                id='filename'
                placeholder={noteName}
                onBlur={onFilenameChange}
                aria-label='filename-input'
            />
            <section className='shadow' id='editor'>
                <textarea
                    className='code'
                    spellCheck={false}
                    name='markdown'
                    onInput={onTextInput}
                    tabIndex={-1}
                    id='input'
                ></textarea>
                <div itemID='output'>
                    <ReactMarkdown children={output} />
                </div>
            </section>
        </>
    );
};
