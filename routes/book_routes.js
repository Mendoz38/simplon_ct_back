import express from 'express';
import bookController from '../controllers/book_controllers.js';

const router = express.Router()

router.get('/', bookController.findAll)
router.get('/check', bookController.findByHour)
router.post('/add', bookController.create)

export default router