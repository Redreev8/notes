import { useLayoutEffect, useState } from 'react'

type Obj<T extends {}> = T & {
    id: string | number
}

const getId = () => 'id' + Math.random().toString(16).slice(2)

type returnUseArrayObject<T extends {}> = [
    array: Obj<T>[],
    {
        unshift: (newObj: T | Obj<T>) => void
        push: (newObj: T | Obj<T>) => void
        update: (i: number, updateObj: Obj<T>) => void
        insert: (i: number, newObj: T | Obj<T>) => void
        remove: (i: number) => void
        swap: (from: number, to: number) => void
    },
]

export interface useArrayObjectProps<T extends {}> {
    format?: (newObj: Obj<T>, el: T) => Obj<T>
    onUnshift?: (newObj: T | Obj<T>) => void
    onPush?: (newObj: T | Obj<T>) => void
    onUpdate?: (i: number, updateObj: Obj<T>) => void
    onInsert?: (i: number, newObj: T | Obj<T>) => void
    onRemove?: (i: number) => void
    onSwap?: (from: number, to: number) => void
}

const useArrayObject = <T extends object>(
    initialValue: (T | Obj<T>)[] = [],
    props: useArrayObjectProps<T> = {},
): returnUseArrayObject<T> => {
    const [array, setArray] = useState<Obj<T>[]>([])

    useLayoutEffect(() => {
        setArray(
            (prev) =>
                initialValue.map((el, i) => {
                    if (prev[i]) {
                        if (props.format) return props.format(prev[i], el)
                        return { ...prev[i], ...el }
                    }
                    const obj = (el as Obj<T>).id ? el : { id: getId(), ...el }
                    if (props.format) return props.format(obj as Obj<T>, el)
                    return obj
                }) as Obj<T>[],
        )
    }, [initialValue])

    const unshift = (newObj: T | Obj<T>) => {
        const obj = newObj as Obj<T>
        if (!obj.id) {
            obj.id = getId()
        }
        if (props.onUnshift) props.onUnshift(obj)
        setArray((prev) => [obj, ...prev])
    }
    const push = (newObj: T | Obj<T>) => {
        const obj = newObj as Obj<T>
        if (!obj.id) {
            obj.id = getId()
        }
        if (props.onPush) props.onPush(obj)
        setArray((prev) => [...prev, obj])
    }
    const update = (i: number, updateObj: Obj<T>) => {
        if (props.onUpdate) props.onUpdate(i, updateObj)
        setArray((prev) => {
            if (!prev[i]) return prev
            prev[i] = updateObj
            return [...prev]
        })
    }
    const insert = (i: number, newObj: T | Obj<T>) => {
        const obj = newObj as Obj<T>
        if (!obj.id) {
            obj.id = getId()
        }
        if (props.onInsert) props.onInsert(i, newObj)
        setArray((prev) => {
            if (!prev[i]) return prev
            prev.splice(i, 0, obj)
            return [...prev]
        })
    }
    const remove = (i: number) => {
        if (props.onRemove) props.onRemove(i)
        setArray((prev) => {
            if (!prev[i]) return prev
            return prev.filter((_, index) => i !== index)
        })
    }
    const swap = (from: number, to: number) => {
        if (props.onSwap) props.onSwap(from, to)
        setArray((prev) => {
            if (!prev[from] || !prev[to]) {
                return prev
            }

            ;[prev[from], prev[to]] = [prev[to], prev[from]]

            return [...prev]
        })
    }

    return [
        array,
        {
            unshift,
            push,
            update,
            insert,
            remove,
            swap,
        },
    ]
}

export default useArrayObject
