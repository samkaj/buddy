import { MD, Token, tokenize } from "./lexer";

/**
 * Generates and returns HTML from input lines.
 * @param input the lines to be lexed
 * @returns a list of `JSX.Elements`.
 */
export const generate: any = (input: string) => {
    const tags: Array<Token> = tokenize(input.split("\n"));
    return tags.map(reactify);
};

const reactify = (token: Token) => {
    // FIXME: Enable rendering children recursively. Will be needed once lists and blockquotes happen.
    switch (token.tag) {
        case MD.Paragraph:
            return <p>{token.content}</p>;
        case MD.Heading1:
            return <h1>{token.content}</h1>;
        case MD.Heading2:
            return <h2>{token.content}</h2>;
        case MD.Heading3:
            return <h3>{token.content}</h3>;
        case MD.Heading4:
            return <h4>{token.content}</h4>;
        case MD.Heading5:
            return <h5>{token.content}</h5>;
        case MD.Heading6:
            return <h6>{token.content}</h6>;
        case MD.Newline:
            return <br />;
        case MD.Blockquote:
        case MD.NotImplemented:
            return <p>{token.content}</p>;
    }
};
