import { Locker } from "../locker/locker"

export interface Bloq {
    id: string
    title: string
    address: string
    lockers: Locker[]
}