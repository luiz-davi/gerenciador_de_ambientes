import bcrypt from 'bcrypt';
import { UnauthrizedError } from '@shared/errors';
import { BaseService } from "@services/base_service";
import { NotFoundError } from "@shared/errors";

class UpdateRenter extends BaseService {
  constructor(){
    super();
  }

  async call(id, user, data){
    if(!await bcrypt.compare(data.current_password, user.password)){
      await this.prisma.$disconnect();
      throw new UnauthrizedError('Confirmação de senha atual falhou.');
    }

    const renter = await this.prisma.renter.findFirst({
      where: { id: id, user_id: user.id }
    });

    if(!renter){
      await this.prisma.$disconnect();
      throw new NotFoundError('Locatário não encontrado.')
    }
    
    delete data.current_password;
    const updated_renter = await this.prisma.renter.update({
      where: { id: renter?.id },
      data
    });

    await this.prisma.$disconnect();
    return updated_renter;
  }
}

export default new UpdateRenter();