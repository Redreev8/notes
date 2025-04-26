import { unified } from 'unified'
import remarkParse from 'remark-parse'

export const parserMarkdownToTree = unified().use(remarkParse)
