const setCursorEditable = (editableElem: HTMLElement, position: number) => {
    const range = document.createRange()
    const sel = window.getSelection()
    const child = [...editableElem.childNodes].find((el) => {
        if (position <= el!.textContent!.length) return true
        position -= el!.textContent!.length
        return false
    })
    if (!child) return
    if (child.nodeName != '#text') {
        setCursorEditable(child as HTMLElement, position)
        return
    }
    if (!sel) return

    range.setStart(child, position)
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)
    editableElem.focus()
}

export default setCursorEditable
