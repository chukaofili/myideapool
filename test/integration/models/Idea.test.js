const provider = require('../../fixtures/idea');
const userProvider = require('../../fixtures/user');
const thisModel = 'idea';

describe('Idea (model)', () => {
  const createRecord = async (model, thisNewRecord) => {
    return await sails.models[model].create(thisNewRecord).fetch();
  };

  const clearDb = async () => {
    return await sails.models[thisModel].destroy({});
  };

  afterEach(clearDb);

  describe('#create()', () => {
    it('should create record', async () => {
      const user = await createRecord('user', userProvider.getRecord());
      const newRecord = provider.getRecord({user: user.id});
      const createdRecord = await sails.models[thisModel].create(newRecord).fetch();
      createdRecord.should.have.property('content', newRecord.content);
    });
  });
  describe('#find()', () => {
    it('should find records', async () => {
      const user = await createRecord('user', userProvider.getRecord());
      await createRecord(thisModel, provider.getRecord({ user: user.id }));
      const records = await sails.models[thisModel].find();
      records.length.should.not.be.eql(0);
    });
  });
  describe('#findOne()', () => {
    it('should find one record', async () => {
      const user = await createRecord('user', userProvider.getRecord());
      const newRecord = await createRecord(thisModel, provider.getRecord({ user: user.id }));
      const record = await sails.models[thisModel].findOne({ content: newRecord.content });
      should.exist(record);
    });
  });
  describe('#update()', () => {
    it('should update record', async () => {
      const user = await createRecord('user', userProvider.getRecord());
      const newRecord = await createRecord(thisModel, provider.getRecord({ user: user.id }));
      const content = chance.string();
      const updateRecord = await sails.models[thisModel].update({ id: newRecord.id }, { content }).fetch();
      updateRecord[0].should.have.property('content', content);
    });
  });
  describe('#delete()', () => {
    it('should destroy record', async () => {
      const user = await createRecord('user', userProvider.getRecord());
      const newRecord = await createRecord(thisModel, provider.getRecord({ user: user.id }));
      await sails.models[thisModel].destroy({ id: newRecord.id });
    });
  });
});
