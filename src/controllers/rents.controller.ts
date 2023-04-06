import { Request, Response } from "express";
import services from '@services/api/rents';
import validations from '@shared/validations/rents';

class RentsController {
  async create(req: Request, res: Response){
    await validations.create.validate(req.body, { abortEarly: false });
    const rent = await services.create.call(req.user, req.body);

    return res.status(201).json(rent)
  }
}

export default new RentsController();