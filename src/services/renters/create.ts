import { BaseService } from '@services/base_service';

class CreateRenter extends BaseService{

  constructor(){
    super()
  }

  async call(data, user){
    try {
      data.user_id = user.id;

      return await this.prisma.renter.create({ data });

    } catch (error) {
      throw {
        message: 'Database error',
        error
      }
    }
  }
}

export default new CreateRenter();