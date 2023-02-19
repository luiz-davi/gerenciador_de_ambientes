import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'here moda foca' }); 
})

app.listen(3333, () => console.log("Servidor rodandor na porta 3333 🚀"));