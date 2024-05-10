import { It, Mock, Times} from "moq.ts";
import IBloqRepository from "../../../3.0 - data/repositories/bloq";
import { Bloq as ModelBloq } from "../../../3.0 - data/models/bloq/bloq";
import BloqService from ".";
import { Bloq } from "../../dtos/bloq/bloq";
import ResourceNotFound from "../../errors/resourceNotFound";

describe('BloqService', () => {
    describe('getAllAsync', () => {
        it('should call bloqRepository getAllAsync', async () => {
            // Arrange
            const modelBloqs: ModelBloq[] = [];
            const bloqRepository = new Mock<IBloqRepository>()
                .setup(instance => instance.getAllAsync())
                .returns(Promise.resolve(modelBloqs));

            const bloqService = new BloqService(bloqRepository.object());
            
            // Act
            const result = await bloqService.getAllAsync();

            // Assert
            bloqRepository.verify(instance => instance.getAllAsync(), Times.Once());
            expect(result.length).toBe(0);
        });
    });

    describe('createBloqAsync', () => {
        it('should call bloqRepository createBloqAsync', async () => {
            // Arrange
            const bloq: Bloq = {
                id: ``,
                title: "title",
                address: "address",
            };

            const bloqRepository = new Mock<IBloqRepository>()
                .setup(instance => instance.saveBloqAsync(
                    It.Is<ModelBloq>(param => param.title == bloq.title && param.address == bloq.address)))
                .returns(Promise.resolve());

            const bloqService = new BloqService(bloqRepository.object());
            
            // Act
            await bloqService.createBloqAsync(bloq);

            // Assert
            bloqRepository.verify(instance => instance.saveBloqAsync(It.IsAny()), Times.Once());
        });
    });

    describe('deleteAsync', () => {
        it('should call bloqRepository deleteAsync', async () => {
            // Arrange
            const id: string = "id";
            const modelBloq: ModelBloq = {
                id: ``,
                title: "title",
                address: "address",
                lockers: []
            };

            const bloqRepository = new Mock<IBloqRepository>()
                .setup(instance => instance.deleteAsync(id))
                .returns(Promise.resolve());

            bloqRepository
                .setup(instance => instance.getByIdAsync(id))
                .returns(Promise.resolve(modelBloq));

            const bloqService = new BloqService(bloqRepository.object());
            
            // Act
            await bloqService.deleteAsync(id);

            // Assert
            bloqRepository.verify(instance => instance.getByIdAsync(It.IsAny()), Times.Once());
            bloqRepository.verify(instance => instance.deleteAsync(It.IsAny()), Times.Once());
        });

        it('should not call bloqRepository deleteAsync - throws error', async () => {
            // Arrange
            const id: string = "id";

            const bloqRepository = new Mock<IBloqRepository>()
                .setup(instance => instance.deleteAsync(It.IsAny()))
                .returns(Promise.resolve());

            bloqRepository
                .setup(instance => instance.getByIdAsync(It.Is<string>(param => param == id)))
                .returns(Promise.resolve(undefined));
            
            const bloqService = new BloqService(bloqRepository.object());
            
            // Act

            try {
                await bloqService.deleteAsync(id)
                fail();
            }
            catch(error)
            {
                expect(error).toBeInstanceOf(ResourceNotFound);
            }

            // Assert
            bloqRepository.verify(instance => instance.getByIdAsync(It.IsAny()), Times.Once());
            bloqRepository.verify(instance => instance.deleteAsync(It.IsAny()), Times.Never());
        });
    });

    describe('updateAsync', () => {
        it('should call bloqRepository updateAsync', async () => {
            // Arrange
            const id: string = "id";
            const bloq: Bloq = {
                id: ``,
                title: "title",
                address: "address",
            };
            const modelBloq: ModelBloq = {
                id: ``,
                title: "title",
                address: "address",
                lockers: []
            };

            const bloqRepository = new Mock<IBloqRepository>()
                .setup(instance => 
                    instance.saveBloqAsync(It.Is<ModelBloq>(param => param.title == bloq.title && param.address == bloq.address)))
                .returns(Promise.resolve());

            bloqRepository
                .setup(instance => instance.getByIdAsync(It.Is<string>(param => param == id)))
                .returns(Promise.resolve(modelBloq));

            const bloqService = new BloqService(bloqRepository.object());

            // Act
            await bloqService.updateAsync(id, bloq);

            // Assert
            bloqRepository.verify(instance => instance.getByIdAsync(It.IsAny()), Times.Once());
            bloqRepository.verify(instance => instance.saveBloqAsync(It.IsAny()), Times.Once());
        });

        it('should call bloqRepository updateAsync', async () => {
            // Arrange
            const id: string = "id";
            const bloq: Bloq = {
                id: ``,
                title: "title",
                address: "address",
            };

            const bloqRepository = new Mock<IBloqRepository>()
                .setup(instance => 
                    instance.saveBloqAsync(It.IsAny()))
                .returns(Promise.resolve());

            bloqRepository
                .setup(instance => instance.getByIdAsync(It.Is<string>(param => param == id)))
                .returns(Promise.resolve(undefined));

            const bloqService = new BloqService(bloqRepository.object());
            
            // Act
            try {
                await bloqService.updateAsync(id, bloq);
                fail();
            }
            catch(error)
            {
                expect(error).toBeInstanceOf(ResourceNotFound);
            }

            // Assert
            bloqRepository.verify(instance => instance.getByIdAsync(It.IsAny()), Times.Once());
            bloqRepository.verify(instance => instance.saveBloqAsync(It.IsAny()), Times.Never());
        });
    });
});