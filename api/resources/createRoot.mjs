const createRoot = (...args) => {
  const createdRoot = {};

  for (let i = 0; i < args.length; i++) {
    const resolvers = args[i];

    let resolversKeys = Object.keys(resolvers);

    for (let i = 0; i < resolversKeys.length; i++) {
      let resolverKey = resolversKeys[i];
      createdRoot[resolverKey] = resolvers[resolverKey];
    }
  }

  return createdRoot;
};

export default createRoot;
