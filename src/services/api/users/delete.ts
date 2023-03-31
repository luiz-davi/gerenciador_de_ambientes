import {BaseService} from '@services/api/base_service';
import bcrypt from 'bcrypt';
import { UnauthrizedError, NotFoundError } from '@shared/errors';
import { User } from '@prisma/client';

class UserDelete extends BaseService{
  constructor(){
    super()
  }

  async call(password: string, user: User){

    if(!await bcrypt.compare(password, user.password)){    
        
      throw new UnauthrizedError(`Operação não autorizada`);
    }

    try {
      const result = await this.prisma.user.delete({
        where: { id: user.id }
      });
  
      
      return result;
    } catch (error) {
      
      throw {
        name: 'Data base error',
        error 
      };
    }
  }
}

export default new UserDelete();