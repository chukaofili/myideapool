const getRecord = (overrides) => {
  const newObj = _.cloneDeep(overrides || {});

  return _.defaults(newObj, {
    content: chance.paragraph(),
    impact: chance.integer({ min: 1, max: 10 }),
    ease: chance.integer({ min: 1, max: 10 }),
    confidence: chance.integer({ min: 1, max: 10 }),
    user: undefined,
  });
};

module.exports = {
  getRecord
};
