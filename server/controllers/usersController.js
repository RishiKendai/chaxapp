const User = require('../model/userModel');
const bcryptjs = require('bcryptjs');

module.exports.register = async (req, res, next) => {
  try {
    const { username, mobileNumber, password } = req.body;
    const hasUsername = await User.findOne({ username });
    if (hasUsername)
      return res.json({
        msg: 'username already exists.',
        status: false,
      });
    const hasMobileNumber = await User.findOne({ mobileNumber });
    if (hasMobileNumber)
      return res.json({
        msg: 'mobileNumber already exists.',
        status: false,
      });
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      username,
      mobileNumber,
      password: hashedPassword,
    });
    delete user.password;
    return res.status(201).json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

// Login
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const users = await User.findOne({ username });
    if (!users) {
      return res.json({
        msg: 'Incorrect username or password',
        status: false,
      });
    }
    const isdecryptedPassword = await bcryptjs.compare(
      password,
      users.password
    );
    if (!isdecryptedPassword)
      return res.json({
        msg: 'Incorrect username or password',
        status: false,
      });
    delete users.password;
    return res.status(200).json({ status: true, users });
  } catch (err) {
    next(err);
  }
};

// SetProfile
module.exports.setProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const profileImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isProfileImageSet: true,
      profileImage,
    },{new:true});
    return res.status(200).json({
      isSet: userData.isProfileImageSet,
      image: userData.profileImage,
    });
  } catch (ex) {
    next(ex);
  }
};

//  get ALl Users
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'username',
      'mobileNumber',
      'profileImage',
      '_id',
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
