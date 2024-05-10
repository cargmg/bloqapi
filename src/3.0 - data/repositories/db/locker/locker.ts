import Rent from "../rent/rent";
import { LockerStatus } from "./lockerStatus"

export default class Locker {
    id: string;
    bloqId: string;
    status: LockerStatus;
    isOccupied: boolean;
    rents: Rent[];

    constructor(id: string, bloqId: string, status: LockerStatus, isOccupied: boolean, rents: Rent[]) {
        this.id = id;
        this.bloqId = bloqId;
        this.status = status;
        this.isOccupied = isOccupied;
        this.rents = rents;
    }
}