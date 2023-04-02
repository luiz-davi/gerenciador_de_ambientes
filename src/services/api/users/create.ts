import {BaseService} from '@services/api/base_service';
import bcrypt from 'bcrypt';
import upload from '@services/uploads/user';
import email from '@config/email_connection';
import jwt from 'jsonwebtoken';

class UserCreate extends BaseService{
  constructor(){
    super()
  }

  async call(data, file){
    delete data.confirm_password;
    delete data?.verified_email;

    data.password = await bcrypt.hash(data.password, 10);

    try {
      let user = await this.prisma.user.create({
        data,
        select: {
          id: true,
          first_name: true,
          last_name: true,
          surname: true,
          email: true,
          phone: true,
          verified_email: true,
          password: false,
          created_at: true,
          updated_at: false
        }
      })

      if(file){
        const avatar_url = await upload.call(file, user);
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: {
            avatar_url
          }
        });
      }

      email.sendMail({
        from: `Gerencial <${process.env.EMAIL}>`,
        to: user.email,
        subject: 'Token de autenticação com o Gerencial.',
        text: `Olá, ${user.surname || user.first_name}, bem vindo ao Gerencial.\nEste é o seu token de verificação: ${this.token(user.id)}\nAtenção: token válido por apenas 1hora`
      });

      return user;
    } catch (error) {      
      throw error;
    }

  }

  private token(id){
    return jwt.sign({ id }, process.env.JWT_PASS_EMAIL ?? 'email_pass',{ expiresIn: '1h' });
  }
  
}

export default new UserCreate();