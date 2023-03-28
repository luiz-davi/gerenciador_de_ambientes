import { PrismaClient } from "@prisma/client";
import prisma from "@config/prisma_connection"

export class BaseService {
  prisma: PrismaClient;
  order_values: Array<String>
  
  constructor(order_values=[]){
    this.prisma = prisma;
    this.order_values = order_values;
  }

  async pagination(page= 0, page_size = 30){
    page = Number(page);
    page_size = Number(page_size);

    const offset = (page <= 1 ? 0 : ((page - 1) * page_size));
    
    return {
      skip: offset,
      take: page_size
    };
  }

  async search(search){

    if(!search || search.length === 0) { return {} };

    return {
      OR: [
        { name: { contains: search } },
        { description: { contains: search } }
      ]
    }
  };

  async ordering(ordering){
    if(!ordering || ordering.length === 0) { return {
      orderBy: [
        { created_at: 'desc' }
      ]
    } };

    const orderBy: any[] = [];
    
    let order
    ordering.forEach( value => {
      order = {};
      if(this.order_values.includes(value[1])) { 
        order[`${value[1]}`] = 'desc';
        orderBy.push(order);
      }
    });

    return { orderBy };
  }

  async filters(key, value){
    if(!value) return {};

    const filter = {};
    switch (value.toLowerCase()) {
      case 'true':
        filter[`${key}`] = true;
        break;
      case 'false':
        filter[`${key}`] = false;
        break;
      default:
        filter[`${key}`] = false;
        break;
    }


    return filter;
  }
}