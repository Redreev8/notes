import sql from '.'

export const nameTableNoteContent = 'NoteContent'

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
    'use server'
    await sql.query(`DROP TABLE IF EXISTS ${nameTableNoteContent}`)
    await sql.query(`
        CREATE TABLE IF NOT EXISTS ${nameTableNoteContent} (
            content TEXT,
            path ltree REFERENCES Notes (path) UNIQUE
        )
    `)
    await sql.query(`
        INSERT INTO ${nameTableNoteContent}
            (content, path) VALUES
            (
                '0Lorem ipsum dolor sit amet, *consectetur* adipisicing elit, sed do eiusmod\ntempor incididunt ut **labore et dolore magna aliqua**. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. ***Duis aute irure dolor*** in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. ~~Excepteur sint occaecat~~ cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n## H2\n1Lorem ipsum dolor sit amet, *consectetur* adipisicing elit, sed do eiusmod\ntempor incididunt ut **labore et dolore magna aliqua**. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat.\n***Duis aute irure dolor*** in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. ~~Excepteur sint occaecat~~ cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n### H3\n unordered list:\n\n- item-1\n- sub-item-1\n- sub-item-2\n- item-2\n+ item-3\nordered list:\n\n1. item-1\n2. item-2\n3. item-3\n#### Header4\n##### Header5\nYou may also want some images right in here like ![GitHub Logo](https://cloud.githubusercontent.com/assets/5456665/13322882/e74f6626-dc00-11e5-921d-f6d024a01eaa.png "GitHub") - you can do that but I would recommend you to use the component "image" and simply split your text.\n###### Header6\nLet us do some links - this for example: https://github.com/MinhasKamal/github-markdown-syntax is **NOT** a link but this: is [GitHub](https://github.com/MinhasKamal/github-markdown-syntax)\n', 'b'),
            ('Lorem ipsum dolor sit amet, *consectetur* \n', 'a.b.a'),
            ('First line with two spaces after, *consectetur*. And the next line.\n First line with the HTML tag after.\n And the next line.\n', 'a.a');
    `)
}
