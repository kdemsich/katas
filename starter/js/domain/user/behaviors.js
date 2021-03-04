const { UserData } = require('./data'); 

// returns a new user state comprised of a new post list
const publish = ({ userData, post, time }) => {
    // validate input
    if (typeof post !== typeof '') {
        throw new Error('post caption should be a valid string'); 
    }
    else if (typeof time !== typeof '') {
        throw new Error('post timestamp should be a valid string'); 
    }

    // construct a new immutable user state with the new post stored
    return UserData({
        ...userData,
        posts: [{ caption: post, timestamp: time }, ...userData.posts],
    });
}

// returns a list of a users posts
const viewTimeline = ({ userData, viewerId }) => {
    return userData.posts;
}

// returns a new user state comprised of a new follows list
const follow = ({ userData, followId }) => {
    // validate input
    if (typeof followId !== typeof '') {
        throw new Error('followId should be a valid string'); 
    }

    // construct a new immutable user state with the new post stored
    return UserData({
        ...userData,
        follows: [...userData.follows, followId],
    });
}

module.exports = {
    publish, 
    viewTimeline,
    follow,
}