const { viewTimeline } = require('../domain/user/behaviors');

// validate inputs then attempt to process the view timeline action
const viewTimelineUseCaseHandler = ({ getUserOfId }) => async ({ viewerId, viewingId }) => {
  if (typeof viewerId !== typeof '') {
    throw new Error('viewerId must be string'); 
  }
  if (typeof viewingId !== typeof '') {
    throw new Error('viewingId must be string'); 
  }

  const userData = await getUserOfId( viewingId );
  const posts = viewTimeline({ userData, viewerId });
  return posts;
}

module.exports = {
  viewTimelineUseCaseHandler,
}