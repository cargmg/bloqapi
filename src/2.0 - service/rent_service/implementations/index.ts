import IRentService from "..";
import { Rent as ModelRent } from "../../../3.0 - data/models/rent/rent";
import { Rent } from "../../dtos/rent/rent";
import { RentStatus } from "../../../3.0 - data/models/rent/rentStatus";
import { v4 as uuidv4 } from 'uuid';
import ResourceNotFound from "../../errors/resourceNotFound";
import RentMapper from "../mappers";
import InvalidOperationError from "../../errors/invalidOperationError";
import IBloqRepository from "../../../3.0 - data/repositories/bloq";

export default class RentService implements IRentService {
    private readonly bloqRepository: IBloqRepository;

    private static RentStatusTransitionMap = new Map<RentStatus, RentStatus>([
        [RentStatus.CREATED, RentStatus.WAITING_DROPOFF],
        [RentStatus.WAITING_DROPOFF, RentStatus.WAITING_PICKUP],
        [RentStatus.WAITING_PICKUP, RentStatus.DELIVERED],
        [RentStatus.DELIVERED, RentStatus.DELIVERED],
    ]);

    constructor(bloqRepository: IBloqRepository) {
        this.bloqRepository = bloqRepository;
    }

    async getAllAsync(bloqId: string, lockerId: string): Promise<Rent[]> {
        const bloq = await this.bloqRepository.getByIdAsync(bloqId);

        if(bloq == undefined) {
            throw new ResourceNotFound("Bloq", bloqId);
        }

        const locker = bloq.lockers.find(instance => instance.id == lockerId);

        if(locker == undefined) {
            throw new ResourceNotFound("Locker", lockerId);
        }

        return locker.rents.map(instance => RentMapper.toDto(instance));
    }

    async createRentAsync(bloqId: string, rent: Rent): Promise<Rent> {
        const bloq = await this.bloqRepository.getByIdAsync(bloqId);

        if(bloq == undefined) {
            throw new ResourceNotFound("Bloq", bloqId);
        }

        const lockerId = rent.lockerId;
        const locker = bloq.lockers.find(instance => instance.id == lockerId);

        if(locker == undefined) {
            throw new ResourceNotFound("Locker", lockerId);
        }

        const model: ModelRent = {
            id: uuidv4(),
            lockerId: rent.lockerId,
            size: rent.size,
            status: RentStatus.CREATED,
            weight: rent.weight
        };

        locker.rents.push(model);
        await this.bloqRepository.saveBloqAsync(bloq);

        return RentMapper.toDto(model);
    }

    async deleteAsync(bloqId: string, lockerId: string, id: string): Promise<Rent> {
        const bloq = await this.bloqRepository.getByIdAsync(bloqId);

        if(bloq == undefined) {
            throw new ResourceNotFound("Bloq", bloqId);
        }

        const locker = bloq.lockers.find(instance => instance.id == lockerId);

        if(locker == undefined) {
            throw new ResourceNotFound("Locker", lockerId);
        }

        const rent = locker.rents.find(instance => instance.id == id);

        if(rent == undefined) {
            throw new ResourceNotFound("Rent", id);
        }

        locker.rents = locker.rents.filter(instance => instance.id != id);
        await this.bloqRepository.saveBloqAsync(bloq);
        return RentMapper.toDto(rent);
    }

    async updateAsync(bloqId: string, id: string, newStateRent: Rent): Promise<Rent> {
        const bloq = await this.bloqRepository.getByIdAsync(bloqId);

        if(bloq == undefined) {
            throw new ResourceNotFound("Bloq", bloqId);
        }

        const lockerId = newStateRent.lockerId;
        const locker = bloq.lockers.find(instance => instance.id == lockerId);

        if(locker == undefined) {
            throw new ResourceNotFound("Locker", lockerId);
        }

        const rent = locker.rents.find(instance => instance.id == id);

        if(rent == undefined) {
            throw new ResourceNotFound("Rent", id);
        }

        if(RentService.RentStatusTransitionMap.get(rent.status) != newStateRent.status) {
            throw new InvalidOperationError("Rent", id, "Invalid status transition.");
        }

        rent.size = newStateRent.size;
        rent.status = newStateRent.status;
        rent.weight = newStateRent.weight;

        await this.bloqRepository.saveBloqAsync(bloq);
        return RentMapper.toDto(rent);
    }
}