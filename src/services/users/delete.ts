import {BaseService} from '@services/base_service';

class UserDelete extends BaseService{
  constructor(){
    super()
  }

  async call(id){
    let user = await this.prisma.user.findUnique({
      where: { id }
    });

    console.log(user);
    

    if(!user){
      throw {
        name: 'Record not found.',
        message: `Usuário com id ${id} não foi encontrado`
      }
    }

    try {
      const user = await this.prisma.user.delete({
        where: { id }
      });
  
      return user;
    } catch (error) {
      throw {
        name: 'Data base error',
        error 
      };
    }
  }
}

export default new UserDelete();