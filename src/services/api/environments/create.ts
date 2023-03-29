import { BaseService } from "@services/api/base_service";
import upload from '@services/uploads/environments';

class CreateEnvironment extends BaseService{

  async call(data, files, user){
    let pictures: any[] = []
    if(files.length > 0){
      pictures = await upload.call(files, user, data.name);
    }

    data = JSON.parse(JSON.stringify(data));
    
    data.itens.forEach((value, index) => {
      value.amount = Number(value.amount);
      data.itens[index] = JSON.parse(JSON.stringify(value));
    });
    
    try {
      const environment = await this.prisma.environment.create({
        data: {
          name: data.name,
          price: Number(data.price),
          description: data.description,
          locator_id: user.id,
          pictures,
          public: data.public,
          pool: data.pool,
          grill: data.grill,
          kitchen: data.kitchen,
          playground: data.playground,
          itens: {
            create: data.itens
          }
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          public: true,
          pictures: true,
          pool: true,
          grill: true,
          kitchen: true,
          playground: true,
          created_at: true,
          itens: {
            select: {
              id: true,
              name: true,
              amount: true
            }
          }
        }
      });
  
      await this.prisma.$disconnect();
      return environment;

    } catch (error) {

      await this.prisma.$disconnect(); 
      throw {
        name: 'Data base error',
        error 
      };
    }
  }
}

export default new CreateEnvironment();