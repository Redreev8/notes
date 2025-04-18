'use client'
import classNames from 'classnames'
import Container from '../ui/container'
import useGetNotesTree from './hooks/useGetNotesTree'
import ListNote from './list-notes'
import useDaleyToHref from '@/hooks/useDaleyToHref'
import { AnimationEvent, useEffect, useState } from 'react'
const PageNotes = () => {
    const { isPending, prevList, activeList } = useGetNotesTree()
    const [isToGroup, setIsToGroup] = useState<boolean>(false)
    const [isToNote, setIsToNote] = useState<boolean>(false)

    const { handelClickHref, to, toNoAnimate } = useDaleyToHref({
        onClick: (e) => {
            const link = e.currentTarget
            if (link.href!.match(/\/note\//)) {
                console.log(link.href!.match(/\/note\//))
                setIsToNote(true)
                return
            }
            if (prevList.length === 0) {
                toNoAnimate()
                return
            }
            setIsToGroup(true)
        },
        cbTo: () => {
            setIsToGroup(false)
        },
    })
    useEffect(() => {
        console.log(isToNote)
    }, [isToNote])
    const handelAnimateEnd = (e: AnimationEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return
        if (isToGroup || isToNote) to()
    }
    const clActive = classNames('bg-bg w-full opacity-0', {
        'max-w-[50%]': prevList.length !== 0,
        'max-w-[calc(50%-10px)]': prevList.length === 0,
        'animate-hide': isToNote,
        'animate-show-delay': !isToNote,
    })
    const clPrev = classNames('bg-bg z-2 w-full max-w-[50%]', {
        'animate-hide': isToGroup || isToNote,
        'animate-right-to-left transform-(--animate-right-to-left-start-transform)':
            !isToGroup && !isToNote,
    })
    if (isPending) return
    return (
        <Container className="flex justify-end gap-5">
            {prevList.length !== 0 && (
                <div onAnimationEnd={handelAnimateEnd} className={clPrev}>
                    <ListNote
                        onToGroupOrNote={handelClickHref}
                        list={prevList}
                    />
                </div>
            )}
            <div onAnimationEnd={handelAnimateEnd} className={clActive}>
                <ListNote onToGroupOrNote={handelClickHref} list={activeList} />
            </div>
        </Container>
    )
}

export default PageNotes
