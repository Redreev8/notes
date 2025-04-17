import { migrate } from './configs/sql'

export const register = () => {
    migrate()
}
