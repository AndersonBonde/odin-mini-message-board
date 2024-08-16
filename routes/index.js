const { Router } = require('express');
const router = Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.messagesListGet);
router.get('/new', indexController.messageCreateGet);
router.post('/new', indexController.messageCreatePost);
router.post('/:id/delete', indexController.messageDeletePost);

module.exports = router;
