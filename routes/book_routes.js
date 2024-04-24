import express from 'express';
import bookController from '../controllers/book_controllers.js';
import constantController from '../controllers/constant_controllers.js';

const router = express.Router()


router.get('/', bookController.findAll)
/**
 * @swagger
 * /api/v1/book:
 *   get:
 *     summary: Les constantes 
 *     description: Toutes les constantes pour faire fonctionner l'application
 *     responses:
 *       200:
 *         description: Succès de la requête. Retourne les constantes.
 *       404:
 *         description: Erreur.
 */
router.get('/constant', constantController.getConstant)
router.post('/check', bookController.checkRDV)
router.post('/add', bookController.create)

export default router