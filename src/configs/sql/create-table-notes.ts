import sql from '.'

export const nameTableNotes = 'notes'
export interface Token {
    token: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
    'use server'
    await sql.query('CREATE EXTENSION IF NOT EXISTS ltree')
    await sql.query(`DROP TABLE IF EXISTS ${nameTableNotes}`)
    await sql.query(`DROP TABLE IF EXISTS product_categories`)
    await sql.query(`
        CREATE TABLE IF NOT EXISTS ${nameTableNotes} (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            isGroup Boolean DEFAULT FALSE,
            path ltree NOT NULL
        )
    `)
    await sql.query(`
        INSERT INTO ${nameTableNotes}
            (name, isGroup, path) VALUES
            ('Clark', TRUE, 'a'),
            ('Ava1', FALSE, 'a.a'),
            ('Ava2', TRUE, 'a.b'),
            ('Ava2', FALSE, 'a.b.a'),
            ('Ava1', TRUE, 'a.b.b'),
            ('Clark', TRUE, 'c'),
            ('Clark', TRUE, 'c.a'),
            ('Clark', TRUE, 'c.a.b'),
            ('Dave', FALSE, 'b');
    `)
}
