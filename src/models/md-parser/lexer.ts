/**
 * An enum representing supported markdown tags.
 *
 * @enum {number}
 */
export enum MD {
    Paragraph,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Newline,
    Blockquote,
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
        if (line.startsWith("#")) {
            // Atx-style heading.
            // # A heading
            tokens.push(tokenizeAtx(line));
            i++;
            continue;
        }
        if (line.match(/^(-)+$|^(=)+$/) !== null && i > 0) {
            // Setext-style heading.
            // A heading
            // ---
            const header = line[0] === "=" ? MD.Heading1 : MD.Heading2;
            tokens.push({ tag: header, content: lines[i - 1].trim() });
            i += i < lines.length - 1 ? 2 : 1; // don't skip the last line.
            continue;
        } else if (
            i + 1 < lines.length &&
            lines[i + 1].match(/^(-)+$|^(=)+$/) !== null
        ) {
            i++;
            continue;
        }
        if (lines[i].endsWith("  ")) {
            tokens.push({ tag: MD.Paragraph, content: line });
            tokens.push({ tag: MD.Newline, content: "" });
            i++;
            continue;
        }
        tokens.push({ tag: MD.Paragraph, content: line });
        i++;
    }
    return tokens;
};

/**
 * Tokenizes markdown headers in atx-style.
 *
 * @example
 * ### Hello mom ###### -> {tag: MD.Header3, content: 'Hello mom'}
 *
 * @param {string} line A markdown formatted atx-style header.
 * @returns {Token} A tokenized version of the line input.
 */
const tokenizeAtx = (line: string): Token => {
    let level = 0;
    while (line.charAt(level) === "#") {
        level++;
    }
    if (level > 6) {
        return { tag: MD.Paragraph, content: line.trim() };
    }
    return {
        tag: level,
        content: removeTrailingHashes(line.trim().substring(level)),
    };
};

/**
 * Removes trailing #'s from a line if they are not escaped.
 *
 * @param {string} line A string to be trimmed of #'s.
 * @returns {string} The trimmed version of the inputted string.
 */
const removeTrailingHashes = (line: string): string => {
    const hasTrailingHashes = line.match(/^.*( #+)$/) !== null;
    if (hasTrailingHashes) {
        let endPos = line.length - 1;
        while (line.charAt(endPos) === "#") {
            endPos--;
        }
        return line.substring(0, endPos).trim();
    }

    const hasEscapedHashes = line.match(/^.*( |\\#+)$/) !== null;
    if (hasEscapedHashes) {
        return line.replaceAll("\\", "").trim();
    }

    return line.trim();
};
