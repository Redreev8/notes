import { AxiosRequestConfig } from 'axios'
import fetchNotes from './fetch'

const getNoteContent = async (config?: AxiosRequestConfig): Promise<string> => {
    const { data } = await fetchNotes('/', config)

    return data
}

export default getNoteContent
