import {BaseService} from '@services/api/base_service';
import bcrypt from 'bcrypt';
import upload from '@services/uploads/user';

class UserCreate extends BaseService{
  constructor(){
    super()
  }

  async call(data, file){
    try {
      if(file){
        const user = { first_name: data.first_name, last_name: data.last_name }
        data.avatar_url = await upload.call(file, user);
      }
      
      delete data.confirm_password;
      data.password = await bcrypt.hash(data.password, 10);
      
      const users = await this.prisma.user.create({
        data,
        select: {
          id: true,
          first_name: true,
          last_name: true,
          surname: true,
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