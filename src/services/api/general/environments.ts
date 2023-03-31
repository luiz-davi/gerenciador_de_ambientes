import { BaseService } from "../base_service";

class EnvironmentsGeneralService extends BaseService{
  async call(queries){
    try{
      const pagination = await this.pagination(queries.page, queries.page_size);
      const search = await this.search(queries.search);
      const order = queries.ordering || [];
      const ordering = await this.ordering(Object.entries(order));
      const pool = await this.filters('pool', queries.pool);
      const grill = await this.filters('grill', queries.grill);
      const playground = await this.filters('playground', queries.playground);
      const kitchen = await this.filters('kitchen', queries.kitchen);
      
      const envs = await this.prisma.environment.findMany({
        where: {
          ...pool,
          ...grill,
          ...playground,
          ...kitchen,
          ...search,
          ...{
            public: true
          }
        },
        ...ordering,
        ...pagination,
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          pictures: true,
          created_at: true,
          locator: {
            select: {
              id: true,
              last_name: true,
              first_name: true,
              avatar_url: true,
              email: true,
              phone: true,
              created_at: true 
            }
          },
          itens: {
            select: {
              id: true,
              name: true,
              amount: true,
              created_at: true
            }
          }
        }
      });
      return envs;
    } catch(erro){
      console.log(erro);
    }
  }
}

export default new EnvironmentsGeneralService();