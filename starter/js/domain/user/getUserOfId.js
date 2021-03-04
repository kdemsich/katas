const { UserData } = require('./data');

// attempt return the userData stored at the userId provided
const getUserOfId = (getUserOfIdImpl = async (userId) => { throw new Error(`Can't retrieved User of id ${userId} : missing implementation`) }) => async userId => {
  try {
    const userData = await getUserOfIdImpl(userId);
    return UserData(userData);
  } catch (err) {
    throw new Error(`Unable to retrieve User with id ${userId}`);
  }
}

module.exports = {
  getUserOfId,
}