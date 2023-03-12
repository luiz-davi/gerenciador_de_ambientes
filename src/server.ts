import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import '@controllers/users/users.controller';
import routers from './routes/index';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routers.user_routes);

app.listen(3333, () => {
	console.log('Servidor rodando na porta 3333 🚀');
});