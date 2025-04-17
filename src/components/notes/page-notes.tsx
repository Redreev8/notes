'use client'
import classNames from 'classnames'
import Container from '../ui/container'
import useGetNotesTree from './hooks/useGetNotesTree'
import ListNote from './list-notes'
import useDaleyToHref from '@/hooks/useDaleyToHref'
import { AnimationEvent, useState } from 'react'
const PageNotes = () => {
    const { isPending, prevList, activeList } = useGetNotesTree()
    const [isToGroup, setIsToGroup] = useState<boolean>(false)

    const { handelClickHref, to, toNoAnimate } = useDaleyToHref({
        onClick: () => {
            console.log(prevList.length)
            if (prevList.length === 0) {
                toNoAnimate()
                return
            }
            setIsToGroup(true)
        },
        cbTo: () => {
            setTimeout(() => {
                setIsToGroup(false)
            }, 1000)
        },
    })
    const handelAnimateEnd = (e: AnimationEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return
        if (!isToGroup) return
        to()
    }
    const clActive = classNames('animate-show-delay bg-bg w-full opacity-0', {
        'max-w-[50%]': prevList.length !== 0,
        'max-w-[calc(50%-10px)]': prevList.length === 0,
    })
    const clPrev = classNames('bg-bg z-2 w-full max-w-[50%]', {
        'animate-hide': isToGroup,
        'animate-right-to-left transform-(--animate-right-to-left-start-transform)':
            !isToGroup,
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
            <div className={clActive}>
                <ListNote onToGroupOrNote={handelClickHref} list={activeList} />
            </div>
        </Container>
    )
}

export default PageNotes
