const debounceArrow = <T>(cb: (...args: T[]) => void, ms: number = 300) => {
    let timeout: ReturnType<typeof setTimeout>

    return (...args: T[]) => {
        if (timeout) clearTimeout(timeout!)
        timeout = setTimeout(() => cb(...args), ms)
    }
}

export default debounceArrow
