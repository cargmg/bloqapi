import BloqMapper from ".";
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

describe('BloqMapper', () => {
    describe('toDomain', () => {
        it('should map correctly', async () => {
            // Arrange
            var db = new Bloq("id", "title", "address", []);

            // Act
            var model = BloqMapper.toDomain(db);

            // Assert
            expect(model.id).toBe(db.id);
            expect(model.title).toBe(db.title);
            expect(model.address).toBe(db.address);
        });
    });

    describe('toDomainLocker', () => {
        it('should map correctly', async () => {
            // Arrange
            var db = new Locker("id", "bloqId", LockerStatus.CLOSED, false, []);

            // Act
            var model = BloqMapper.toDomainLocker(db);

            // Assert
            expect(model.id).toBe(db.id);
            expect(model.bloqId).toBe(db.bloqId);
            expect(model.status).toBe(LockerStatusModel.CLOSED);
            expect(model.isOccupied).toBe(false);
        });
    });

    describe('toDomainLockerStatus', () => {
        it('should map correctly', async () => {
            // Arrange
            var dbCLOSED = LockerStatus.CLOSED;
            var dbOPEN = LockerStatus.OPEN;

            // Act
            var modelCLOSED = BloqMapper.toDomainLockerStatus(dbCLOSED);
            var modelOPEN = BloqMapper.toDomainLockerStatus(dbOPEN);

            // Assert
            expect(modelCLOSED).toBe(LockerStatusModel.CLOSED);
            expect(modelOPEN).toBe(LockerStatusModel.OPEN);
        });
    });

    describe('toDomainRent', () => {
        it('should map correctly', async () => {
            // Arrange
            var db = new Rent("id", "lockerId", 1, RentSize.L, RentStatus.CREATED);

            // Act
            var model = BloqMapper.toDomainRent(db);

            // Assert
            expect(model.id).toBe(db.id);
            expect(model.lockerId).toBe(db.lockerId);
            expect(model.weight).toBe(1);
            expect(model.size).toBe(RentSizeModel.L);
            expect(model.status).toBe(RentStatusModel.CREATED);
        });
    });

    describe('toDomainRentStatus', () => {
        it('should map correctly', async () => {
            // Arrange
            var dbCREATED = RentStatus.CREATED;
            var dbWAITING_DROPOFF = RentStatus.WAITING_DROPOFF;
            var dbWAITING_PICKUP = RentStatus.WAITING_PICKUP;
            var dbDELIVERED = RentStatus.DELIVERED;

            // Act
            var modelCREATED = BloqMapper.toDomainRentStatus(dbCREATED);
            var modelWAITING_DROPOFF = BloqMapper.toDomainRentStatus(dbWAITING_DROPOFF);
            var modelWAITING_PICKUP = BloqMapper.toDomainRentStatus(dbWAITING_PICKUP);
            var modelDELIVERED = BloqMapper.toDomainRentStatus(dbDELIVERED);

            // Assert
            expect(modelCREATED).toBe(RentStatusModel.CREATED);
            expect(modelWAITING_DROPOFF).toBe(RentStatusModel.WAITING_DROPOFF);
            expect(modelWAITING_PICKUP).toBe(RentStatusModel.WAITING_PICKUP);
            expect(modelDELIVERED).toBe(RentStatusModel.DELIVERED);
        });
    });

    describe('toDomainRentSize', () => {
        it('should map correctly', async () => {
            // Arrange
            var dbXS = RentSize.XS;
            var dbS = RentSize.S;
            var dbM = RentSize.M;
            var dbL = RentSize.L;
            var dbXL = RentSize.XL;

            // Act
            var modelXS = BloqMapper.toDomainRentSize(dbXS);
            var modelS = BloqMapper.toDomainRentSize(dbS);
            var modelM = BloqMapper.toDomainRentSize(dbM);
            var modelL = BloqMapper.toDomainRentSize(dbL);
            var modelXL = BloqMapper.toDomainRentSize(dbXL);

            // Assert
            expect(modelXS).toBe(RentSizeModel.XS);
            expect(modelS).toBe(RentSizeModel.S);
            expect(modelM).toBe(RentSizeModel.M);
            expect(modelL).toBe(RentSizeModel.L);
            expect(modelXL).toBe(RentSizeModel.XL);
        });
    });

    describe('toDb', () => {
        it('should map correctly', async () => {
            // Arrange
            var model: BloqModel = { id: "id", title: "title", address:" address", lockers: [] };

            // Act
            var db = BloqMapper.toDb(model);

            // Assert
            expect(db.id).toBe(model.id);
            expect(db.title).toBe(model.title);
            expect(db.address).toBe(model.address);
        });
    });

    describe('toDbLocker', () => {
        it('should map correctly', async () => {
            // Arrange
            var model: LockerModel = { id: "id", bloqId: "bloqId", status: LockerStatus.CLOSED, isOccupied: false, rents: [] };

            // Act
            var db = BloqMapper.toDomainLocker(model);

            // Assert
            expect(db.id).toBe(model.id);
            expect(db.bloqId).toBe(model.bloqId);
            expect(db.status).toBe(LockerStatus.CLOSED);
            expect(db.isOccupied).toBe(false);
        });
    });

    describe('toDbLockerStatus', () => {
        it('should map correctly', async () => {
            // Arrange
            var modelCLOSED = LockerStatusModel.CLOSED;
            var modelOPEN = LockerStatusModel.OPEN;

            // Act
            var dbCLOSED = BloqMapper.toDbLockerStatus(modelCLOSED);
            var dbOPEN = BloqMapper.toDbLockerStatus(modelOPEN);

            // Assert
            expect(dbCLOSED).toBe(LockerStatus.CLOSED);
            expect(dbOPEN).toBe(LockerStatus.OPEN);
        });
    });

    describe('toDbRent', () => {
        it('should map correctly', async () => {
            // Arrange
            var model: RentModel = { id: "id", lockerId: "lockerId", weight: 1, size: RentSize.L, status: RentStatus.CREATED };

            // Act
            var db = BloqMapper.toDbRent(model);

            // Assert
            expect(db.id).toBe(model.id);
            expect(db.lockerId).toBe(model.lockerId);
            expect(db.weight).toBe(1);
            expect(db.size).toBe(RentSize.L);
            expect(db.status).toBe(RentStatus.CREATED);
        });
    });

    describe('toDbRentStatus', () => {
        it('should map correctly', async () => {
            // Arrange
            var modelCREATED = RentStatusModel.CREATED;
            var modelWAITING_DROPOFF = RentStatusModel.WAITING_DROPOFF;
            var modelWAITING_PICKUP = RentStatusModel.WAITING_PICKUP;
            var modelDELIVERED = RentStatusModel.DELIVERED;

            // Act
            var dbCREATED = BloqMapper.toDbRentStatus(modelCREATED);
            var dbWAITING_DROPOFF = BloqMapper.toDbRentStatus(modelWAITING_DROPOFF);
            var dbWAITING_PICKUP = BloqMapper.toDbRentStatus(modelWAITING_PICKUP);
            var dbDELIVERED = BloqMapper.toDbRentStatus(modelDELIVERED);

            // Assert
            expect(dbCREATED).toBe(RentStatus.CREATED);
            expect(dbWAITING_DROPOFF).toBe(RentStatus.WAITING_DROPOFF);
            expect(dbWAITING_PICKUP).toBe(RentStatus.WAITING_PICKUP);
            expect(dbDELIVERED).toBe(RentStatus.DELIVERED);
        });
    });

    describe('toDbRentSize', () => {
        it('should map correctly', async () => {
            // Arrange
            var modelXS = RentSizeModel.XS;
            var modelS = RentSizeModel.S;
            var modelM = RentSizeModel.M;
            var modelL = RentSizeModel.L;
            var modelXL = RentSizeModel.XL;

            // Act
            var dbXS = BloqMapper.toDbRentSize(modelXS);
            var dbS = BloqMapper.toDbRentSize(modelS);
            var dbM = BloqMapper.toDbRentSize(modelM);
            var dbL = BloqMapper.toDbRentSize(modelL);
            var dbXL = BloqMapper.toDbRentSize(modelXL);

            // Assert
            expect(dbXS).toBe(RentSize.XS);
            expect(dbS).toBe(RentSize.S);
            expect(dbM).toBe(RentSize.M);
            expect(dbL).toBe(RentSize.L);
            expect(dbXL).toBe(RentSize.XL);
        });
    });
}); 