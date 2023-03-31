import { BaseService } from '@services/api/base_service'
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
      
      throw new NotFoundError('Id inválido.');
    }

    
    return renter.renters[0];
  }
}

export default new ShowUser();