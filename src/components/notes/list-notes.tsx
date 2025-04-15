'use client'
import TildaList from '../ui/tilda-list'
import ItemNote from './item-note'
import { FC } from 'react'
import Note from '@/type/notes.type'
import { ItemGroup } from '.'

export interface ListNoteProps {
    list: Note[]
}

const ListNote: FC<ListNoteProps> = ({ list }) => {
    return (
        <TildaList className="w-full max-w-[920px]">
            {list.map((el) => {
                if (!el.groups) {
                    return <ItemNote {...el} key={el.url} />
                }
                return <ItemGroup {...el} key={el.url} />
            })}
        </TildaList>
    )
}

export default ListNote
