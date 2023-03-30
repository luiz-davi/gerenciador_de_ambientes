import { Response, Request } from "express";
import services from '@services/api/general';

class GeneralController {
  async environsments(req: Request, res: Response){
    const envs = await services.environments.call(req.query);
    
    return res.status(200).json(envs);
  }
}

export default new GeneralController();