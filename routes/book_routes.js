import express from 'express';
import bookController from '../controllers/book_controllers.js';

const router = express.Router()

router.get('/', bookController.findAll)
router.post('/check', bookController.checkRDV)
router.post('/add', bookController.create)

export default router