import { Rent } from "../dtos/rent/rent";

export default interface IRentService {
    getAllAsync(bloqId: string, lockerId: string): Promise<Array<Rent>>;
    createRentAsync(bloqId: string, rent: Rent): Promise<Rent>;
    deleteAsync(bloqId: string, lockerId: string, id: string): Promise<Rent>;
    updateAsync(bloqId: string, id: string, newStateRent: Rent): Promise<Rent>;
}
  