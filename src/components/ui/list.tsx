import classNames from 'classnames'
import { AreaHTMLAttributes, FC } from 'react'

interface ListProps extends AreaHTMLAttributes<HTMLUListElement> {}

const List: FC<ListProps> = ({ children, className, ...props }) => {
    const cl = classNames(className, 'list-disc list-inside')
    return (
        <ul className={cl} {...props}>
            {children}
        </ul>
    )
}

export default List
