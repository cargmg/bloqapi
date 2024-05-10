import LockerMapper from ".";
import { Locker as LockerModel } from "../../../3.0 - data/models/locker/locker";
import { LockerStatus as LockerStatusModel } from "../../../3.0 - data/models/locker/lockerStatus";
import { LockerStatus } from "../../dtos/locker/lockerStatus";


describe('LockerService', () => {
    describe('toDto', () => {
        it('should map correctly', async () => {
            // Arrange
            var model: LockerModel = { id: "id", bloqId: "bloqId", status: LockerStatus.CLOSED, isOccupied: false, rents: [] };

            // Act
            var dto = LockerMapper.toDto(model);

            // Assert
            expect(dto.id).toBe(model.id);
            expect(dto.bloqId).toBe(model.bloqId);
            expect(dto.status).toBe(LockerStatus.CLOSED);
            expect(dto.isOccupied).toBe(false);
        });
    });

    describe('lockerStatusToDto', () => {
        it('should map correctly', async () => {
            // Arrange
            var modelCLOSED = LockerStatusModel.CLOSED;
            var modelOPEN = LockerStatusModel.OPEN;

            // Act
            var dtoCLOSED = LockerMapper.lockerStatusToDto(modelCLOSED);
            var dtoOPEN = LockerMapper.lockerStatusToDto(modelOPEN);

            // Assert
            expect(dtoCLOSED).toBe(LockerStatus.CLOSED);
            expect(dtoOPEN).toBe(LockerStatus.OPEN);
        });
    });
});