import { NotFoundError, UnauthrizedError } from "@shared/errors";
import { BaseService } from "../base_service";
import bcrypt from 'bcrypt';

class DestroyEnvironment extends BaseService{

  async call(data, user, id){

    if(!await bcrypt.compare(data.current_password, user.password)){
      throw new UnauthrizedError('Confirmação de senha falhou.');
    }

    const env = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        environments: {
          where: { id: Number(id) },
          take: 1
        }
      }
    });

    if(!env?.environments[0]){
      throw new NotFoundError('Ambiente não encontrado.');
    }
    
    this.prisma.environment.delete({
      where: { id: env.environments[0].id }
    });

    return true;
  }
}

export default new DestroyEnvironment();