import { query } from "express";
import { BaseService } from "../base_service";

class ListingEnvironments extends BaseService{
  constructor(){
    super()
    this.order_values = ['price', 'created_at'];
  }
  
  async call(user, queries){
    try{
      const pagination = await this.pagination(queries.page, queries.page_size);
      const search = await this.search(queries.search);
      const order = queries.ordering || [];
      const ordering = await this.ordering(Object.entries(order));
      const pool = await this.filters('pool', queries.pool);
      const grill = await this.filters('grill', queries.grill);
      const playground = await this.filters('playground', queries.playground);
      const kitchen = await this.filters('kitchen', queries.kitchen);
      
      const envs = await this.prisma.user.findUnique({
        where: { id: user.id },
        select: {
          environments: {
            ...{ 
              where: {
                ...pool,
                ...grill,
                ...playground,
                ...kitchen,
                ...search,
              }
            },
            ...ordering,
            ...pagination,
            ...{
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                pictures: true,
                created_at: true,
                itens: {
                  select: {
                    id: true,
                    name: true,
                    amount: true,
                    created_at: true
                  }
                }
              }
            }
          }
        }
      });
      return envs;
    } catch(erro){
      console.log(erro);
    }

  }

  private async search(search){

    if(!search || search.length === 0) { return {} };

    return {
      OR: [
        { name: { contains: search } },
        { description: { contains: search } }
      ]
    }
  };

}

export default new ListingEnvironments();