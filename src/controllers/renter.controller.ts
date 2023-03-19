import { Request, Response } from "express-serve-static-core";
import create_renter from '@services/renters/create'

class RentersController {
  async create(req: Request, res: Response){
    try {
      const renter = await create_renter.call(req.body, req.user);

      return res.status(201).json({ renter });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new RentersController();