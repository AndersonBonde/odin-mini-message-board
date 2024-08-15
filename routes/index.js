const { Router } = require('express');
const router = Router();
const db = require('../database/queries');

router.get('/', async (req, res) => {
  const messages = await db.getAllMessages();

  res.render('index', { title: 'Mini Message Board', messages: messages, });
});

router.get('/new', (req, res) => {
  res.render('form');
});

router.post('/new', async (req, res) => {
  const { name: username, message } = req.body;

  await db.insertMessage(username, message);

  res.redirect('/');
});

router.post('/:id/delete', async (req, res) => {
  await db.deleteMessage(req.params.id);

  res.redirect('/');
});

module.exports = router;
