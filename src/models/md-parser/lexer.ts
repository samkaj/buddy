/**
 * An enum representing supported markdown tags.
 *
 * @enum {number}
 */
export enum MD {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Paragraph,
  NotImplemented,
}

/**
 * A token with a markdown tag and a string containing
 * a string which represents the HTML content.
 *
 *
 */
export type Token = {
  tag: MD;
  content: string;
};

/**
 * Tokenizes an array of strings representing markdown
 * formatted text.
 *
 * @param lines An array of strings to be tokenized from markdown.
 * @returns {Array<Token>} An array of tokens.
 */
export const tokenize = (lines: Array<string>): Array<Token> => {
  let tokens = new Array<Token>();
  let i = 0;
  while (i < lines.length) {
    let line: string = lines[i].trim();
    if (line.startsWith('#')) {
      tokens.push(tokenizeAtx(line));
      i++;
      continue;
    }
  }
  return tokens;
};

const tokenizeAtx = (line: string): Token => {
  let level = 0;
  while (line.charAt(level) === '#') {
    level++;
  }
  if (level > 6) {
    return { tag: MD.Paragraph, content: line.trim() };
  }
  let content = line.substring(level);
  let trailingHashes = 0;
  if (content.endsWith('#')) {
    trailingHashes++;
    let pos = content.length - 1;
    while (content[pos] === '#' && pos > 0) {
      trailingHashes++;
      pos--;
    }
    if (content[pos] === ' ') {
      return {
        tag: level - 1,
        content: content.substring(0, trailingHashes).trim(),
      };
    }
  }
  return {
    tag: level - 1,
    content: content.trim(),
  };
};
