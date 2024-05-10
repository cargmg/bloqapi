import { Bloq } from "../dtos/bloq/bloq";

export default interface IBloqService {
    getAllAsync(): Promise<Array<Bloq>>;
    createBloqAsync(bloq: Bloq): Promise<Bloq>;
    deleteAsync(id: string): Promise<Bloq>;
    updateAsync(id: string, newStatebloq: Bloq): Promise<Bloq>;
}
  