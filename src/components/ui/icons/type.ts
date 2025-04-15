import { SVGAttributes } from 'react'

export interface SVGComponents extends SVGAttributes<HTMLOrSVGElement> {
    stroke?: 'none' | 'currentColor'
}
