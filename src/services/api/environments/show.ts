import { NotFoundError } from "@shared/errors";
import environments from ".";
import { BaseService } from "../base_service";

class ShowEnvironment extends BaseService{

  async call(user, id){
    const env = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        environments: {
          where: { id: Number(id) },
          take: 1,
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            pool: true,
            grill: true,
            kitchen: true,
            playground: true,
            pictures: true,
            created_at: true,
            itens: {
              select: {
                id: true,
                name: true,
                amount: true,
                picture: true,
                created_at: true
              }
            }
          }
        }
      }
    });

    if(env?.environments.length === 0){
      throw new NotFoundError('Ambiente não encontrado.'); 
    }

    return env?.environments[0];
  }
}

export default new ShowEnvironment();