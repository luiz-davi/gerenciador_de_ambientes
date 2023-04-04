import { BaseService } from '@services/api/base_service';

class ListingRenters extends BaseService {
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
    
    
    return renters;
  }

   search(search){
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

export default new ListingRenters();