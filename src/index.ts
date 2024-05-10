import express from 'express';
import serverless from 'serverless-http';
import peopleRoutes from './api/routes/peopleRoutes';


const app = express();
app.use(express.json());

app.use('/people', peopleRoutes);

app.use((req, res) => {
  res.status(404).send('No Encontrado');
});

module.exports.handler = serverless(app);
