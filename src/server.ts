import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import '@controllers/users.controller';
import routers from './routes/index';
import swagger_ui from 'swagger-ui-express';
import swagger_config from './config/swagger.json';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/documentation', swagger_ui.serve, swagger_ui.setup(swagger_config));

app.use(routers.users);
app.use(routers.renters);
app.use(routers.environments);
app.use(routers.itens);
app.use(routers.general);

app.get('/email', (req, res) => {
	const transport = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD
		}
	});

	transport.sendMail({
		from: `Gerencial <${process.env.EMAIL}>`,
		to: 'rmdark2555@gmail.com',
		subject: 'Token de autenticação com o Gerencial',
		text: 'Olá, este é o seu tokn: isaugdhgsuasnijsga87634asjkbf37984yuwfjk'
	})
	.then((result) => {
		return res.status(200).json(result)
	})
	.catch((error) => {
		return res.status(500).json(error)
	});

	;
});

app.listen(3333, () => {
	console.log('Servidor rodando na porta 3333 🚀');
});