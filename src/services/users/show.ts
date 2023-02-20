import {BaseService} from '@services/base_service';

class UserShow extends BaseService{
  constructor(){
    super()
  }

  async call(id){
    const users = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        created_at: true,
      }
    });

    return users;
  }
}

export default new UserShow();