import { JSX } from 'react'
import { Block } from './editor'

interface getInlineBlocksProps {
    block: Block
    isHover: boolean
}

const getInlineBlocks = ({ block, isHover }: getInlineBlocksProps) => {
    if (!block.children) {
        return null
    }
    const content = block.children.map((el, i) => {
        if (el.type === 'text') {
            if (isHover) {
                return el.markdown
            }
            return el.value
        }
        if (el.type === 'emphasis') {
            return (
                <em key={i}>
                    {getInlineBlocks({
                        block: el,
                        isHover,
                    })}
                </em>
            )
        }
        if (el.type === 'strong') {
            return (
                <strong key={i}>
                    {getInlineBlocks({
                        block: el,
                        isHover,
                    })}
                </strong>
            )
        }
        if (el.type === 'link') {
            return (
                <a key={i} href={'#' + el.url}>
                    {getInlineBlocks({
                        block: el,
                        isHover,
                    })}
                </a>
            )
        }
        if (el.type === 'listItem') {
            return (
                <li key={i}>
                    {getInlineBlocks({
                        block: el,
                        isHover,
                    })}
                </li>
            )
        }
        if (el.type === 'paragraph') {
            return getInlineBlocks({
                block: el,
                isHover,
            })
        }
        return null
    }) as JSX.Element[]
    return content
}

export default getInlineBlocks
