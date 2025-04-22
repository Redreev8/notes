'use client'
import Container from '../ui/container'
import useGetNoteContent from './hooks/useGetNoteContent'
import Editor from '../ui/editor/editor'

const PageNoteContent = () => {
    const { content } = useGetNoteContent()

    return (
        <Container className="flex gap-5">
            <div className="flex flex-col gap-5">
                <Editor>{content as string}</Editor>
            </div>
        </Container>
    )
}

export default PageNoteContent
