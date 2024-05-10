import { NextFunction, Request, Response } from 'express';
import { Bloq } from '../../2.0 - service/dtos/bloq/bloq';
import IBloqService from '../../2.0 - service/bloq_service';

export default class BloqsController {
  private readonly bloqService: IBloqService;

  constructor(bloqService: IBloqService) {
    this.bloqService = bloqService;
  }

  async getBloqsAsync(_: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await this.bloqService.getAllAsync());
    }
    catch(error) {
      next(error);
    }
  }

  async createBloqAsync(req: Request, res: Response, next: NextFunction) {
    const bloq: Bloq = {
      id: ``,
      title: req.body.title,
      address: req.body.address,
    };

    try {
      const createdBloq = await this.bloqService.createBloqAsync(bloq);
      return res.status(201).json(createdBloq);
    }
    catch(error) {
      next(error);
    }
  }

  async deleteBloqAsync(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id

    try {
      const bloq = await this.bloqService.deleteAsync(id);
      return res.status(200).json(bloq);
    }
    catch(error)
    {
      next(error);
    }
  }

  async updateBloqAsync(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id

    try {
      const newStateBloq: Bloq = {
        id: id,
        title: req.body.title,
        address: req.body.address,
      };

      const bloq = await this.bloqService.updateAsync(id, newStateBloq);
      return res.status(200).json(bloq);
    }
    catch(error)
    {
      next(error);
    }
  }
}