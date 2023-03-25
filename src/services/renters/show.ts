import { BaseService } from '@services/base_service'
import { NotFoundError } from '@shared/errors';

class ShowUser extends BaseService{
  constructor(){
    super();
  }

  async call(id, user){
    const renter = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        renters: {
          where: { id },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            cpf: true,
            created_at: true
          }
        }
      }
    });

    if(!renter?.renters.length){
      await this.prisma.$disconnect();
      throw new NotFoundError('Id inválido.');
    }

    await this.prisma.$disconnect();
    return renter.renters[0];
  }
}

export default new ShowUser();