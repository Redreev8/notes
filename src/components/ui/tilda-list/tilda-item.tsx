import classNames from 'classnames'
import { AreaHTMLAttributes, cloneElement, FC, JSX } from 'react'

export interface TildaItemProps extends AreaHTMLAttributes<HTMLLIElement> {
    children: JSX.Element
    isP?: boolean
}

const TildaItem: FC<TildaItemProps> = ({
    className,
    children,
    isP,
    ...props
}) => {
    const cl = classNames(className, 'flex')
    const classNameChildren = children.props.className ?? ''
    return (
        <li className={cl} {...props}>
            {cloneElement(children, {
                ...children.props,
                className: classNames(
                    'w-full border-t border-t-label bg-bg',
                    'transition-colors duration-600 text-label hover:border-t-red hover:text-red',
                    classNameChildren,
                    {
                        'pt-4': !isP,
                    },
                ),
            })}
        </li>
    )
}

export default TildaItem
