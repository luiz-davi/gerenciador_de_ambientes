import { BaseService } from '@services/base_service';

class IndexRenters extends BaseService {
  constructor(){
    super()
  }

  async call (user, search){
    const renters = this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        renters: {
          ...this.search(search),
          ...{
              select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              cpf: true
            }
          }
        }
      }
    });
    
    await this.prisma.$disconnect();
    return renters;
  }

  private search(search){
    if(!search) { return };

    return {
      where: {
        OR: [
          { name: { contains: search }},
          { email: { contains: search }},
          { cpf: { contains: search }},
        ]
      }
    };
  }
}

export default new IndexRenters();