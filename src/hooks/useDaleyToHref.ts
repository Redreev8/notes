import { useRouter } from 'next/navigation'
import { MouseEvent, useState } from 'react'

interface useDaleyToHrefProps {
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
    cbTo?: () => void
}

const useDaleyToHref = ({ onClick, cbTo }: useDaleyToHrefProps = {}) => {
    const [href, setHref] = useState<string | null>(null)
    const { push } = useRouter()
    const handelClickHref = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const link = e.currentTarget
        setHref(link.href)

        if (onClick) onClick(e)
    }
    const to = () => {
        if (!href) return
        push(href)
        setHref(null)
        if (cbTo) cbTo()
    }
    return {
        handelClickHref,
        to,
    }
}

export default useDaleyToHref
