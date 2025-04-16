import axios from 'axios'

const fetchNotes = axios.create({
    baseURL: '/api/notes',
})

export default fetchNotes
