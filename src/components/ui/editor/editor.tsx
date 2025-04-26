'use client'
import useArrayObject from '@/hooks/useArray'
import { FC, FocusEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { parserMarkdownToTree } from './parser-markdown-to-tree'
import getInlineBlocks from './get-inline-blocks'
import Title from '../title'
import Text from '../text'
import List from '../list'
import ListNumber from '../list-number'
import { getCursorPositionLength, setCursorEditable } from '@/helper/cursor'
import debounceArrow from '@/helper/debounce'
import { formatBlock } from './format-blocks'

export interface EditorProps {
    children: string
    onChange?: (markdown: string) => void
}

export interface Block {
    id: string
    type: string
    children?: Block[]
    position: {
        end: { line: number; column: number; offset: number }
        start: { line: number; column: number; offset: number }
    }
    markdown: string
    value?: string
    url?: string
    ordered?: boolean
    depth?: 2 | 1 | 3 | 4 | 5 | 6
}

export const parentBlock = ['heading']
const debounceParser = (markdown: string) =>
    parserMarkdownToTree.parse(markdown).children as Block[]

const Editor: FC<EditorProps> = ({ children }) => {
    const [markdownTree, setMarkdownTree] = useState<Block[]>([])
    const [blocks, { update }] = useArrayObject<Block>(markdownTree, {
        format: (newObj) => formatBlock(newObj, children),
    })
    const [isHover, setHover] = useState<number | null>(null)
    const targetRef = useRef<HTMLElement>(null)
    const targetCursorRef = useRef<number>(0)
    useEffect(() => {
        setMarkdownTree(() => debounceParser(children))
    }, [children])

    useEffect(() => {
        if (!targetRef.current) return
        targetRef.current.focus()
        setCursorEditable(targetRef.current, targetCursorRef.current)
    }, [blocks])

    return blocks.map((b, i) => {
        const debounceInputCapture = debounceArrow<FormEvent<HTMLElement>>(
            (e) => {
                const target = e.target as HTMLElement
                if (!target) return
                targetCursorRef.current = getCursorPositionLength(target)
                let content: string = target.textContent!
                if (b.type === 'list') {
                    const items = [...target.childNodes].map(
                        (el) => el.textContent!,
                    )
                    content = items.join(' \n') as string
                }
                const parsBlockContent = debounceParser(content)[0]
                const blocks = formatBlock(
                    { ...parsBlockContent },
                    content,
                ) as Block & { id: string }
                update(i, { ...b, ...blocks })
            },
        )
        const attributes = {
            contentEditable: true,
            suppressContentEditableWarning: true,
            onFocusCapture: (e: FocusEvent<HTMLElement>) => {
                setHover(i)
                targetRef.current = e.currentTarget
            },
            onInputCapture: debounceInputCapture,
            onBlur: () => {
                setHover(null)
                targetRef.current = null
            },
        }
        const content = getInlineBlocks({
            block: b,
            isHover: isHover === i,
        })

        if (b.type === 'heading') {
            return (
                <Title size={b.depth!} {...attributes} key={b.id}>
                    {content}
                </Title>
            )
        }
        if (b.type === 'paragraph') {
            return (
                <Text {...attributes} key={b.id}>
                    {content}
                </Text>
            )
        }
        if (b.type === 'list' && b.ordered) {
            return (
                <ListNumber {...attributes} key={b.id}>
                    {content}
                </ListNumber>
            )
        }
        if (b.type === 'list') {
            return (
                <List {...attributes} key={b.id}>
                    {content}
                </List>
            )
        }
    })
}

export default Editor
