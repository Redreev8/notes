import classNames from 'classnames'
import { AreaHTMLAttributes, FC } from 'react'

export interface TildaListProps extends AreaHTMLAttributes<HTMLUListElement> {}

const TildaList: FC<TildaListProps> = ({ className, children, ...props }) => {
    const cl = classNames(className, 'flex flex-col gap-5')
    return (
        <ul className={cl} {...props}>
            {children}
        </ul>
    )
}

export default TildaList
