import { User } from "@models/User";
import bcrypt from 'bcrypt';
import { BaseService } from "@services/base_service";

class UserUpdate extends BaseService{

  constructor(){
    super()
  }

  async call(data, id){
    
    let user = await this.prisma.user.findUnique({
      where: { id }
    });

    if(!user){
      console.log('here bitch');
      
      throw {
        name: 'Record not found',
        message: `Usuário com id ${id} não foi encontrado.`
      }
    }

    if(!await bcrypt.compare(data.current_password, user.password)){
      console.log("here moda foca");
      
      throw {
        name: 'Unautorized',
        message: `Senha atual incorreta.`
      }
    }

    try {
        
      delete data.current_password;
      delete data.confirm_password;

      if (data.password){
        data.password = await bcrypt.hash(data.password, 10);
      }
      user = await this.prisma.user.update({
        where: { id },
        data
      });

      return user;
    } catch (error) {
      throw {
        name: 'Data base error',
        message: error.meta.cause
      };
    }
    
  }
  
}

export default new UserUpdate();