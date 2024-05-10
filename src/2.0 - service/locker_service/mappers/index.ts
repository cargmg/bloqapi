import { Locker as LockerModel } from "../../../3.0 - data/models/locker/locker";
import { LockerStatus as LockerStatusModel } from "../../../3.0 - data/models/locker/lockerStatus";
import { Locker } from "../../dtos/locker/locker";
import { LockerStatus } from "../../dtos/locker/lockerStatus";

export default class LockerMapper {
    static toDto(model: LockerModel): Locker {
        const dto: Locker = {
            id: model.id,
            bloqId: model.bloqId,
            status: LockerMapper.lockerStatusToDto(model.status),
            isOccupied: model.isOccupied,
        };

        return dto;
    }

    static lockerStatusToDto(model: LockerStatusModel): LockerStatus {
        switch(model) { 
            case LockerStatusModel.OPEN: {
                return LockerStatus.OPEN;
            }
            case LockerStatusModel.CLOSED:
            {
                return LockerStatus.CLOSED;   
            }
            default: {
                return LockerStatus.CLOSED;
            }
        }
    }
}