import {BaseService} from '@services/base_service';
import bcrypt from 'bcrypt';
import { NotAuthrizedError, NotFoundError } from '@shared/errors';

class UserDelete extends BaseService{
  constructor(){
    super()
  }

  async call(password: string, id: number){
    let user = await this.prisma.user.findUnique({
      where: { id }
    });

    if(!user){
      throw new NotFoundError(`Usuário com id ${id} não foi encontrado`);
    }

    if(!await bcrypt.compare(password, user.password)){      
      throw new NotAuthrizedError(`Operação não autorizada`);
    }
    

    try {
      const user = await this.prisma.user.delete({
        where: { id }
      });
  
      return user;
    } catch (error) {
      throw {
        name: 'Data base error',
        error 
      };
    }
  }
}

export default new UserDelete();