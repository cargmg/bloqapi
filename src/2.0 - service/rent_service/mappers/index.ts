import { Rent as RentModel } from "../../../3.0 - data/models/rent/rent";
import { RentStatus as RentStatusModel } from "../../../3.0 - data/models/rent/rentStatus";
import { RentSize as RentSizeModel } from "../../../3.0 - data/models/rent/rentSize";
import { Rent } from "../../dtos/rent/rent";
import { RentStatus } from "../../dtos/rent/rentStatus";
import { RentSize } from "../../dtos/rent/rentSize";

export default class RentMapper {
    static toDto(model: RentModel): Rent {
        const dto: Rent = {
            id: model.id,
            lockerId: model.lockerId,
            size: RentMapper.rentSizeToDto(model.size),
            status: RentMapper.rentStatusToDto(model.status),
            weight: model.weight,
        };

        return dto;
    }

    static rentStatusToDto(model: RentStatusModel): RentStatus {
        switch(model) { 
            case RentStatusModel.CREATED: {
                return RentStatus.CREATED;
            }
            case RentStatusModel.DELIVERED: {
                return RentStatus.DELIVERED;
            }
            case RentStatusModel.WAITING_DROPOFF: {
                return RentStatus.WAITING_DROPOFF;
            }
            case RentStatusModel.WAITING_PICKUP:
            default:
            {
                return RentStatus.WAITING_PICKUP;
            }
        }
    }

    static rentSizeToDto(model: RentSizeModel): RentSize {
        switch(model) { 
            case RentSizeModel.XL: {
                return RentSize.XL;
            }
            case RentSizeModel.L: {
                return RentSize.L; 
            }
            case RentSizeModel.M: {
                return RentSize.M;
            }
            case RentSizeModel.S: {
                return RentSize.S;
            }
            case RentSizeModel.XS: 
            default: {
                return RentSizeModel.XS;
            }
        }
    }
}