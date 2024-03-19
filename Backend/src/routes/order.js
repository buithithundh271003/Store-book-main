import express from 'express';
import { create, get, getAll, update } from '../controllers/order';

const router = express.Router();

router
    .post('/', create)
    .get('/', getAll)
    .get('/:id', get)
    .patch('/:id', update)

export default router;
