import { Request, Response } from "express-serve-static-core";
import services from '@services/api/renters'
import validations from '@shared/validations/renters'

class RentersController {

  async create(req: Request, res: Response){
    try {
      await validations.create_renter_validation.validate(req.body, { abortEarly: false });

      const renter = await services.create.call(req.body, req.user);

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
    const renters = await services.listing.call(req.user, req.query.search);

    return res.status(200).json(renters)
  }

  async show(req: Request, res: Response){
    try {
      const renter = await services.show.call(Number(req.params.id), req.user);
      
      return res.status(200).json({ renter });
    } catch (error) {
      if(error.status_code){
        return res.status(error.status_code).json({ error: { message: error.message } });
      }

      return res.status(422).json(error)
    }

  }

  async update(req: Request, res: Response){
    try {
      await validations.update_renter_validation.validate(req.body, { abortEarly: false });

      const renter = await services.update.call(Number(req.params.id), req.user, req.body);
    
      return res.status(200).json({ renter });
    } catch (error) {
      if(error.status_code){
        return res.status(error.status_code).json({ error: { message: error.message } });
      }

      if(error.inner){
			  const errors = { name: error.name, message: error.message, errors: {} };
				error.inner.forEach(element => {
					errors.errors[element.path] = element.errors
				});
				
				return res.status(400).json(errors);
			}

      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response){
    try {
      await validations.update_renter_validation.validate(req.body, { abortEarly: false });

      const result = await services.destroy.call(Number(req.params.id), req.user, req.body);

      return res.status(200).json({ result });
    } catch (error) {
      if(error.status_code){
        return res.status(error.status_code).json({ error: { message: error.message } });
      }

      if(error.inner){
			  const errors = { name: error.name, message: error.message, errors: {} };
				error.inner.forEach(element => {
					errors.errors[element.path] = element.errors
				});
				
				return res.status(400).json(errors);
			}

      return res.status(500).json(error);
    }
  }

}

export default new RentersController();