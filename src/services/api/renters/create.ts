import { BaseService } from '@services/api/base_service';

class CreateRenter extends BaseService{

  constructor(){
    super()
  }

  async call(data, user){
    try {
      data.user_id = user.id;

      await this.prisma.$disconnect();
      return await this.prisma.renter.create({ data });

    } catch (error) {
      await this.prisma.$disconnect();
      throw {
        message: 'Database error',
        error
      }
    }
  }
}

export default new CreateRenter();