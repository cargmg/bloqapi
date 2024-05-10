import { Rent as RentModel } from "../../../3.0 - data/models/rent/rent";
import { RentStatus as RentStatusModel } from "../../../3.0 - data/models/rent/rentStatus";
import { RentSize as RentSizeModel } from "../../../3.0 - data/models/rent/rentSize";
import { Rent } from "../../dtos/rent/rent";
import { RentStatus } from "../../dtos/rent/rentStatus";
import { RentSize } from "../../dtos/rent/rentSize";
import RentMapper from ".";

describe('RentMapper', () => {
    describe('toDto', () => {
        it('should map correctly', async () => {
            // Arrange
            var model: RentModel = { id: "id", lockerId: "lockerId", weight: 1, size: RentSizeModel.L, status: RentStatusModel.CREATED };

            // Act
            var dto = RentMapper.toDto(model);

            // Assert
            expect(dto.id).toBe(model.id);
            expect(dto.lockerId).toBe(model.lockerId);
            expect(dto.weight).toBe(1);
            expect(dto.size).toBe(RentSize.L);
            expect(dto.status).toBe(RentStatus.CREATED);
        });
    });

    describe('rentStatusToDto', () => {
        it('should map correctly', async () => {
            // Arrange
            var modelCREATED = RentStatusModel.CREATED;
            var modelWAITING_DROPOFF = RentStatusModel.WAITING_DROPOFF;
            var modelWAITING_PICKUP = RentStatusModel.WAITING_PICKUP;
            var modelDELIVERED = RentStatusModel.DELIVERED;

            // Act
            var dtoCREATED = RentMapper.rentStatusToDto(modelCREATED);
            var dtoWAITING_DROPOFF = RentMapper.rentStatusToDto(modelWAITING_DROPOFF);
            var dtoWAITING_PICKUP = RentMapper.rentStatusToDto(modelWAITING_PICKUP);
            var dtoDELIVERED = RentMapper.rentStatusToDto(modelDELIVERED);

            // Assert
            expect(dtoCREATED).toBe(RentStatus.CREATED);
            expect(dtoWAITING_DROPOFF).toBe(RentStatus.WAITING_DROPOFF);
            expect(dtoWAITING_PICKUP).toBe(RentStatus.WAITING_PICKUP);
            expect(dtoDELIVERED).toBe(RentStatus.DELIVERED);
        });
    });

    describe('rentSizeToDto', () => {
        it('should map correctly', async () => {
            // Arrange
            var modelXS = RentSize.XS;
            var modelS = RentSize.S;
            var modelM = RentSize.M;
            var modelL = RentSize.L;
            var modelXL = RentSize.XL;

            // Act
            var dtoXS = RentMapper.rentSizeToDto(modelXS);
            var dtoS = RentMapper.rentSizeToDto(modelS);
            var dtoM = RentMapper.rentSizeToDto(modelM);
            var dtoL = RentMapper.rentSizeToDto(modelL);
            var dtoXL = RentMapper.rentSizeToDto(modelXL);

            // Assert
            expect(dtoXS).toBe(RentSize.XS);
            expect(dtoS).toBe(RentSize.S);
            expect(dtoM).toBe(RentSize.M);
            expect(dtoL).toBe(RentSize.L);
            expect(dtoXL).toBe(RentSize.XL);
        });
    });
});