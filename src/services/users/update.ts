import bcrypt from 'bcrypt';
import { BaseService } from "@services/base_service";
import { User } from '@prisma/client';
import { UnauthrizedError } from '@shared/errors';

class UserUpdate extends BaseService{

  constructor(){
    super()
  }

  async call(data, user: User){

    if(!await bcrypt.compare(data.current_password, user.password)){      
      throw new UnauthrizedError('Confirmação de senha atual falhou.');
    }

    try {
      delete data.current_password;
      delete data.confirm_password;

      if (data.password){
        data.password = await bcrypt.hash(data.password, 10);
      }
      const update_user = await this.prisma.user.update({
        where: { id: user.id },
        data
      });

      return update_user;
    } catch (error) {
      throw {
        name: 'Data base error',
        message: error.meta.cause
      };
    }
    
  }
  
}

export default new UserUpdate();