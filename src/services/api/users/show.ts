import {BaseService} from '@services/api/base_service';

class UserShow extends BaseService{
  constructor(){
    super()
  }

  async call(id){
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
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
  
      await this.prisma.$disconnect();
      return user;
    } catch (error) {
      await this.prisma.$disconnect();
      throw {
        name: 'Data base error',
        message: error.meta.cause
      };
    }
  }
}

export default new UserShow();