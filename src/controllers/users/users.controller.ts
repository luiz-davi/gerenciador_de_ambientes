import {User} from '@models/User';
import show_user from '@services/users/show';
import create_user from '@services/users/create';
import update_user from '@services/users/update';
import delete_user from '@services/users/delete';
import login from '@services/users/login';
import { create_user_validation } from '@shared/validations/create_user.validation';
import { update_user_validation } from '@shared/validations/update_user.validation';
import { delete_user_validation } from '@shared/validations/delete_user.validation';
import { login_validation } from '@shared/validations/login.validation';
import { Request, Response } from 'express';

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
			
			const user = req.user;
			
			if(!user){
				return res.status(400).json({ 
					name: 'Record not found.',
					message: 'Usuário não encontrado.',
					errors: {
						id: 'Id de usuário inválido.'
					}
				});
			}
			
			delete user.password;
			return res.status(200).json(user)
		} catch (error) {
			return res.status(500).json(error)
		}
	}

	async update(req, res){
		try {
			await update_user_validation.validate(req.body, { abortEarly: false });
	
			const user = await update_user.call(req.body, req.user);
			
			return res.status(200).json(user);
		} catch (error) {	

			const errors = { name: error.name, message: error.message, errors: {} };
				
			if(error.inner){
				error.inner.forEach(element => {
					errors.errors[element.path] = element.errors
				});
				
				return res.status(400).json(errors);
			}

			return res.status(error.status_code).json({ error: { message: error.message } });
		}

	}

	async destroy(req, res){
		try {
			await delete_user_validation.validate(req.body, { abortEarly: false });
			const result = await delete_user.call(req.body.password, req.user);
			
			return result;
		} catch (error) {
			if(error.status_code){
				return res.status(error.status_code).json({ error: {message: error.message} });
			}

			const errors = { name: error.name, message: error.message, errors: {} };
				
			error.inner.forEach(element => {
				errors.errors[element.path] = element.errors
			});
			
			return res.status(400).json(errors);

		}
	}

	async login(req: Request, res: Response){
		try {
			await login_validation.validate(req.body, { abortEarly: false });
			const result = await login.call(req.body.password, req.body.email);
			
			return res.status(200).json(result);
		} catch (error) {
			if(error.status_code){
				return res.status(error.status_code).json({ error: {message: error.message} });
			}

			const errors = { name: error.name, message: error.message, errors: {} };
				
			error.inner.forEach(element => {
				errors.errors[element.path] = element.errors
			});
			
			return res.status(400).json(errors);

		}
	}
}

export default new UsersController();