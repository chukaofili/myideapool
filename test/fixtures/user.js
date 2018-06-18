const getRecord = (overrides) => {
  const newObj = _.cloneDeep(overrides || {});

  return _.defaults(newObj, {
    email: chance.email(),
    name: chance.name(),
    password: chance.string({ length: 10 }),
  });
};

module.exports = {
  getRecord
};
