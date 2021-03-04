const { publish } = require('../domain/user/behaviors');

// validate inputs then attempt to process the post publish action
const publishUseCaseHandler = ({ getUserOfId, saveUser }) => async ({ userId, post, time }) => {
  if (typeof userId !== typeof '') {
    throw new Error('userId must be string'); 
  }

  const userData = await getUserOfId( userId );
  const newUserData = publish({ userData, post, time });
  await saveUser(newUserData);
}

module.exports = {
  publishUseCaseHandler,
}