import { FC } from 'react'
import { SVGComponents } from './type'

const FolderRemoveIcon: FC<SVGComponents> = ({
    stroke = 'currentColor',
    ...props
}) => (
    <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M11.8225 11.7001H8.07251"
            stroke={stroke}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17.5 9.33337V13.3334C17.5 16 16.75 16.6667 13.75 16.6667H6.25C3.25 16.6667 2.5 16 2.5 13.3334V6.66671C2.5 4.00004 3.25 3.33337 6.25 3.33337H7.375C8.5 3.33337 8.7475 3.62671 9.175 4.13337L10.3 5.46671C10.585 5.80004 10.75 6.00004 11.5 6.00004H13.75C16.75 6.00004 17.5 6.66671 17.5 9.33337Z"
            stroke={stroke}
            strokeWidth={1.5}
            strokeMiterlimit={10}
        />
    </svg>
)

export default FolderRemoveIcon
