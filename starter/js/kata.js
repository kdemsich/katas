const { publishUseCaseHandler } = require('./application/publishUseCaseHandler');
const { viewTimelineUseCaseHandler } = require('./application/viewTimelineUseCaseHandler');
const { followUseCaseHandler } = require('./application/followUseCaseHandler');

const Kata = ({ getUserOfId, saveUser }) => ({
  publish: publishUseCaseHandler({ getUserOfId, saveUser }),
  viewTimeline: viewTimelineUseCaseHandler({ getUserOfId }),
  follow: followUseCaseHandler({ getUserOfId, saveUser }),
});

module.exports = {
  Kata,
}
