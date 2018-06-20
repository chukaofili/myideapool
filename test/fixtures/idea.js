const getRecord = (overrides = {}, qty = 1) => {
  const records = _.times(qty, () => {
    const {
      content = chance.paragraph(),
      impact = chance.integer({ min: 1, max: 10 }),
      ease = chance.integer({ min: 1, max: 10 }),
      confidence = chance.integer({ min: 1, max: 10 }),
      user
    } = overrides;
    const average_score = _.mean([impact, ease, confidence]).toFixed(2); //eslint-disable-line
    return {
      content,
      impact,
      ease,
      confidence,
      average_score, //eslint-disable-line
      user
    };
  });
  if(qty === 1) {return records[0];}
  return records;
};

module.exports = {
  getRecord
};
