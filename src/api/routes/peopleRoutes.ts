import express from 'express';
import * as peopleHandler from '../handlers/peopleHandler';
import { listAllPeople } from '../../controllers/peopleController';

const router = express.Router();

router.get('/:id', peopleHandler.getPerson);
router.post('/', peopleHandler.createPerson);
router.get('/all', listAllPeople); 


export default router;
