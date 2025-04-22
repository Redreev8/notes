import { JSX } from 'react'
import { Block } from './editor'

interface getInlineBlocksProps {
    block: Block
    markdown: string
    isHover: boolean
    parent?: Block
}

const getInlineBlocks = ({
    block,
    markdown,
    isHover,
    parent,
}: getInlineBlocksProps) => {
    if (!block.children) {
        return null
    }
    const content = block.children.map((el, i) => {
        if (el.type === 'text') {
            if (isHover) {
                return markdown.substring(
                    (parent ?? el).position.start.offset,
                    (parent ?? el).position.end.offset,
                )
            }
            return el.value
        }
        if (el.type === 'emphasis') {
            return (
                <em key={i}>
                    {getInlineBlocks({
                        block: el,
                        markdown,
                        isHover,
                        parent: parent ?? el,
                    })}
                </em>
            )
        }
        if (el.type === 'strong') {
            return (
                <strong key={i}>
                    {getInlineBlocks({
                        block: el,
                        markdown,
                        isHover,
                        parent: parent ?? el,
                    })}
                </strong>
            )
        }
        if (el.type === 'link') {
            return (
                <a key={i} href={'#' + el.url}>
                    {getInlineBlocks({
                        block: el,
                        markdown,
                        isHover,
                        parent: parent ?? el,
                    })}
                </a>
            )
        }
        if (el.type === 'listItem') {
            return (
                <li key={i}>
                    {getInlineBlocks({
                        block: el,
                        markdown,
                        isHover,
                    })}
                </li>
            )
        }
        if (el.type === 'paragraph') {
            return getInlineBlocks({
                block: el,
                markdown,
                isHover,
            })
        }
        return null
    }) as JSX.Element[]
    return content
}

export default getInlineBlocks
