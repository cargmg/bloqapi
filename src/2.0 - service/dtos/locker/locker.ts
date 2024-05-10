import { LockerStatus } from "./lockerStatus"

export interface Locker {
    id: string
    bloqId: string
    status: LockerStatus
    isOccupied: boolean
}