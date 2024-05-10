import { It, Mock, Times} from "moq.ts";
import { Locker as ModelLocker } from "../../../3.0 - data/models/locker/locker";
import { Bloq as ModelBloq } from "../../../3.0 - data/models/bloq/bloq";
import { LockerStatus as ModelLockerStatus } from "../../../3.0 - data/models/locker/lockerStatus";
import LockerService from ".";
import { Locker } from "../../dtos/locker/locker";
import ResourceNotFound from "../../errors/resourceNotFound";
import { LockerStatus } from "../../dtos/locker/lockerStatus";
import IBloqRepository from "../../../3.0 - data/repositories/bloq";

describe('LockerService', () => {
    describe('getAllAsync', () => {
        it('should call bloqRepository getByIdAsync', async () => {
            // Arrange
            const bloqId: string = "bloqId";
            const modelBloq: ModelBloq = {
                id: bloqId,
                address: "address",
                title: "title",
                lockers: []
            };
            const bloqRepository = new Mock<IBloqRepository>()
                .setup(instance => instance.getByIdAsync(bloqId))
                .returnsAsync(modelBloq);

            const lockerService = new LockerService(bloqRepository.object());
            
            // Act
            const result = await lockerService.getAllAsync(bloqId);

            // Assert
            bloqRepository.verify(instance => instance.getByIdAsync(bloqId), Times.Once());
            expect(result.length).toBe(0);
        });

        it('should throw resourceNotFound error', async () => {
            // Arrange
            const bloqId: string = "bloqId";
            const bloqRepository = new Mock<IBloqRepository>()
                .setup(instance => instance.getByIdAsync(bloqId))
                .returnsAsync(undefined);

            const lockerService = new LockerService(bloqRepository.object());
            
            // Act
            try{
                const result = await lockerService.getAllAsync(bloqId);
                fail();
            }
            catch(error)
            {
                expect(error).toBeInstanceOf(ResourceNotFound);
            }

            // Assert
            bloqRepository.verify(instance => instance.getByIdAsync(bloqId), Times.Once());
        });
    });

    describe('createLockerAsync', () => {
        it('should call bloqRepository saveBloqAsync', async () => {
            // Arrange
            const bloqId: string = "bloqId";
            const lockerId: string = "lockerId";
            const locker: Locker = {
                id: lockerId,
                bloqId: bloqId,
                isOccupied: false,
                status: LockerStatus.CLOSED,
            };

            const modelBloq: ModelBloq = {
                id: bloqId,
                address: "address",
                title: "title",
                lockers: []
            };

            const bloqRepository = new Mock<IBloqRepository>()
                .setup(instance => instance.getByIdAsync(bloqId))
                .returnsAsync(modelBloq);

            bloqRepository.setup(instance => instance.saveBloqAsync(It.Is<ModelBloq>(x => x.lockers.length == 1)))
                .returns(Promise.resolve());

            const lockerService = new LockerService(bloqRepository.object());
            
            // Act
            await lockerService.createLockerAsync(locker);

            // Assert
            bloqRepository.verify(instance => instance.saveBloqAsync(It.IsAny()), Times.Once());
        });
    });

    describe('deleteAsync', () => {
        it('should call bloqRepository saveBloqAsync', async () => {
            // Arrange
            const id: string = "id";
            const bloqId: string = "bloqId";
            const modelLocker: ModelLocker = {
                id: id,
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

            bloqRepository.setup(instance => instance.saveBloqAsync(It.Is<ModelBloq>(x => x.lockers.length == 0)))
                .returns(Promise.resolve());

            const lockerService = new LockerService(bloqRepository.object());
            
            // Act
            await lockerService.deleteAsync(bloqId, id);

            // Assert
            bloqRepository.verify(instance => instance.getByIdAsync(It.IsAny()), Times.Once());
        });
    });

    describe('updateAsync', () => {
        it('should call lockerRepository updateAsync', async () => {
            // Arrange
            const id: string = "id";
            const bloqId: string = "bloqId";

            const newStatelocker: ModelLocker = {
                id: id,
                bloqId: bloqId,
                isOccupied: false,
                status: ModelLockerStatus.OPEN,
                rents: []
            }

            const modelLocker: ModelLocker = {
                id: id,
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

            bloqRepository.setup(instance => instance.saveBloqAsync(It.Is<ModelBloq>(x => x.lockers.length == 0)))
                .returns(Promise.resolve());

            const lockerService = new LockerService(bloqRepository.object());
            
            // Act
            await lockerService.updateAsync(id, newStatelocker);

            // Assert
            bloqRepository.verify(instance => instance.getByIdAsync(It.IsAny()), Times.Once());
            bloqRepository.verify(instance => instance.saveBloqAsync(It.IsAny()), Times.Once());
        });
    });
});