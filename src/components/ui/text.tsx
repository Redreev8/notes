import classNames from 'classnames'
import { AreaHTMLAttributes, FC } from 'react'

interface TextProps extends AreaHTMLAttributes<HTMLParagraphElement> {
    isBig?: boolean
}

const Text: FC<TextProps> = ({
    children,
    className,
    isBig = true,
    ...props
}) => {
    const cl = classNames(className, {
        'text-xl': isBig,
        'text-base': !isBig,
    })
    return (
        <p className={cl} {...props}>
            {children}
        </p>
    )
}

export default Text
