import { Request, Response } from "express";
import services from '@services/api/itens';
import validations from '@shared/validations/itens';

class ItensController {

  async create(req: Request, res: Response ){
    try {      
      await validations.create.validate(req.body, { abortEarly: false });

      const item = await services.create.call(req.user, Number(req.params.id), req.body);

      return res.status(201).json({
        message: "Item criado com sucesso.",
        item
      });
    } catch (error) {
      if(error.inner){
        const errors = { name: error.name, message: error.message, errors: {} };
				error.inner.forEach(element => {
					errors.errors[element.path] = element.errors
				});
	
				return res.status(400).json(errors);
			}

      return res.status(error.status_code).json({ error: { message: error.message } });
    }
  }

}

export default new ItensController();