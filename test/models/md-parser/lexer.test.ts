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
});
