const { follow } = require('../domain/user/behaviors');

// validate inputs then attempt to process the following action
const followUseCaseHandler = ({ getUserOfId, saveUser }) => async ({ userId, followId }) => {
  if (typeof userId !== typeof '') {
    throw new Error('userId must be string'); 
  }
  else if (typeof followId !== typeof '') {
    throw new Error('userId must be string'); 
  }
  
  // ensure the followId points to a valid user
  const followData = await getUserOfId( followId );

  const userData = await getUserOfId( userId );
  const newUserData = follow({ userData, followId });
  await saveUser(newUserData);
}

module.exports = {
  followUseCaseHandler,
}