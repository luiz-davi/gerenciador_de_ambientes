import services from '@services/api/users';
import validations from '@shared/validations/users';
import { Request, Response } from 'express';

class UsersController {
	
	async create(req, res){
		
		try {
		
			await validations.create.validate(req.body, { abortEarly: false });
	
			const user = await services.create.call(req.body, req.file);

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
			await validations.update.validate(req.body, { abortEarly: false });
	
			const user = await services.update.call(req.body, req.user, req.file);
			
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
			await validations.destroy.validate(req.body, { abortEarly: false });
			const result = await services.destroy.call(req.body.password, req.user);
			
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
			await validations.login.validate(req.body, { abortEarly: false });
			const result = await services.login.call(req.body.password, req.body.email);
			
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

	async check_token(req: Request, res: Response){
		
	}
}

export default new UsersController();