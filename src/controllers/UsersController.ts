import {User} from '@models/User';
import index_user from '@services/users/index'
import { create_user_validation } from 'src/validations/create_user.validation';

class UsersController {
	async index(req, res){
		const users = await index_user.call();

		return res.status(200).json(users)
	}

	async create(req, res){
		await create_user_validation.validate(req.body, { abortEarly: false });

		return res.status(200).json({ message: 'here moda foca'});
	}
}

export default new UsersController();