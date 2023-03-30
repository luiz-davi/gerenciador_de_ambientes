import { NotFoundError } from "@shared/errors";
import { BaseService } from "../base_service";

class ShowService extends BaseService {
  async call(user, env_id, id){
    try {
      return await this.prisma.item.findFirstOrThrow({
        where: {
          environment_id: env_id,
          environment: {
            locator_id: user.id
          },
          id: id
        },
        select: {
          id: true,
          name: true,
          amount: true,
          picture: true,
          created_at: true,
          environment: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
    } catch (error) {
      throw new NotFoundError(error.message);
    }
  }
}

export default new ShowService();