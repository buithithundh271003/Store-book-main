import express from 'express';
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/category';

const router = express.Router();

router
    .post('/', addCategory)
    .get('/', getCategories)
    .get('/:id', getCategory)
    .patch('/:id', updateCategory)
    .delete('/:id', deleteCategory)


export default router;