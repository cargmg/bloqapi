import { RentSize } from "./rentSize"
import { RentStatus } from "./rentStatus"

export default class Rent {
    id: string;
    lockerId: string;
    weight: number;
    size: RentSize;
    status: RentStatus;

    constructor(id: string, lockerId: string, weight: number, size: RentSize, status: RentStatus) {
        this.id = id;
        this.lockerId = lockerId;
        this.weight = weight;
        this.size = size;
        this.status = status;
    }
}