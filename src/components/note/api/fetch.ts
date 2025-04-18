import axios from 'axios'

const fetchNoteContent = axios.create({
    baseURL: '/api/notes/content/',
})

export default fetchNoteContent
