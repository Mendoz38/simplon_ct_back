import express from 'express';
import bookController from '../controllers/book_controllers.js';
import constantController from '../controllers/constant_controllers.js';

const router = express.Router()

router.get('/constant', constantController.getConstant)

router.get('/', bookController.findAll)
router.post('/check', bookController.checkRDV)
router.post('/add', bookController.create)

export default router