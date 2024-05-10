import { NextFunction, Request, Response } from 'express';
import IRentService from '../../2.0 - service/rent_service';
import { Rent } from '../../2.0 - service/dtos/rent/rent';

export default class RentsController {
  private readonly rentService: IRentService;

  constructor(rentService: IRentService) {
    this.rentService = rentService;
  }

  async getRentsAsync(req: Request, res: Response, next: NextFunction) {
    const bloqId = req.params.id;
    const lockerId = req.params.lockerId;

    try {
      return res.json(await this.rentService.getAllAsync(bloqId, lockerId));
    }
    catch(error)
    {
      next(error);
    }
  }

  async createRentAsync(req: Request, res: Response, next: NextFunction) {
    const bloqId = req.params.id;
    const lockerId = req.params.lockerId;

    const rent: Rent = {
      id: "",
      lockerId: lockerId,
      weight: req.body.weight,
      size: req.body.size,
      status: req.body.status,
    };

    try {
      const createdRent = await this.rentService.createRentAsync(bloqId, rent);
      return res.status(201).json(createdRent);
    }
    catch(error)
    {
      next(error);
    }
  }

  async deleteRentAsync(req: Request, res: Response, next: NextFunction) {
    const bloqId = req.params.id
    const lockerId = req.params.lockerId
    const id = req.params.rentId

    try {
      const rent = await this.rentService.deleteAsync(bloqId, lockerId, id);
      return res.status(200).json(rent);
    }
    catch(error)
    {
      next(error);
    }
  }

  async updateRentAsync(req: Request, res: Response, next: NextFunction) {
    const bloqId = req.params.id
    const lockerId = req.params.lockerId
    const id = req.params.rentId

    try {
      const newStateRent: Rent = {
        id: "",
        lockerId: lockerId,
        weight: req.body.weight,
        size: req.body.size,
        status: req.body.status,
      };

      const rent = await this.rentService.updateAsync(bloqId, id, newStateRent);
      return res.status(200).json(rent);
    }
    catch(error)
    {
      next(error);
    }
  }
}