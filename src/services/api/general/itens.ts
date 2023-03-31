import { NotFoundError } from "@shared/errors";
import { BaseService } from "../base_service";

class ItensGeneralService extends BaseService {
  async call(id){
    try {
      const itens = await this.prisma.item.findMany({
        where: {
          environment: {
            id, public: true
          }
        },
        select: {
          id: true,
          name: true,
          amount: true,
          picture: true,
          environment_id: true,
          created_at: true
        }
      });
  
      return itens;
    } catch (error) {
      throw new NotFoundError(error.message);
    }
  }
}

export default new ItensGeneralService();