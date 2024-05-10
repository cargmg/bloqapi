import { Bloq } from "../../dtos/bloq/bloq";
import { Bloq  as BloqModel } from "../../../3.0 - data/models/bloq/bloq";

export default class BloqMapper {
    static toDto(model: BloqModel): Bloq {
        const dto: Bloq = {
            id: model.id,
            title: model.title,
            address: model.address,
        };

        return dto;
    }
}