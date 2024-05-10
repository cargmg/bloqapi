import { It, Mock, Times} from "moq.ts";
import { Rent as ModelRent } from "../../../3.0 - data/models/rent/rent";
import { Locker as ModelLocker } from "../../../3.0 - data/models/locker/locker";
import { Bloq as ModelBloq } from "../../../3.0 - data/models/bloq/bloq";
import { LockerStatus as ModelLockerStatus } from "../../../3.0 - data/models/locker/lockerStatus";
import RentService from ".";
import { Rent } from "../../dtos/rent/rent";
import { RentStatus } from "../../dtos/rent/rentStatus";
import { RentSize } from "../../dtos/rent/rentSize";
import IBloqRepository from "../../../3.0 - data/repositories/bloq";

describe('RentService', () => {
    describe('getAllAsync', () => {
        it('should call bloqRepository getByIdAsync', async () => {
            // Arrange
            const bloqId: string = "bloqId";
            const lockerId: string = "lockerId";

            const modelLocker: ModelLocker = {
                id: lockerId,
                bloqId: bloqId,
                isOccupied: false,
                status: ModelLockerStatus.CLOSED,
                rents: []
            };

            const modelBloq: ModelBloq = {
                id: bloqId,
                address: "address",
                title: "title",
                lockers: [modelLocker]
            };

            const bloqRepository = new Mock<IBloqRepository>()
                .setup(instance => instance.getByIdAsync(bloqId))
                .returnsAsync(modelBloq);

            const rentService = new RentService(bloqRepository.object());
            
            // Act
            const result = await rentService.getAllAsync(bloqId, lockerId);

            // Assert
            bloqRepository.verify(instance => instance.getByIdAsync(bloqId), Times.Once());
            expect(result.length).toBe(0);
        });
    });

    describe('createRentAsync', () => {
        it('should call bloqRepository saveBloqAsync', async () => {
            // Arrange
            const bloqId: string = "bloqId";
            const lockerId: string = "lockerId";

            const modelLocker: ModelLocker = {
                id: lockerId,
                bloqId: bloqId,
                isOccupied: false,
                status: ModelLockerStatus.CLOSED,
                rents: []
            };

            const modelBloq: ModelBloq = {
                id: bloqId,
                address: "address",
                title: "title",
                lockers: [modelLocker]
            };

            const bloqRepository = new Mock<IBloqRepository>()
                .setup(instance => instance.getByIdAsync(bloqId))
                .returnsAsync(modelBloq);

            const rent: Rent = {
                id: ``,
                lockerId: lockerId,
                size: RentSize.L,
                status: RentStatus.CREATED,
                weight: 1
            };

            bloqRepository.setup(instance => instance.saveBloqAsync(
                It.Is<ModelBloq>(x => x.lockers.length == 1 && x.lockers[0].rents.length == 1)))
                .returns(Promise.resolve());

            const rentService = new RentService(bloqRepository.object());
            
            // Act
            await rentService.createRentAsync(bloqId, rent);

            // Assert
            bloqRepository.verify(instance => instance.saveBloqAsync(It.IsAny()), Times.Once());
            bloqRepository.verify(instance => instance.getByIdAsync(bloqId), Times.Once());
        });
    });

    describe('deleteAsync', () => {
        it('should call bloqRepository saveBloqAsync', async () => {
            // Arrange
            const bloqId: string = "bloqId";
            const lockerId: string = "lockerId";
            const id: string = "id";

            const rent: ModelRent = {
                id: id,
                lockerId: lockerId,
                size: RentSize.L,
                status: RentStatus.CREATED,
                weight: 1
            };

            const modelLocker: ModelLocker = {
                id: lockerId,
                bloqId: bloqId,
                isOccupied: false,
                status: ModelLockerStatus.CLOSED,
                rents: [rent]
            };

            const modelBloq: ModelBloq = {
                id: bloqId,
                address: "address",
                title: "title",
                lockers: [modelLocker]
            };

            const bloqRepository = new Mock<IBloqRepository>()
                .setup(instance => instance.getByIdAsync(bloqId))
                .returnsAsync(modelBloq);

            bloqRepository.setup(instance => instance.saveBloqAsync(
                It.Is<ModelBloq>(x => x.lockers.length == 1 && x.lockers[0].rents.length == 0)))
                .returns(Promise.resolve());

            const rentService = new RentService(bloqRepository.object());
            
            // Act
            await rentService.deleteAsync(bloqId, lockerId, id);

            // Assert
            bloqRepository.verify(instance => instance.getByIdAsync(It.IsAny()), Times.Once());
            bloqRepository.verify(instance => instance.saveBloqAsync(It.IsAny()), Times.Once());
        });
    });

    describe('updateAsync', () => {
        it('should call bloqRepository saveBloqAsync', async () => {
            // Arrange
            const bloqId: string = "bloqId";
            const lockerId: string = "lockerId";
            const id: string = "id";

            const modelRent: ModelRent = {
                id: id,
                lockerId: lockerId,
                size: RentSize.L,
                status: RentStatus.WAITING_PICKUP,
                weight: 1
            };

            const modelLocker: ModelLocker = {
                id: lockerId,
                bloqId: bloqId,
                isOccupied: false,
                status: ModelLockerStatus.CLOSED,
                rents: [modelRent]
            };

            const modelBloq: ModelBloq = {
                id: bloqId,
                address: "address",
                title: "title",
                lockers: [modelLocker]
            };

            const bloqRepository = new Mock<IBloqRepository>()
                .setup(instance => instance.getByIdAsync(bloqId))
                .returnsAsync(modelBloq);

            bloqRepository.setup(instance => instance.saveBloqAsync(
                It.Is<ModelBloq>(x => x.lockers[0].rents[0].status == RentStatus.WAITING_DROPOFF)))
                .returns(Promise.resolve());

            const rentService = new RentService(bloqRepository.object());

            const rent: Rent = {
                id: id,
                lockerId: lockerId,
                size: RentSize.L,
                status: RentStatus.DELIVERED,
                weight: 1
            };
            
            // Act
            await rentService.updateAsync(bloqId, id, rent);

            // Assert
            bloqRepository.verify(instance => instance.getByIdAsync(It.IsAny()), Times.Once());
            bloqRepository.verify(instance => instance.saveBloqAsync(It.IsAny()), Times.Once());
        });
    });
});