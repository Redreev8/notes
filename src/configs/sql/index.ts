import { neon } from '@neondatabase/serverless'
import createTableNotes from './create-table-notes'
import createTableNoteContent from './create-table-note-content'
export { default as createTableNotes } from './create-table-notes'
export { default as createTableNoteContent } from './create-table-note-content'

const sql = neon(`${process.env.DATABASE_URL}`)

export const migrate = async () => {
    createTableNotes()
    createTableNoteContent()
}

export default sql
