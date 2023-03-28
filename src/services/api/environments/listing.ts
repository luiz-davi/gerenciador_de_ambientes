import { BaseService } from "../base_service";
const ORDER_VALUES = ['price', 'created_at']

class ListingEnvironments extends BaseService{
  async call(user, queries){
    try{
      const pagination = await this.pagination(queries.page, queries.page_size);
      const search = await this.search(queries.search);
      const ordering = await this.ordering(Object.entries(queries.ordering));
      
      const envs = await this.prisma.user.findUnique({
        where: { id: user.id },
        select: {
          environments: {
            ...search,
            ...ordering,
            ...pagination,
            ...{
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                pictures: true,
                itens: {
                  select: {
                    id: true,
                    name: true,
                    amount: true
                  }
                }
              }
            }
          }
        }
      });
      return envs;
    } catch(erro){
      console.log(erro)
    }

  }

  private async pagination(page= 0, page_size = 30){
    page = Number(page);
    page_size = Number(page_size);

    const offset = (page <= 1 ? 0 : ((page - 1) * page_size));
    
    return {
      skip: offset,
      take: page_size
    };
  }

  private async search(search){

    if(!search || search.length === 0) { return {} };

    return {
      where: {
        OR: [
          { name: { contains: search } }
        ]
      }
    };
  }

  private async ordering(ordering){
    if(!ordering || ordering.length === 0) { return {} };

    const orderBy: any[] = [];
    
    let order
    ordering.forEach( value => {
      order = {};
      if(ORDER_VALUES.includes(value[1])) { 
        order[`${value[1]}`] = 'desc';
        orderBy.push(order);
      }
    });

    return { orderBy };
  }
}

export default new ListingEnvironments();