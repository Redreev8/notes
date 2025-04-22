'use client'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import getNoteContent from '../api/get-note-content'

const useGetNoteContent = () => {
    const { params } = useParams<{ params: string[] }>()
    const { isPending, data } = useQuery({
        queryKey: ['note-content/' + params.join('/')],
        queryFn: () => getNoteContent(params.join('/')),
    })

    return {
        isPending,
        content: data,
    }
}

export default useGetNoteContent
