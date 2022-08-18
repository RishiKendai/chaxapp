const { fetchImage } = require('../controllers/testController');
const {
  register,
  login,
  setProfile,
  getAllUsers,
} = require('../controllers/usersController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setProfile/:id', setProfile);
router.get('/allusers/:id', getAllUsers);
// router.get('/fetchImage', fetchImage);

module.exports = router;
