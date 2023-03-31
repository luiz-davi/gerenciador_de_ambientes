import { NotFoundError } from "@shared/errors";
import { BaseService } from "../base_service";

class ShowEnvironmentGeneralService extends BaseService{
  async call(id){
    try{
      const env = await this.prisma.environment.findFirstOrThrow({
        where: { 
          id, 
          public: true 
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          pictures: true,
          created_at: true,
          locator: {
            select: {
              id: true,
              last_name: true,
              first_name: true,
              avatar_url: true,
              email: true,
              phone: true,
              created_at: true 
            }
          },
          itens: {
            select: {
              id: true,
              name: true,
              amount: true,
              created_at: true
            }
          }
        }
      });

      return env;
    } catch(error){
      throw new NotFoundError(error.message);
    }
  }
}

export default new ShowEnvironmentGeneralService();