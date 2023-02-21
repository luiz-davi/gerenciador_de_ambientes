import {User} from '@models/User';
import show_user from '@services/users/show';
import create_user from '@services/users/create';
import update_user from '@services/users/update';
import { create_user_validation } from '@shared/validations/create_user.validation';
import { update_user_validation } from '@shared/validations/update_user.validation';

class UsersController {
	
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
				
			if(error.inner){
				error.inner.forEach(element => {
					errors.errors[element.path] = element.errors
				});
				
				return res.status(400).json(errors);
			}

			return res.status(500).json(error);
		}
	}

	async show(req, res){
		try {
			const user = await show_user.call(Number(req.params.id));
			
			if(!user){
				return res.status(400).json({ 
					name: 'Record not found.',
					message: 'Usuário não encontrado.',
					errors: {
						id: 'Id de usuário inválido.'
					}
				});
			}

			return res.status(200).json(user)
		} catch (error) {
			return res.status(500).json(error)
		}
	}

	async update(req, res){
		try {
			await update_user_validation.validate(req.body, { abortEarly: false });
	
			const user = await update_user.call(req.body, Number(req.params.id));
			
			return res.status(200).json(user);
		} catch (error) {	

			const errors = { name: error.name, message: error.message, errors: {} };
				
			if(error.inner){
				error.inner.forEach(element => {
					errors.errors[element.path] = element.errors
				});
				
				return res.status(400).json(errors);
			}

			return res.status(500).json(error);
		}

	}
}

export default new UsersController();