import { NextFunction, Request, Response } from 'express';
import ILockerService from '../../2.0 - service/locker_service';
import { Locker } from '../../2.0 - service/dtos/locker/locker';

export default class LockersController {
  private readonly lockerService: ILockerService;

  constructor(lockerService: ILockerService) {
    this.lockerService = lockerService;
  }

  async getLockersAsync(req: Request, res: Response, next: NextFunction) {
    const bloqId = req.params.id;
    
    try {
      return res.json(await this.lockerService.getAllAsync(bloqId));
    }
    catch(error)
    {
      next(error);
    }
  }

  async createLockerAsync(req: Request, res: Response, next: NextFunction) {
    const bloqId = req.params.id;

    const locker: Locker = {
      id: "",
      bloqId: bloqId,
      status: req.body.status,
      isOccupied: req.body.isOccupied,
    };

    try {
      const createdLocker = await this.lockerService.createLockerAsync(locker);
      return res.status(201).json(createdLocker);
    }
    catch(error)
    {
      next(error);
    }
  }

  async deleteLockerAsync(req: Request, res: Response, next: NextFunction) {
    const bloqId = req.params.id
    const id = req.params.lockerId

    try {
      const locker = await this.lockerService.deleteAsync(bloqId, id);
      return res.status(200).json(locker);
    }
    catch(error)
    {
      next(error);
    }
  }

  async updateLockerAsync(req: Request, res: Response, next: NextFunction) {
    const bloqId = req.params.id
    const id = req.params.lockerId

    const newStateLocker: Locker = {
      id: id,
      bloqId: bloqId,
      status: req.body.status,
      isOccupied: req.body.isOccupied,
    };

    try {
      const locker = await this.lockerService.updateAsync(id, newStateLocker);
      return res.status(200).json(locker);
    }
    catch(error)
    {
      next(error);
    }
  }
}