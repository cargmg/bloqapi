import IBloqRepository from "..";
import { Bloq as ModelBloq } from "../../../models/bloq/bloq";
import { Locker as ModelLocker } from "../../../models/locker/locker";
import { Rent as ModelRent } from "../../../models/rent/rent";

export default class InMemBloqRepository implements IBloqRepository {
    private static bloqs: Array<ModelBloq>;

    static loadFrom(bloqs: ModelBloq[] = [], lockers: ModelLocker[] = [] , rents: ModelRent[] = []) {

        lockers.forEach(locker => { locker.rents = rents.filter(rent => rent.lockerId == locker.id) });

        bloqs.forEach(bloq => { bloq.lockers = lockers.filter(locker => locker.bloqId == bloq.id); });

        InMemBloqRepository.bloqs = bloqs
    }

    constructor() {
    }

    getAllAsync(): Promise<Array<ModelBloq>> {
        return Promise.resolve(InMemBloqRepository.bloqs);
    }

    getByIdAsync(id: string): Promise<ModelBloq | undefined> {
        return Promise.resolve(InMemBloqRepository.bloqs.find(x => x.id == id));
    }

    saveBloqAsync(bloq: ModelBloq): Promise<void> {
        return this.updateAsync(bloq, true);
    }

    deleteAsync(id: string): Promise<void> {
        const newArr = InMemBloqRepository.bloqs.filter(x => x.id != id);
        InMemBloqRepository.bloqs = newArr;
        return Promise.resolve();
    }

    updateAsync(bloq: ModelBloq, upsert: boolean = false): Promise<void> {
        const resolvedPromise = Promise.resolve();

        const index = InMemBloqRepository.bloqs.findIndex(x => x.id == bloq.id);
        
        if(index == -1) {
            if(upsert) {
                InMemBloqRepository.bloqs.push(bloq);
            }

            return resolvedPromise;
        }

        InMemBloqRepository.bloqs[index] = bloq;

        return resolvedPromise;
    }
}