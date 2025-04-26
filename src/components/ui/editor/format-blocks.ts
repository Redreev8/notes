import { Block } from './editor'

interface formatInlineBlockProps {
    block: Block
    markdown: string
    parent?: Block
}

export const formatInlineBlock = ({
    block,
    markdown,
    parent,
}: formatInlineBlockProps) => {
    if (block.type === 'text') {
        if (block.markdown) return block
        block.markdown = markdown.substring(
            (parent ?? block).position.start.offset,
            (parent ?? block).position.end.offset,
        )
        return block
    }
    if (block.type === 'listItem') {
        if (!block.children![0].children) return block
        const itemValue = markdown
            .substring(block.position.start.offset, block.position.end.offset)
            .match(/^(-|\d+.|\+)+\s/g)
        if (itemValue) {
            block.children![0].children.unshift({
                type: 'text',
                value: '',
                position: {
                    start: {
                        line: -1,
                        column: 0,
                        offset: 0,
                    },
                    end: {
                        line: 0,
                        column: 0,
                        offset: 0,
                    },
                },
                markdown: itemValue[0],
                id: '',
            })
        }
        block.children = block.children![0].children.map((el) => {
            return formatInlineBlock({
                block: el,
                markdown,
                parent: el,
            })
        })
        return block
    }
    if (!block.children) {
        return block
    }
    block.children = block.children.map((el) => {
        if (el.type === 'text') {
            const blockPosition = parent ?? block
            el.markdown = markdown.substring(
                blockPosition.position.start.offset,
                blockPosition.position.end.offset,
            )
            return el
        }
        const props: formatInlineBlockProps = {
            block: el,
            markdown,
            parent: block.type !== 'paragraph' ? block : parent,
        }
        if (block.type === 'paragraph' && el.children) {
            el.children.map((p) => {
                props.block = p
                return formatInlineBlock(props)
            })
            return el
        }

        return formatInlineBlock(props)
    })
    return block
}

export const formatBlock = (block: Block, markdown: string) => {
    block.children!.map((el) => {
        return formatInlineBlock({
            block: el,
            markdown,
            parent: block.type !== 'paragraph' ? block : undefined,
        })
    })
    return block
}
