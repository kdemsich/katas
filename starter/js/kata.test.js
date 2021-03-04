const { Kata } = require("./kata.js");
const { getUserOfId, saveUser } = require('./infrastructure/inMemory');

test("Publish 1 - Single user", async () => {
  const inMemoryDatabase = {
    user1: {
      id: 'user1',
      first: 'Alice',
      posts: [],
      follows: []
    }
  };

  const testKata = Kata({
    getUserOfId: getUserOfId(inMemoryDatabase),
    saveUser: saveUser(inMemoryDatabase),
  });

  await testKata.publish({ userId: 'user1', post: 'I love the weather today.', time: '1 minute ago' });

  expect(inMemoryDatabase.user1.posts).toMatchObject( [{ caption: 'I love the weather today.', timestamp: '1 minute ago' }] );

});

test("Publish 2 - Multiple users", async () => {
  const inMemoryDatabase = {
    user1: {
      id: 'user1',
      first: 'Alice',
      posts: [],
      follows: []
    },
    user2: {
      id: 'user2',
      first: 'Anna',
      posts: [],
      follows: []
    }
  };

  const testKata = Kata({
    getUserOfId: getUserOfId(inMemoryDatabase),
    saveUser: saveUser(inMemoryDatabase),
  });

  await testKata.publish({ userId: 'user1', post: 'I love the weather today.', time: '5 minute ago' });
  await testKata.publish({ userId: 'user2', post: 'I can post as well!', time: '10 minute ago' });
  await testKata.publish({ userId: 'user1', post: 'I can post again!', time: '3 minute ago' });
  await testKata.publish({ userId: 'user2', post: 'I can post as well!', time: '5 minute ago' });
  await testKata.publish({ userId: 'user1', post: 'I can post again!', time: '2 minute ago' });
  await testKata.publish({ userId: 'user2', post: 'I can post as well!', time: '3 minute ago' });

  expect(inMemoryDatabase.user1.posts).toMatchObject( [{ caption: 'I can post again!', timestamp: '2 minute ago'}, { caption: 'I can post again!', timestamp: '3 minute ago'}, { caption: 'I love the weather today.', timestamp: '5 minute ago' }] );
  expect(inMemoryDatabase.user2.posts).toMatchObject( [{ caption: 'I can post as well!', timestamp: '3 minute ago' }, { caption: 'I can post as well!', timestamp: '5 minute ago' }, { caption: 'I can post as well!', timestamp: '10 minute ago' }] );

});

test("Publish 3 - Proper post order", async () => {
  const inMemoryDatabase = {
    user1: {
      id: 'user1',
      first: 'Alice',
      posts: [],
      follows: []
    },
    user2: {
      id: 'user2',
      first: 'Anna',
      posts: [],
      follows: []
    }
  };

  const testKata = Kata({
    getUserOfId: getUserOfId(inMemoryDatabase),
    saveUser: saveUser(inMemoryDatabase),
  });

  await testKata.publish({ userId: 'user1', post: 'I love the weather today.', time: '5 minute ago' });
  await testKata.publish({ userId: 'user1', post: 'I can post again!', time: '4 minute ago' });
  await testKata.publish({ userId: 'user1', post: 'I can post again!', time: '3 minute ago' });
  await testKata.publish({ userId: 'user1', post: 'I can post again!', time: '2 minute ago' });
  await testKata.publish({ userId: 'user2', post: 'I can post as well!', time: '3 minute ago' });
  await testKata.publish({ userId: 'user2', post: 'I can make another post!', time: '4 minute ago' });

  expect(inMemoryDatabase.user1.posts).toMatchObject( [{ caption: 'I can post again!', timestamp: '2 minute ago'}, { caption: 'I can post again!', timestamp: '3 minute ago'}, { caption: 'I can post again!', timestamp: '4 minute ago'}, { caption: 'I love the weather today.', timestamp: '5 minute ago' }] );
  expect(inMemoryDatabase.user2.posts).toMatchObject( [{ caption: "I can make another post!", timestamp: '4 minute ago' }, { caption: 'I can post as well!', timestamp: '3 minute ago' }] );

});

test("Publish 4 - Invalid userId", async () => {
  const inMemoryDatabase = {
    user1: {
      id: 'user1',
      first: 'Alice',
      posts: [],
      follows: []
    },
  };

  const testKata = Kata({
    getUserOfId: getUserOfId(inMemoryDatabase),
    saveUser: saveUser(inMemoryDatabase),
  });

  let nonexistentUser;
  try {
    nonexistentUser = await testKata.publish({ userId: 'user2', post: 'I can not post!', time: '10 minute ago' });
  }
  catch(err) {
    expect(nonexistentUser).toBe(undefined)
  }

});

