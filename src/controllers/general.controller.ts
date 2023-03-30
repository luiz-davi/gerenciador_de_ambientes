import { Response, Request } from "express";
import services from '@services/api/general';

class GeneralController {
  async environsments(req: Request, res: Response){
    const envs = await services.environments.call(req.query);
    
    return res.status(200).json(envs);
  }

  async show_environment(req: Request, res: Response){
    try {
      const env = await services.show_environment.call(Number(req.params.id));

      return res.status(200).json(env);
    } catch (error) {
      return res.status(error.status_code).json({ error: { messsage: error.message } });
    }
  }
}

export default new GeneralController();