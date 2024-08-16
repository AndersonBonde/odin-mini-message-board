const db = require('../database/queries');

const messagesListGet = async (req, res) => {
  const messages = await db.getAllMessages();

  res.render('index', { title: 'Mini Message Board', messages: messages, });
};

const messageCreateGet = (req, res) => {
  res.render('form');
};

const messageCreatePost = async (req, res) => {
  const { name: username, message } = req.body;

  await db.insertMessage(username, message);

  res.redirect('/');
};

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
