import sql from '@/configs/sql'
import { nameTableNotes } from '@/configs/sql/create-table-notes'
import Note from '@/type/notes.type'

interface NoteSql {
    name: string
    isgroup: boolean
    path: string
}

const notesTreeGroups = (
    levels: { [key: number]: NoteSql[] },
    level: number = 1,
    key: string = '',
) => {
    if (!levels[level]) return []
    const data = []
    const rgx = new RegExp('^' + key)
    for (let j = 0; j < levels[level].length; j++) {
        const note = levels[level][j]
        if (key.length > 0 && !note.path.match(rgx)) {
            continue
        }
        const obj: Note = {
            title: note.name,
            url: note.path.replaceAll('.', '/'),
        }
        if (note.isgroup) {
            obj.groups = notesTreeGroups(levels, level + 1, note.path)
        }
        data.push(obj)
    }

    return data
}

export const GET = async () => {
    try {
        const notes = (await sql.query(`
            SELECT name, isGroup, path
            FROM ${nameTableNotes}
            WHERE nlevel(path) > 0;`)) as NoteSql[]

        const levels: { [key: number]: NoteSql[] } = {}

        for (let i = 0; i < notes.length; i++) {
            const note = notes[i]
            const keys = note.path.split('.')
            if (levels[keys.length]) {
                levels[keys.length].push(note)
                continue
            }
            levels[keys.length] = [note]
        }

        return Response.json(notesTreeGroups(levels))
    } catch {
        return new Response('error server', {
            status: 500,
        })
    }
}
