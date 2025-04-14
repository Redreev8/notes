import { neon } from '@neondatabase/serverless'
export { default as createTableNotes } from './create-table-notes'

const sql = neon(`${process.env.DATABASE_URL}`)

export default sql
