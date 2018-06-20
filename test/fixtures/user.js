const getRecord = (overrides = {}, qty = 1) => {
  const records = _.times(qty, () => {
    const {
      email = chance.email(),
      name = chance.name(),
      password = chance.string({ length: 10 }),
    } = overrides;
    return { email, name, password };
  });
  if (qty === 1) {return records[0];}
  return records;
};

module.exports = {
  getRecord
};
