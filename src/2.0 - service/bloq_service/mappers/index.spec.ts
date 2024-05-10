import { Bloq as BloqModel } from "../../../3.0 - data/models/bloq/bloq";
import BloqMapper from ".";

describe('BloqMapper', () => {
    describe('toDto', () => {
        it('should map the model to dto', async () => {
            // Arrange
            const model: BloqModel = {
                id: "id",
                title: "title",
                address: "address",
                lockers: []
            };

            // Act
            const dto = BloqMapper.toDto(model);

            // Assert
            expect(dto.id).toBe(model.id)
            expect(dto.title).toBe(model.title)
            expect(dto.address).toBe(model.address)
        });
    });
});    