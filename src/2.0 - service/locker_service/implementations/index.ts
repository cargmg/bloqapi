import ILockerService from "..";
import { Locker as ModelLocker } from "../../../3.0 - data/models/locker/locker";
import { LockerStatus  } from "../../../3.0 - data/models/locker/lockerStatus";
import { Locker } from "../../dtos/locker/locker";
import { v4 as uuidv4 } from 'uuid';
import ResourceNotFound from "../../errors/resourceNotFound";
import LockerMapper from "../mappers";
import { RentStatus as ModelRentStatus } from "../../../3.0 - data/models/rent/rentStatus";
import InvalidOperationError from "../../errors/invalidOperationError";
import IBloqRepository from "../../../3.0 - data/repositories/bloq";

export default class LockerService implements ILockerService {
    private readonly bloqRepository: IBloqRepository;

    constructor(bloqRepository: IBloqRepository) {
        this.bloqRepository = bloqRepository;
    }

    async getAllAsync(bloqId: string): Promise<Locker[]> {
        const bloq = await this.bloqRepository.getByIdAsync(bloqId);

        if(bloq == undefined)
        {
            throw new ResourceNotFound("Bloq", bloqId);
        }

        return bloq.lockers.map(instance => LockerMapper.toDto(instance));
    }

    async createLockerAsync(locker: Locker): Promise<Locker> {
        const bloq = await this.bloqRepository.getByIdAsync(locker.bloqId);

        if(bloq == undefined) {
            throw new ResourceNotFound("Bloq", locker.bloqId);
        }

        const model: ModelLocker = {
            id: uuidv4(),
            bloqId: locker.bloqId,
            status: LockerStatus.CLOSED,
            isOccupied: false,
            rents: []
        };

        bloq.lockers.push(model);

        await this.bloqRepository.saveBloqAsync(bloq);
        return LockerMapper.toDto(model);
    }

    async deleteAsync(bloqId: string, id: string): Promise<Locker> {
        const bloq = await this.bloqRepository.getByIdAsync(bloqId);

        if(bloq == undefined) {
            throw new ResourceNotFound("Bloq", bloqId);
        }

        const locker = bloq.lockers.find(instance => instance.id == id);

        if(locker == undefined) {
            throw new ResourceNotFound("Locker", id);
        }

        bloq.lockers = bloq.lockers.filter(instance => instance.id != id);

        await this.bloqRepository.saveBloqAsync(bloq);
        return LockerMapper.toDto(locker);
    }
    
    async updateAsync(id: string, newStateLocker: Locker): Promise<Locker> {
        const bloqId = newStateLocker.bloqId;
        const bloq = await this.bloqRepository.getByIdAsync(bloqId);

        if(bloq == undefined) {
            throw new ResourceNotFound("Bloq", bloqId);
        }

        const locker = bloq.lockers.find(instance => instance.id == id);

        if(locker == undefined) {
            throw new ResourceNotFound("Locker", id);
        }

        const isOccupied = locker.rents.find(element => element.status == ModelRentStatus.WAITING_PICKUP) != undefined;

        if(newStateLocker.isOccupied != isOccupied) {
            throw new InvalidOperationError("Locker", id, "Invalid isOccupied value.");
        }

        locker.status = newStateLocker.status,
        locker.isOccupied = newStateLocker.isOccupied,

        await this.bloqRepository.saveBloqAsync(bloq);
        return LockerMapper.toDto(locker);
    }
}