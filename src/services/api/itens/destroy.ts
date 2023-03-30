import { NotFoundError } from "@shared/errors";
import { BaseService } from "../base_service";

class DestroyService extends BaseService {

  async call(user, env_id, id){
    try {
      await this.prisma.item.findFirstOrThrow({
        where: {
          id: id,
          environment_id: env_id,
          environment: {
            locator_id: user.id
          }
        }
      });

      await this.prisma.item.delete({ where: { id }});
      return true;
    } catch (error) {
      throw new NotFoundError(error.message);
    }
  }
}

export default new DestroyService();