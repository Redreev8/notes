import Note from '@/type/notes.type'
import Link from 'next/link'
import { FC, MouseEvent } from 'react'
import { TildaItem } from '../ui/tilda-list'
import Title from '../ui/title'

interface ItemNote extends Note {
    onToNote?: (e: MouseEvent<HTMLAnchorElement>) => void
}

const ItemNote: FC<ItemNote> = ({ title, url, onToNote }) => {
    return (
        <TildaItem key={title} isP>
            <div className="text-text flex w-full justify-between">
                <Link
                    className="w-full pt-3"
                    onClick={onToNote}
                    href={`/note/${url}`}
                >
                    <Title as={2} size={5}>
                        {title}
                    </Title>
                </Link>
            </div>
        </TildaItem>
    )
}

export default ItemNote
