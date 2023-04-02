import { BaseService } from "../base_service";
import email from '@config/email_connection';
import jwt from 'jsonwebtoken';

class SendEmailService extends BaseService {
  async call(user){
    if(user.verified_email){
      return {
        result: false,
        message: 'Seu email já está verificado.'
      }
    }

    try {
      await email.sendMail({
        from: `Gerencial <${process.env.EMAIL}>`,
        to: user.email,
        subject: 'Token de autenticação com o Gerencial.',
        text: `Olá, ${user.surname || user.first_name}, bem vindo ao Gerencial.\nEste é o seu token de verificação: ${this.token(user.id)}\nAtenção: token válido por apenas 1hora`
      });

      return true;
    } catch (error) {
      throw error;
    }
  }

  private token(id){
    return jwt.sign({ id }, process.env.JWT_PASS_EMAIL ?? 'email_pass',{ expiresIn: '1h' });
  }
}

export default new SendEmailService();