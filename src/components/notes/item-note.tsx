import Note from '@/type/notes.type'
import Link from 'next/link'
import { FC } from 'react'
import { TildaItem } from '../ui/tilda-list'
import Title from '../ui/title'

const ItemNote: FC<Note> = ({ title, url }) => {
    return (
        <TildaItem key={title} isP>
            <div className="text-text flex w-full justify-between">
                <Link className="w-full pt-2" href={`/note/${url}`}>
                    <Title as={2} size={4}>
                        {title}
                    </Title>
                </Link>
            </div>
        </TildaItem>
    )
}

export default ItemNote
