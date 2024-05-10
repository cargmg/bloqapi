import { Bloq as BloqModel } from "../../../models/bloq/bloq";
import Bloq from "../../db/bloq/bloq";
import { Locker as LockerModel } from "../../../models/locker/locker";
import { LockerStatus as LockerStatusModel } from "../../../models/locker/lockerStatus";
import Locker from "../../db/locker/locker";
import { Rent as RentModel } from "../../../models/rent/rent";
import { RentSize as RentSizeModel } from "../../../models/rent/rentSize";
import { RentStatus as RentStatusModel } from "../../../models/rent/rentStatus";
import Rent from "../../db/rent/rent";
import { LockerStatus } from "../../db/locker/lockerStatus";
import { RentStatus } from "../../db/rent/rentStatus";
import { RentSize } from "../../db/rent/rentSize";

export default class BloqMapper {
    static toDomain(db: Bloq): BloqModel {
        const model: BloqModel = {
            id: db.id,
            title: db.title,
            address: db.address,
            lockers: db.lockers.map(elem => BloqMapper.toDomainLocker(elem)),
        };

        return model;
    }

    static toDomainLocker(db: Locker): LockerModel {
        const model: LockerModel = {
            id: db.id,
            bloqId: db.bloqId,
            isOccupied: db.isOccupied,
            status: BloqMapper.toDomainLockerStatus(db.status),
            rents: db.rents.map(elem => BloqMapper.toDomainRent(elem))
        };

        return model;
    }

    static toDomainLockerStatus(db: LockerStatus): LockerStatusModel {
        switch(db) {
            case LockerStatus.CLOSED: {
                return LockerStatusModel.CLOSED;
            }
            case LockerStatus.OPEN:
            default: {
                return LockerStatusModel.OPEN;
            }
        }
    }

    static toDomainRent(db: Rent): RentModel {
        const model: RentModel = {
            id: db.id,
            lockerId: db.lockerId,
            size: BloqMapper.toDomainRentSize(db.size),
            status: BloqMapper.toDomainRentStatus(db.status),
            weight: db.weight
        };

        return model;
    }

    static toDomainRentStatus(db: RentStatus): RentStatusModel {
        switch(db) {
            case RentStatus.CREATED: {
                return RentStatusModel.CREATED;
            }
            case RentStatus.WAITING_DROPOFF: {
                return RentStatusModel.WAITING_DROPOFF;
            }
            case RentStatus.WAITING_PICKUP: {
                return RentStatusModel.WAITING_PICKUP;
            }
            case RentStatus.DELIVERED: 
            default: {
                return RentStatusModel.DELIVERED;
            }
        }
    }

    static toDomainRentSize(db: RentSize): RentSizeModel {
        switch(db) {
            case RentSize.XS: {
                return RentSizeModel.XS;
            }
            case RentSize.S: {
                return RentSizeModel.S;
            }
            case RentSize.M: {
                return RentSizeModel.M;
            }
            case RentSize.L: {
                return RentSizeModel.L;
            }
            case RentSize.XL: 
            default: {
                return RentSizeModel.XL;
            }
        }
    }

    static toDb(model: BloqModel): Bloq {
        const db: Bloq = {
            id: model.id,
            title: model.title,
            address: model.address,
            lockers: model.lockers.map(elem => BloqMapper.toDbLocker(elem)),
        };

        return db;
    }

    static toDbLocker(model: LockerModel): Locker {
        const db: Locker = {
            id: model.id,
            bloqId: model.bloqId,
            status: BloqMapper.toDbLockerStatus(model.status),
            isOccupied: model.isOccupied,
            rents: model.rents.map(elem => BloqMapper.toDbRent(elem)),
        }

        return db;
    }

    static toDbLockerStatus(model: LockerStatusModel): LockerStatus {
        switch(model) {
            case LockerStatusModel.CLOSED: {
                return LockerStatus.CLOSED;
            }
            case LockerStatusModel.OPEN:
            default: 
            {
                return LockerStatus.OPEN;
            }
        }
    }

    static toDbRent(model: RentModel): Rent {
        const db: RentModel = {
            id: model.id,
            lockerId: model.lockerId,
            size: BloqMapper.toDbRentSize(model.size),
            status: BloqMapper.toDbRentStatus(model.status),
            weight: model.weight
        }

        return db;
    }

    static toDbRentStatus(db: RentStatusModel): RentStatus {
        switch(db) {
            case RentStatusModel.CREATED: {
                return RentStatus.CREATED;
            }
            case RentStatusModel.WAITING_DROPOFF: {
                return RentStatus.WAITING_DROPOFF;
            }
            case RentStatusModel.WAITING_PICKUP: {
                return RentStatus.WAITING_PICKUP;
            }
            case RentStatusModel.DELIVERED:
            default:
            {
                return RentStatus.DELIVERED;
            }
        }
    }

    static toDbRentSize(model: RentSizeModel): RentSize {
        switch(model) {
            case RentSizeModel.XS: {
                return RentSize.XS;
            }
            case RentSizeModel.S: {
                return RentSize.S;
            }
            case RentSizeModel.M: {
                return RentSize.M;
            }
            case RentSizeModel.L: {
                return RentSize.L;
            }
            case RentSizeModel.XL:
            default: 
            {
                return RentSize.XL;
            }
        }
    }
}