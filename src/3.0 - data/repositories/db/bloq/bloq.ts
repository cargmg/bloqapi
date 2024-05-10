import { ObjectId, UUID } from "mongodb";
import Locker from "../locker/locker";

export default class Bloq {
    _id?: ObjectId;
    id: string;
    title: string;
    address: string;
    lockers: Locker[];

    constructor(id: string, title: string, address: string, lockers: Locker[], _id?: ObjectId) {
        this._id = _id;
        this.id = id;
        this.title = title;
        this.address = address;
        this.lockers = lockers;
    }
}