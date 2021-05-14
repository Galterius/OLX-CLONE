const userService = require('../service/UserService');
const userMapper = require('../mappers/UserMapper');

exports.getCurrentUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await userService.getOneUser(id);
    const mappedResult = userMapper.userDataMapper(result);
    return res.status(200).json(mappedResult);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'User not found' });
  }
};

exports.updateCurrentUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  try {
    const result = await userService.updateOneUser(id, updatedUser);
    const mappedResult = userMapper.userDataMapper(result);
    return res.status(200).json(mappedResult);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'User not found' });
  }
};
