/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Notes } from '.';

const setup = () => {
    const utils = render(<Notes />);
    const fileNameInput = utils.getByLabelText('filename-input');
    return {
        input: fileNameInput,
        ...utils,
    };
};

it('renders the component with all its parts', () => {
    const utils = setup();
    const editor: HTMLElement | null = document.getElementById('editor');

    expect(editor).not.toBeNull();
    expect(editor?.childElementCount).toEqual(2);
    expect(utils.getByPlaceholderText('New note')).not.toBeNull();
});

it('finds the New Note placeholder', async () => {
    const utils = setup();
    await utils.findByPlaceholderText('New note');
    expect(utils.getByPlaceholderText('New note')).toBeInTheDocument();
});

it('re-enters the New Note placeholder if input becomes empty', () => {
    const { input } = setup();
    userEvent.type(input, 'a');
    userEvent.clear(input);
    expect(screen.getByPlaceholderText('New note')).toBeInTheDocument();
});
