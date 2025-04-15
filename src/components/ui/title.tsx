import classNames from 'classnames'
import { AreaHTMLAttributes, createElement, FC } from 'react'

export interface TitleProps extends AreaHTMLAttributes<HTMLAnchorElement> {
    as?: 1 | 2 | 3 | 4 | 5 | 6
    size?: 1 | 2 | 3 | 4 | 5 | 6
}

const Title: FC<TitleProps> = ({
    className,
    children,
    as = 2,
    size = as,
    ...props
}) => {
    const cl = classNames(className, {
        'text-6xl': size === 1,
        'text-5xl': size === 2,
        'text-4xl': size === 3,
        'text-3xl': size === 4,
        'text-2xl': size === 5,
        'text-xl': size === 6,
    })

    return createElement(
        'h' + as,
        {
            className: cl,
            ...props,
        },
        children,
    )
}

export default Title
