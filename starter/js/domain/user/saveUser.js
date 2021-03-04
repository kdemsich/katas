// const { UserData } = require('./data');

// attempt to save the userData with the provided userState
const saveUser = (saveUserImpl = async (userState) => { throw new Error(`Can't save User of id ${userState.userId} : missing implementation`) }) => async userState => {
  try {
    const savedUser = await saveUserImpl(userState);
    return savedUser;
  } catch (err) {
    throw new Error(`Unable to save User with id ${userState.userId}`);
  }
}

module.exports = {
  saveUser,
}