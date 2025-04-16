'use client'
import { useState, useEffect } from 'react'
import Note from '@/type/notes.type'
import { useQuery } from '@tanstack/react-query'
import { useParams, usePathname } from 'next/navigation'
import getNotes from '../api/get-notes'

const useGetNotesTree = () => {
    const { isPending, data } = useQuery({
        queryKey: ['notes'],
        queryFn: () => getNotes(),
    })
    const [activeList, setActiveList] = useState<Note[]>([])
    const [prevList, setPrevList] = useState<Note[]>([])
    const { params } = useParams()
    const pathname = usePathname()

    useEffect(() => {
        if (!data) return
        if (!params) {
            setActiveList(data)
            return
        }
        if (!Array.isArray(params)) return
        const keys = params.reduce((arr, el, i) => {
            if (i - 1 < 0) {
                arr[i] = el
                return arr
            }
            arr[i] = `${arr[i - 1]}/` + el
            return arr
        }, [] as string[])
        let k: number = 0
        let activeList: Note[] = data
        let prevList: Note[] = data
        while (keys[k]) {
            for (let i = 0; i < activeList.length; i++) {
                const note = activeList[i]
                if (!note.url.includes(keys[k])) continue
                prevList = [...activeList]
                activeList = note.groups!
                k++
                break
            }
        }
        setActiveList(activeList)
        setPrevList(prevList)
    }, [data, pathname])

    return {
        isPending,
        activeList,
        prevList,
    }
}

export default useGetNotesTree
