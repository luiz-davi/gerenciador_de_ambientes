import { NotFoundError, UnauthrizedError } from "@shared/errors";
import { BaseService } from "../base_service";
import jwt from 'jsonwebtoken';

type JwtPayLoad = {
  id: number
}

class CheckTokenService extends BaseService {
  async call(user, token){
    if(user.verified_email){
      return {
        result: false,
        message: 'Seu email já está verificado.'
      }
    }

    let token_user;
    try {
      const { id } = jwt.verify(token, process.env.JWT_PASS_EMAIL ?? 'email_pass') as JwtPayLoad;
  
      token_user = await this.prisma.user.findFirstOrThrow({
        where: { id }
      });
      
    } catch (error) {      
      throw new NotFoundError(error.message);
    }

    if(user.id != token_user.id) {
      throw new UnauthrizedError('Esse não é o token que chegou no seu email.');
    }
    
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        verified_email: true
      }
    });

    return true;

  }
}

export default new CheckTokenService();