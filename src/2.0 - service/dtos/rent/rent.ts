import { RentSize } from "./rentSize"
import { RentStatus } from "./rentStatus"

export interface Rent {
    id: string
    lockerId: string
    weight: number
    size: RentSize
    status: RentStatus
}