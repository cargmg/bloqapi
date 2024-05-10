import { Bloq as ModelBloq } from "../../models/bloq/bloq";

export default interface IBloqRepository {
    getAllAsync(): Promise<Array<ModelBloq>>;
    getByIdAsync(id: string): Promise<ModelBloq | undefined>;
    saveBloqAsync(bloq: ModelBloq): Promise<void>;
    deleteAsync(id: string): Promise<void>;
}