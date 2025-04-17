import sql from '.'

export const nameTableNoteContent = 'NoteContent'

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
    'use server'
    await sql.query(`DROP TABLE IF EXISTS ${nameTableNoteContent}`)
    await sql.query(`
        CREATE TABLE IF NOT EXISTS ${nameTableNoteContent} (
            content TEXT,
            path VARCHAR(100) REFERENCES Notes (path) UNIQUE
        )
    `)
    await sql.query(`
        INSERT INTO ${nameTableNoteContent}
            (content, path) VALUES
            ('## Clark \n First line with two spaces after. And the next line.\n First line with the HTML tag after.\n And the next line.\n', 'b'),
            ('## Clark \n', 'a.b.a'),
            ('First line with two spaces after. And the next line.\n First line with the HTML tag after.\n And the next line.\n', 'a.a');
    `)
}
