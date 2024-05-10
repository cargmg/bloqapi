import { Bloq as BloqModel } from "../../../models/bloq/bloq";
import InMemBloqRepository from ".";

describe('InMemBloqRepository', () => {
    describe('getAllAsync', () => {
        it('should return all instances', async () => {
            // Arrange
            const modelBloqs: BloqModel[] = [];
            InMemBloqRepository.loadFrom(modelBloqs);

            const bloqRepository = new InMemBloqRepository();

            // Act
            const result = await bloqRepository.getAllAsync();

            // Assert
            expect(result).toBe(modelBloqs);
        });
    });

    describe('getByIdAsync', () => {
        it('should return instance', async () => {
            // Arrange
            const modelBloqs: BloqModel[] = [];
            const id: string = "id";
            const modeBloq: BloqModel = {
                id: id,
                title: "title",
                address: "address",
                lockers: []
            };
            modelBloqs.push(modeBloq);

            InMemBloqRepository.loadFrom(modelBloqs);

            const bloqRepository = new InMemBloqRepository();

            // Act
            const result = await bloqRepository.getByIdAsync(id);

            // Assert
            expect(result).toBeDefined();
        });

        it('should return undefined', async () => {
            // Arrange
            const modelBloqs: BloqModel[] = [];
            InMemBloqRepository.loadFrom(modelBloqs);

            const id: string = "id";

            const bloqRepository = new InMemBloqRepository();

            // Act
            const result = await bloqRepository.getByIdAsync(id);

            // Assert
            expect(result).toBeUndefined();
        });
    });

    describe('saveBloqAsync', () => {
        it('should save the new instance', async () => {
            // Arrange
            const modelBloqs: BloqModel[] = [];
            InMemBloqRepository.loadFrom(modelBloqs);

            const modeBloq: BloqModel = {
                id: "id",
                title: "title",
                address: "address",
                lockers: []
            };

            const bloqRepository = new InMemBloqRepository();

            // Act
            await bloqRepository.saveBloqAsync(modeBloq);

            // Assert
            expect(modelBloqs.length).toBe(1);
        });
    });

    describe('deleteAsync', () => {
        it('should delete the instance', async () => {
            // Arrange
            const modelBloqs: BloqModel[] = [];
            const id: string = "id";
            const modeBloq: BloqModel = {
                id: id,
                title: "title",
                address: "address",
                lockers: []
            };
            modelBloqs.push(modeBloq);

            InMemBloqRepository.loadFrom(modelBloqs);

            const bloqRepository = new InMemBloqRepository();

            // Act
            await bloqRepository.deleteAsync(id);

            // Assert
            const result = await bloqRepository.getAllAsync();
            expect(result.length).toBe(0);
        });
    });

    describe('updateAsync', () => {
        it('should delete the instance', async () => {
            // Arrange
            const modelBloqs: BloqModel[] = [];
            const id: string = "id";
            const modeBloq: BloqModel = {
                id: id,
                title: "title",
                address: "address",
                lockers: []
            };
            modelBloqs.push(modeBloq);

            InMemBloqRepository.loadFrom(modelBloqs);

            const newModeBloq: BloqModel = {
                id: id,
                title: "new_title",
                address: "new_address",
                lockers: []
            };

            const bloqRepository = new InMemBloqRepository();

            // Act
            await bloqRepository.updateAsync(newModeBloq);

            // Assert
            expect(modelBloqs[0].title).toBe(newModeBloq.title);
            expect(modelBloqs[0].address).toBe(newModeBloq.address);
        });
    });
});