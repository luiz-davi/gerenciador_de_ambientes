import {BaseService} from '@services/base_service';

class UserCreate extends BaseService{
  constructor(){
    super()
  }

  async call(data){
    const users = await this.prisma.user.create({
      data,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        password: false,
        created_at: true,
        updated_at: false
      }
    });

    return users;
  }
}

export default new UserCreate();