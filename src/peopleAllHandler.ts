// peopleAllHandler.ts
import serverless from 'serverless-http';
import express from 'express';
import { listAllPeople } from './controllers/peopleController'; 

const app = express();
app.use(express.json());


app.get('/all', listAllPeople);


app.use((req, res) => {
  res.status(404).send('No Encontrado')});

export const listAllPeopleHandler = serverless(app);
