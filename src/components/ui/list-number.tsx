import classNames from 'classnames'
import { AreaHTMLAttributes, FC } from 'react'

interface ListNumberProps extends AreaHTMLAttributes<HTMLOListElement> {}

const ListNumber: FC<ListNumberProps> = ({ children, className, ...props }) => {
    const cl = classNames(className, 'list-decimal list-inside')
    return (
        <ol className={cl} {...props}>
            {children}
        </ol>
    )
}

export default ListNumber
