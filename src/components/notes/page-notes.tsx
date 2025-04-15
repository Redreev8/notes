'use client'
import Container from '../ui/container'
import useGetNotesTree from './hooks/useGetNotesTree'
import ListNote from './list-notes'
const PageNotes = () => {
    const { isPending, activeList } = useGetNotesTree()

    if (isPending) return
    return (
        <Container className="flex justify-end">
            <ListNote list={activeList} />
        </Container>
    )
}

export default PageNotes
