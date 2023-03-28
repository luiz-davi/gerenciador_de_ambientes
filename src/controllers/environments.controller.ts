import { Request, Response } from "express";
import services from '@services/api/environments'
import create from '@shared/validations/environments/create.validation';
import listing from '@shared/validations/environments/listing.validation';
class EnvironmentsController {

  async create(req: Request, res: Response){
    try {
      await create.validate(req.body, { abortEarly: false });
      const environment = await services.create.call(req.body, req.files, req.user);
  
      return res.status(200).json({
        message: "Ambiente criado com sucesso!",
        environment
      });

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
    try {
      await listing.validate(req.query, { abortEarly: false });
      
      const envs = await services.listing.call(req.user, req.query);
      return res.status(200).json(envs?.environments);
    } catch (error) {
      const errors = { name: error.name, message: error.message, errors: {} };
				
			if(error.inner){
				error.inner.forEach(element => {
					errors.errors[element.path] = element.errors
				});
	
				return res.status(400).json(errors);
			}
    }
  }
}

export default new EnvironmentsController();