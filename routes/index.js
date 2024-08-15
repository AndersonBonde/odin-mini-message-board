const { Router } = require('express');
const router = Router();
const db = require('../database/queries');

router.get('/', async (req, res) => {
  const messages = await db.getAllMessages();

  res.render('index', { title: 'Mini Message Board', messages: messages, });
});

router.get('/new', (req, res, next) => {
  res.render('form');
});

router.post('/new', (req, res, next) => {
  const { name, message } = req.body;
  messages.push({ text: message, user: name, added: new Date() });
  res.redirect('/');
});

module.exports = router;
