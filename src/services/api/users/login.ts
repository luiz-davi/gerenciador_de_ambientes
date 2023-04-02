import { BaseService } from "@services/api/base_service";
import { BadRequestError, NotFoundError } from "@shared/errors";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UserLogin extends BaseService{
  async call(password, email){

    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if(!user){ 
      
      throw new BadRequestError('Email ou senha inválidos.') 
    }

    if(!await bcrypt.compare(password, user.password)){ 
      
      throw new BadRequestError('Email ou senha inválidos.') 
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '24h' });

    const {id, first_name, last_name, phone} = user;
    
    return {
      token,
      user: {
        id,
        first_name,
        last_name,
        email,
        phone
      }
    }
  }
}

export default new UserLogin();