const messageModel = require('../model/messageModel');

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message, dateSent, timeSent } = req.body;
    const data = await messageModel.create({
      message: { text: message, dateSent: dateSent, timeSent: timeSent },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: 'Msg added successfully...' });
    return res.json({ msg: 'failed to add msg to db...' });
  } catch (ex) {
    next(ex);
  }
};
module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    const projectMessages = messages.map((msg, index) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        dateSent: msg.message.dateSent,
        timeSent: msg.message.timeSent,
      };
    });
    res.json(projectMessages);
  } catch (ex) {
    next(ex);
  }
};
