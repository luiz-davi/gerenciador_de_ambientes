import {BaseService} from '@services/base_service';
import bcrypt from 'bcrypt';
import upload from '@shared/firebase';

class UserCreate extends BaseService{
  constructor(){
    super()
  }

  async call(data, file){
    try {
      if(file){
        data.avatar_url = await upload(file);
      }
      
      delete data.confirm_password;
      data.password = await bcrypt.hash(data.password, 10);
      
      const users = await this.prisma.user.create({
        data,
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          phone: true,
          avatar_url: true,
          password: false,
          created_at: true,
          updated_at: false
        }
      });
  
      return users;
    } catch (error) {
      throw {
        name: 'Data base error',
        error 
      };
    }
  }
  
}

export default new UserCreate();