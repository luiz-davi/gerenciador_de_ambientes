import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import '@controllers/users.controller';
import routers from './routes/index';
import swagger_ui from 'swagger-ui-express';
import swagger_config from './config/swagger.json';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/documentation', swagger_ui.serve, swagger_ui.setup(swagger_config));

app.use(routers.users);
app.use(routers.renters);
app.use(routers.environments);

app.listen(3333, () => {
	console.log('Servidor rodando na porta 3333 🚀');
});