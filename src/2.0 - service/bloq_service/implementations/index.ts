import IBloqService from "..";
import { Bloq } from "../../dtos/bloq/bloq";
import { Bloq as ModelBloq } from "../../../3.0 - data/models/bloq/bloq";
import IBloqRepository from "../../../3.0 - data/repositories/bloq";
import { v4 as uuidv4 } from 'uuid';
import ResourceNotFound from "../../errors/resourceNotFound";
import BloqMapper from "../mappers";

export default class BloqService implements IBloqService {
    private readonly bloqRepository: IBloqRepository;

    constructor(bloqRepository: IBloqRepository) {
        this.bloqRepository = bloqRepository;
    }

    async getAllAsync(): Promise<Array<Bloq>> {
        return (await this.bloqRepository.getAllAsync()).map(inst => BloqMapper.toDto(inst));
    }

    async createBloqAsync(bloq: Bloq): Promise<Bloq> {
        const model: ModelBloq = {
            id: uuidv4(),
            title: bloq.title,
            address: bloq.address,
            lockers: []
        };

        await this.bloqRepository.saveBloqAsync(model);
        return BloqMapper.toDto(model);
    }

    async deleteAsync(id: string): Promise<Bloq> {
        const bloq = await this.bloqRepository.getByIdAsync(id);

        if(bloq == undefined) {
            throw new ResourceNotFound("Bloq", id);
        }

        await this.bloqRepository.deleteAsync(id);
        return BloqMapper.toDto(bloq);
    }

    async updateAsync(id: string, newStatebloq: Bloq): Promise<Bloq> {
        const bloq = await this.bloqRepository.getByIdAsync(id);

        if(bloq == undefined) {
            throw new ResourceNotFound("Bloq", id);
        }

        bloq.title = newStatebloq.title,
        bloq.address = newStatebloq.address,

        await this.bloqRepository.saveBloqAsync(bloq);
        return BloqMapper.toDto(bloq);
    }
}