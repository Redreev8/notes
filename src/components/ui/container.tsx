import classNames from 'classnames'
import { AreaHTMLAttributes, FC } from 'react'

const Container: FC<AreaHTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
    ...props
}) => {
    const cl = classNames(
        className,
        '2xl:max-w-[1400px] 2xl:w-full 2xl:mx-auto',
        'w-[100%] py-10',
    )

    return (
        <div className={cl} {...props}>
            {children}
        </div>
    )
}

export default Container
