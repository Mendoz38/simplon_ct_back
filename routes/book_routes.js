import express from 'express';
const router = express.Router()

import bookController from '../controllers/book_controllers.js';

router.get('/', bookController.findAll)
router.get('/:id', bookController.findById)
router.post('/add', bookController.create)

export default router