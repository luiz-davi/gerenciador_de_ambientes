import { NotFoundError } from "@shared/errors";
import { BaseService } from "../base_service";

class UpdateService extends BaseService {

  async call(user, env_id, id, data){
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

      const item = await this.prisma.item.update({
        where: { id },
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
      });
      return item;
    } catch (error) {
      throw new NotFoundError(error.message);
    }
  }

}

export default new UpdateService();