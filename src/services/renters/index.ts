import { BaseService } from '@services/base_service';

class IndexRenters extends BaseService {
  constructor(){
    super()
  }

  async call (user){
    const renters = this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        renters: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            cpf: true
          }
        }
      }
    });

    return renters
  }
}

export default new IndexRenters();