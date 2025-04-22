import { AxiosRequestConfig } from 'axios'
import fetchNotes from './fetch'

const getNoteContent = async (
    path: string,
    config?: AxiosRequestConfig,
): Promise<string> => {
    const { data } = await fetchNotes('/' + path, config)

    return data
}

export default getNoteContent
