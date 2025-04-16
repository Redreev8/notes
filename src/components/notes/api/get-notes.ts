import { AxiosRequestConfig } from 'axios'
import fetchNotes from './feth'
import Note from '@/type/notes.type'

const getNotes = async (config?: AxiosRequestConfig): Promise<Note[]> => {
    const { data } = await fetchNotes('/', config)

    return data
}

export default getNotes
