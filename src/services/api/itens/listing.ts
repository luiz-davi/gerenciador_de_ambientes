import { NotFoundError } from "@shared/errors";
import { BaseService } from "../base_service";

class ListingService extends BaseService{
  async call(user, env_id){

    try {
      const env = await this.prisma.environment.findFirstOrThrow({
        where: {
          id: env_id,
          locator_id: user.id
        }
      });
  
      const itens = await this.prisma.item.findMany({
        where: { environment_id: env.id },
        select: {
          id: true,
          name: true,
          amount: true,
          picture: true,
          created_at: true,
          environment_id: true
        }
      });
      
      return itens;
    } catch (error) {
      throw new NotFoundError(error.message);
    }
  }
}

export default new ListingService();