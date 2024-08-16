const { body, validationResult } = require('express-validator');
const db = require('../database/queries');

const lengthErr = 'must not be empty';

const validateMessage = [
  body('name').trim()
    .isLength({ min: 1 }).withMessage(`Name ${lengthErr}`),
  body('message').trim()
    .isLength({ min: 1 }).withMessage(`Message ${lengthErr}`),
];

const messagesListGet = async (req, res) => {
  const messages = await db.getAllMessages();

  res.render('index', { title: 'Mini Message Board', messages: messages, });
};

const messageCreateGet = (req, res) => {
  res.render('form', { title: 'New Message' });
};

const messageCreatePost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { name, message } = req.body;

      return res.status(400).render('form', {
        name,
        message,
        title: 'New Message',
        errors: errors.array(),
      });
    }

    const { name: username, message } = req.body;  
    await db.insertMessage(username, message);
  
    res.redirect('/');
  }
]

const messageDeletePost = async (req, res) => {
  await db.deleteMessage(req.params.id);

  res.redirect('/');
};

module.exports = {
  messagesListGet,
  messageCreateGet,
  messageCreatePost,
  messageDeletePost,
}
