// import Item from '../model/testModel';
const Item = require('../model/testModel');

module.exports.fetchImage = async (req, res) => {
  try {
    let id = '62e9001e09198160ac5fe0f4';
    const item = await Item.find({});
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.createItem = async (req, res) => {
  console.log('createitem', req.body);
  console.log('hie');
  const { title, image } = req.body;
  // const item = new Item(req.body);
  try {
    const it = await Item.create({ title, image });

    res.status(201).json(it);
  } catch (error) {
    console.log(error);
  }
};
