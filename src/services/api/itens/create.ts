import { NotFoundError } from "@shared/errors";
import { BaseService } from "../base_service";

class CreateItens extends BaseService{
  async call(user, env_id, data){
    
    try {
      const env = await this.prisma.environment.findFirstOrThrow({
        where: {
          id: env_id,
          locator_id: user.id
        },
        select: {
          id: true
        }
      });

      data.environment_id = env_id;
      const item = await this.prisma.item.create({
        data,
        select: {
          id: true,
          name: true,
          amount: true,
          created_at: true,
          environment: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })
      
      return item;
    } catch (error) {
      throw new NotFoundError(error.message);
    }
  }
}

export default new CreateItens();