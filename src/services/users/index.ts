import {BaseService} from '@services/base_service';

class UserIndex extends BaseService{
  constructor(){
    super()
  }

  async call(){
    const users = await this.prisma.user.findMany({});

    return users;
  }
}

export default new UserIndex();