test("ViewTimeline 1 - View own timeline", async () => {
  const inMemoryDatabase = {
    user1: {
      id: 'user1',
      first: 'Alice',
      posts: [ { caption: 'I love the weather today.', timestamp: '1 minute ago' } ],
      follows: []
    },
  };

  const testKata = Kata({
    getUserOfId: getUserOfId(inMemoryDatabase),
    saveUser: saveUser(inMemoryDatabase),
  });

  const posts = await testKata.viewTimeline({ viewerId: 'user1', viewingId: 'user1' });

  expect(posts).toMatchObject( [{ caption: 'I love the weather today.', timestamp: '1 minute ago' }] );

});

test("ViewTimeline 2 - View other's timeline", async () => {
  const inMemoryDatabase = {
    user1: {
      id: 'user1',
      first: 'Alice',
      posts: [ { caption: 'I love the weather today.', timestamp: '1 minute ago' } ],
      follows: []
    },
    user2: {
      id: 'user2',
      first: 'Bob',
      posts: [ { caption: 'Good game though.', timestamp: '1 minute ago' }, { caption: 'Darn! We lost!', timestamp: '2 minute ago' } ],
      follows: []
    }
  };

  const testKata = Kata({
    getUserOfId: getUserOfId(inMemoryDatabase),
    saveUser: saveUser(inMemoryDatabase),
  });

  const posts = await testKata.viewTimeline({ viewerId: 'user1', viewingId: 'user2' });

  expect(posts).toMatchObject( [{ caption: 'Good game though.', timestamp: '1 minute ago' }, { caption: 'Darn! We lost!', timestamp: '2 minute ago' }] );

});

test("Publish & ViewTimeline Integration 1 - Publish then view own timeline", async () => {
  const inMemoryDatabase = {
    user1: {
      id: 'user1',
      first: 'Alice',
      posts:  [],
      follows: []
    }
  };

  const testKata = Kata({
    getUserOfId: getUserOfId(inMemoryDatabase),
    saveUser: saveUser(inMemoryDatabase),
  });

  await testKata.publish({ userId: 'user1', post: 'I love the weather today.', time: '1 minute ago' });

  const posts = await testKata.viewTimeline({ viewerId: 'user1', viewingId: 'user1' });

  expect(posts).toMatchObject( [{ caption: 'I love the weather today.', timestamp: '1 minute ago' }] );

});

test("Publish & ViewTimeline Integration 2 - Publish then view other timeline", async () => {
  const inMemoryDatabase = {
    user1: {
      id: 'user1',
      first: 'Alice',
      posts:  [],
      follows: []
    },
    user2: {
      id: 'user2',
      first: 'Bob',
      posts: [],
      follows: []
    }
  };

  const testKata = Kata({
    getUserOfId: getUserOfId(inMemoryDatabase),
    saveUser: saveUser(inMemoryDatabase),
  });

  await testKata.publish({ userId: 'user1', post: 'I love the weather today.', time: '1 minute ago' });
  await testKata.publish({ userId: 'user2', post: 'Darn! We lost!', time: '2 minute ago' });
  await testKata.publish({ userId: 'user2', post: 'Good game though.', time: '1 minute ago' });

  const posts = await testKata.viewTimeline({ viewerId: 'user1', viewingId: 'user2' });

  expect(posts).toMatchObject( [{ caption: 'Good game though.', timestamp: '1 minute ago' }, { caption: 'Darn! We lost!', timestamp: '2 minute ago' }] );

});

test("Follow 1 - Follow other user", async () => {
  const inMemoryDatabase = {
    user1: {
      id: 'user1',
      first: 'Alice',
      posts:  [],
      follows: []
    },
    user2: {
      id: 'user2',
      first: 'Bob',
      posts: [],
      follows: []
    }
  };

  const testKata = Kata({
    getUserOfId: getUserOfId(inMemoryDatabase),
    saveUser: saveUser(inMemoryDatabase),
  });

  await testKata.follow({ userId: 'user1', followId: 'user2' });

  expect(inMemoryDatabase.user1.follows).toMatchObject( ['user2'] );

});

test("Follow 2 - Follow invalid userId", async () => {
  const inMemoryDatabase = {
    user1: {
      id: 'user1',
      first: 'Alice',
      posts:  [],
      follows: []
    },
    user2: {
      id: 'user2',
      first: 'Bob',
      posts: [],
      follows: []
    }
  };

  const testKata = Kata({
    getUserOfId: getUserOfId(inMemoryDatabase),
    saveUser: saveUser(inMemoryDatabase),
  });

  try {
    await testKata.follow({ userId: 'user1', followId: 'user3' });
  }
  catch(err) {
    expect(inMemoryDatabase.user1.follows).toMatchObject( [] );
  }

});