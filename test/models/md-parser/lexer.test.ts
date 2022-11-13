import { MD, Token, tokenize } from '../../../src/models/md-parser/lexer';

describe('tokenizeAtx', () => {
  it('returns 6 headers of each level.', () => {
    const lines = [
      '# header 1',
      '## header 2',
      '### header 3',
      '#### header 4',
      '##### header 5',
      '###### header 6',
    ];

    const tokens = tokenize(lines);

    let expected: Array<Token> = [
      { tag: MD.Heading1, content: 'header 1' },
      { tag: MD.Heading2, content: 'header 2' },
      { tag: MD.Heading3, content: 'header 3' },
      { tag: MD.Heading4, content: 'header 4' },
      { tag: MD.Heading5, content: 'header 5' },
      { tag: MD.Heading6, content: 'header 6' },
    ];

    expect(tokens).toStrictEqual(expected);
  });

  it('removes trailing hashes for headers.', () => {
    const lines = [
      '# lots of hashes ###########',
      '## one hash gone #',
      '### fancy ###',
      '#### ####',
    ];

    const tokens = tokenize(lines);

    let expected: Array<Token> = [
      { tag: MD.Heading1, content: 'lots of hashes' },
      { tag: MD.Heading2, content: 'one hash gone' },
      { tag: MD.Heading3, content: 'fancy' },
      { tag: MD.Heading4, content: '' },
    ];

    expect(tokens).toStrictEqual(expected);
  });

  it('does not remove trailing hashes.', () => {
    const lines = [
      '# lots of hashes###########',
      '# escaped \\###',
      '## # #  ## #',
    ];

    const tokens = tokenize(lines);

    let expected: Array<Token> = [
      { tag: MD.Heading1, content: 'lots of hashes###########' },
      { tag: MD.Heading1, content: 'escaped ###' },
      { tag: MD.Heading2, content: '# #  ##' },
    ];

    expect(tokens).toStrictEqual(expected);
  });

  it('lexes more than 6 hashes as a paragraph.', () => {
    const lines = ['####### exact', '########### more', '#######'];

    const tokens = tokenize(lines);

    let expected: Array<Token> = [
      { tag: MD.Paragraph, content: '####### exact' },
      { tag: MD.Paragraph, content: '########### more' },
      { tag: MD.Paragraph, content: '#######' },
    ];

    expect(tokens).toStrictEqual(expected);
  });
});

describe('tokenizeSetext', () => {
  it('returns two headers with correct level.', () => {
    const lines = ['header 1', '=', 'header 2', '-'];
    let tokens = tokenize(lines);

    let expected: Array<Token> = [
      { tag: MD.Heading1, content: 'header 1' },
      { tag: MD.Heading2, content: 'header 2' },
    ];
    expect(tokens).toStrictEqual(expected);
  });

  it('does not remove trailing hashes', () => {
    const lines = ['header 1 ###', '=', 'header 2 ##', '-'];
    let tokens = tokenize(lines);

    let expected: Array<Token> = [
      { tag: MD.Heading1, content: 'header 1 ###' },
      { tag: MD.Heading2, content: 'header 2 ##' },
    ];
    expect(tokens).toStrictEqual(expected);
  });
});
