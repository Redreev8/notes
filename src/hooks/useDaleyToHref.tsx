import { useRouter } from 'next/navigation'
import { MouseEvent, useEffect, useState } from 'react'

interface useDaleyToHrefProps {
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
    cbTo?: () => void
}

const useDaleyToHref = ({ onClick, cbTo }: useDaleyToHrefProps = {}) => {
    const [href, setHref] = useState<string | null>(null)
    const [noAnimate, setNoAnimate] = useState<boolean>(false)
    const { push } = useRouter()
    const handelClickHref = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const link = e.currentTarget
        setHref(() => link.href)

        if (onClick) onClick(e)
    }
    const to = async () => {
        if (!href) return
        push(href)
        setHref(null)
        if (cbTo) cbTo()
    }
    const toNoAnimate = () => setNoAnimate(true)
    useEffect(() => {
        if (!href || !noAnimate) return
        push(href)
        setHref(null)
        setNoAnimate(false)
    }, [href, noAnimate])
    return {
        handelClickHref,
        to,
        toNoAnimate,
    }
}

export default useDaleyToHref
