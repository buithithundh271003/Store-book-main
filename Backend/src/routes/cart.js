import express from 'express';
import { create, get, getAll, remove, update } from '../controllers/cart';

const router = express.Router();

router
    .post('/', create)
    .get('/:id', getAll)
    // .get('/:id', get)
    .patch('/:id', update)
    .delete('/:id', remove)

export default router;
