import { Request, Response } from "express";
import services from '@services/api/environments'
import validation from '@shared/validations/environments';
class EnvironmentsController {

  async create(req: Request, res: Response){
    try {
      await validation.create.validate(req.body, { abortEarly: false });
      const environment = await services.create.call(req.body, req.files, req.user);
  
      return res.status(200).json({
        message: "Ambiente criado com sucesso!",
        environment
      });

    } catch (error) {
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

  async index(req: Request, res: Response){
    try {
      await validation.listing.validate(req.query, { abortEarly: false });
      
      const envs = await services.listing.call(req.user, req.query);
      return res.status(200).json(envs?.environments);
    } catch (error) {
      if(error.inner){
        const errors = { name: error.name, message: error.message, errors: {} };
				error.inner.forEach(element => {
					errors.errors[element.path] = element.errors
				});
	
				return res.status(400).json(errors);
			}
      
      return res.status(error.status_code).json({ error: { message: error.message } })
    }
  }

  async show(req: Request, res: Response){
    try{
      const env = await services.show.call(req.user, req.params.id);

      return res.status(200).json(env);
    }catch(error){
      return res.status(error.status_code).json({ error: { message: error.message }})
    }
  }

  async delete(req: Request, res: Response){
    try {
      await validation.destroy.validate(req.body, { abortEarly: false });

      const result = await services.destroy.call(req.body, req.user, req.params.id);

      return res.status(200).json({ result })
    } catch (error) {
      if(error.inner){
        const errors = { name: error.name, message: error.message, errors: {} };

				error.inner.forEach(element => {
					errors.errors[element.path] = element.errors
				});
				return res.status(400).json(errors);
			}

      return res.status(error.status_code).json({ error: { message: error.message }})
    }
  }
  
}

export default new EnvironmentsController();