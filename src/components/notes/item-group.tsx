'use client'
import { FolderIcon } from '../ui/icons'
import { TildaItem } from '../ui/tilda-list'
import Title from '../ui/title'
import { FC } from 'react'
import Note from '@/type/notes.type'
import ItemNote from './item-note'
import Link from 'next/link'

export interface ItemGroupProps extends Note {}

const ItemGroup: FC<ItemGroupProps> = ({ title, url, groups }) => {
    if (!groups) {
        return <ItemNote title={title} groups={groups} url={url} />
    }
    return (
        <TildaItem key={title} isP>
            <Link href={`/notes/${url}`} className="relative pt-2">
                <div className="absolute -top-4 -left-1 z-1 h-4 w-8 cursor-pointer overflow-hidden">
                    <FolderIcon stroke="none" className="size-8 fill-current" />
                </div>
                <div className="text-text flex w-full justify-between">
                    <Title as={2} size={4}>
                        {title}
                    </Title>
                </div>
            </Link>
        </TildaItem>
    )
}

export default ItemGroup
