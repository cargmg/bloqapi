import IBloqRepository from '..';
import connect from '../../../../1.0 - presentation/database/db';
import { Bloq as ModelBloq } from '../../../models/bloq/bloq';
import { Locker as ModelLocker } from '../../../models/locker/locker';
import { Rent as ModelRent } from '../../../models/rent/rent';
import Bloq from '../../db/bloq/bloq';
import BloqMapper from '../mappers';
 
const BLOQ_COLLECTION = "bloqs";

export default class BloqMongoRepository implements IBloqRepository {

    static async alreadyLoaded() {
        const db = await connect();

        return await db.listCollections({name: BLOQ_COLLECTION}).hasNext();
    }

    static async loadFrom(bloqs: ModelBloq[] = [], lockers: ModelLocker[] = [] , rents: ModelRent[] = []) {

        if(bloqs.length == 0) {
            return;
        }

        lockers.forEach(locker => { locker.rents = rents.filter(rent => rent.lockerId == locker.id) });

        bloqs.forEach(bloq => { bloq.lockers = lockers.filter(locker => locker.bloqId == bloq.id); });

        const db = await connect();

        await db.collection(BLOQ_COLLECTION)
            .insertMany(bloqs.map(elem => BloqMapper.toDb(elem)));
    }

    async getAllAsync(): Promise<ModelBloq[]> {
        const db = await connect();

        const bloqs = await db.collection<Bloq>(BLOQ_COLLECTION)
            .find()
            .toArray();
    
        return bloqs.map(elem => BloqMapper.toDomain(elem));
    }

    async getByIdAsync(id: string): Promise<ModelBloq | undefined> {
        const db = await connect();

        const bloq = await db.collection<Bloq>(BLOQ_COLLECTION)
            .findOne({ id: id });

        if (!bloq) {
            return undefined;
        }

        return BloqMapper.toDomain(bloq);
    }

    async saveBloqAsync(bloq: ModelBloq): Promise<void> {
        const db = await connect();

        const bloqDb = await db.collection<Bloq>(BLOQ_COLLECTION)
            .findOne({ id: bloq.id });

        if (!bloqDb) {
            await db.collection<Bloq>(BLOQ_COLLECTION)
                .insertOne(BloqMapper.toDb(bloq));

            return;
        }

        await db.collection<Bloq>(BLOQ_COLLECTION)
            .updateOne({ _id: bloqDb._id }, {$set:  BloqMapper.toDb(bloq)});
    }

    async deleteAsync(id: string): Promise<void> {
        const db = await connect();

        await db.collection<Bloq>(BLOQ_COLLECTION)
            .deleteOne({ id: id });
    }
}