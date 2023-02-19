import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import '@controllers/UsersController';

dotenv.config();

const app = express();

app.use(cors());

app.get('/', (req, res, next) => {
	res.status(200).json({message: 'here moda foca'});
});

app.listen(3333, () => {
	console.log('Servidor rodandor na porta 3333 🚀');
});
