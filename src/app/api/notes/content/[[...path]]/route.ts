import sql from '@/configs/sql'
import { nameTableNoteContent } from '@/configs/sql/create-table-note-content'

interface NoteContentSql {
    content: string
    path: string
}

export const GET = async (
    request: Request,
    { params }: { params: Promise<{ path: string[] }> },
) => {
    try {
        const { path } = await params
        const [noteContent] = (await sql.query(
            `
            SELECT *
            FROM ${nameTableNoteContent} 
            WHERE path = $1`,
            [path.join('.')],
        )) as unknown as NoteContentSql[]
        if (!noteContent) {
            return new Response('not found', {
                status: 404,
            })
        }
        return new Response(noteContent.content)
    } catch {
        return new Response('error server', {
            status: 500,
        })
    }
}
