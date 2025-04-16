'use client'
import TildaList from '../ui/tilda-list'
import ItemNote from './item-note'
import { AreaHTMLAttributes, FC, MouseEvent } from 'react'
import Note from '@/type/notes.type'
import { ItemGroup } from '.'

export interface ListNoteProps extends AreaHTMLAttributes<HTMLUListElement> {
    list: Note[]
    onToGroupOrNote?: (e: MouseEvent<HTMLAnchorElement>) => void
}

const ListNote: FC<ListNoteProps> = ({ list, onToGroupOrNote, ...props }) => {
    return (
        <TildaList {...props}>
            {list.map((el) => {
                if (!el.groups) {
                    return (
                        <ItemNote
                            onToNote={onToGroupOrNote}
                            {...el}
                            key={el.url}
                        />
                    )
                }
                return (
                    <ItemGroup
                        onToGroup={onToGroupOrNote}
                        {...el}
                        key={el.url}
                    />
                )
            })}
        </TildaList>
    )
}

export default ListNote
