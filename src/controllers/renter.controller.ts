import { Request, Response } from "express-serve-static-core";
import create_renter from '@services/renters/create'
import index_renters from '@services/renters/index';
import validations from '@shared/validations/renters'

class RentersController {

  async create(req: Request, res: Response){
    try {
      await validations.create_renter_validation.validate(req.body, { abortEarly: false });

      const renter = await create_renter.call(req.body, req.user);

      return res.status(201).json({ renter });
    } catch (error) {
			const errors = { name: error.name, message: error.message, errors: {} };

      if(error.inner){
				error.inner.forEach(element => {
					errors.errors[element.path] = element.errors
				});
				
				return res.status(400).json(errors);
			}

      return res.status(500).json(error);
    }
  }

  async index(req: Request, res: Response){
    const renters = await index_renters.call(req.user);

    return res.status(200).json(renters)
  }

}

export default new RentersController();