import { Locker } from "../dtos/locker/locker";

export default interface ILockerService {
    getAllAsync(bloqId: string): Promise<Array<Locker>>;
    createLockerAsync(locker: Locker): Promise<Locker>;
    deleteAsync(bloqId: string, id: string): Promise<Locker>;
    updateAsync(id: string, newStateLocker: Locker): Promise<Locker>;
}
  