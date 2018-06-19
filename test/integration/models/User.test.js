const provider = require('../../fixtures/user');
const thisModel = 'user';

describe('User (model)', () => {
  const createRecord = async (thisNewRecord) => {
    return await sails.models[thisModel].create(thisNewRecord).fetch();
  };

  const clearDb = async () => {
    return await sails.models[thisModel].destroy({});
  };

  afterEach(clearDb);

  describe('#create()', () => {
    it('should create record', async () => {
      const newRecord = provider.getRecord();
      const createdRecord = await sails.models[thisModel].create(newRecord).fetch();
      createdRecord.should.have.property('email', newRecord.email);
    });
  });
  describe('#find()', () => {
    it('should find records', async () => {
      await createRecord(provider.getRecord());
      const records = await sails.models[thisModel].find();
      records.length.should.not.be.eql(0);
    });
  });
  describe('#findOne()', () => {
    it('should find one record', async () => {
      const newRecord = await createRecord(provider.getRecord());
      const record = await sails.models[thisModel].findOne({ email: newRecord.email });
      should.exist(record);
    });
  });
  describe('#update()', () => {
    it('should update record', async () => {
      const newRecord = await createRecord(provider.getRecord());
      const name = chance.name();
      const updateRecord = await sails.models[thisModel].update({ email: newRecord.email }, { name }).fetch();
      updateRecord[0].should.have.property('name', name);
    });
    it('should test password hashing', async () => {
      const newRecord = provider.getRecord();
      const newRecordCopy = _.clone(newRecord);
      const record = await createRecord(newRecord);
      await sails.helpers.passwords.checkPassword(newRecordCopy.password, record.password);
    });
  });
  describe('#delete()', () => {
    it('should destroy record', async () => {
      const newRecord = await createRecord(provider.getRecord());
      await sails.models[thisModel].destroy({id: newRecord.id});
    });
  });
});
