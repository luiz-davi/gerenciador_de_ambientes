import {User} from '@models/User';
import index_user from '@services/users/index';
import create_user from '@services/users/create';
import { create_user_validation } from '@controllers/validations/create_user.validation';

class UsersController {
	async index(req, res){
		const users = await index_user.call();

		return res.status(200).json(users)
	}

	async create(req, res){
		
		try {
			await create_user_validation.validate(req.body, { abortEarly: false });
	
			const user = await create_user.call(req.body);
			
			return res.status(201).json({
				message: 'Usuário criado com sucesso',
				user
			});

		} catch (error) {
			const errors = { name: error.name, message: error.message, errors: {} };
			
			console.log(error.inner);
			
			if(error.inner){
				error.inner.forEach(element => {
					errors.errors[element.path] = element.errors
				});
				
				return res.status(400).json(errors);
			}

			return res.status(400).json(error);
		}


	}
}

export default new UsersController();