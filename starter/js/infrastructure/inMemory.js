
const { getUserOfId: createGetUserOfId } = require('../domain/user/getUserOfId');
const { saveUser: createSaveUser } = require('../domain/user/saveUser');

// return the userData stored at the userId provided
const getUserOfId = inMemoryDatabase => createGetUserOfId(userId => inMemoryDatabase[userId]);

// store the userState at it's respective userId
const saveUser = inMemoryDatabase => createSaveUser(userState => inMemoryDatabase[userState.id] = userState);

module.exports = {
  getUserOfId,
  saveUser,
};