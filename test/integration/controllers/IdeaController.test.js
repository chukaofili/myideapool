const userProvider = require('../../fixtures/user');
const ideaProvider = require('../../fixtures/idea');
const thisModel = 'idea';

describe('IdeaController', () => {
  const getAccessToken = async () => {
    const newUser = userProvider.getRecord();
    const response = await request(sails.hooks.http.app)
      .post('/users')
      .send(newUser)
      .expect(201);
    const user = await sails.models['user'].findOne({ email: newUser.email});
    return {user, token: response.body.jwt};
  };

  const createRecord = async (token, thisNewRecord) => {
    const response = await request(sails.hooks.http.app)
      .post('/ideas')
      .send(thisNewRecord)
      .set('X-Access-Token', token)
      .expect(201);
    return response.body;
  };

  const createDbRecord = async (thisModel, thisNewRecord, multi=false) => {
    if (multi) {return await sails.models[thisModel].createEach(thisNewRecord).fetch();}
    return await sails.models[thisModel].create(thisNewRecord).fetch();
  };

  const clearDb = async () => {
    return await sails.models[thisModel].destroy({});
  };

  afterEach(clearDb);

  describe('#create [POST /ideas]', () => {
    it('should return 400: missing params', async () => {
      const {token} = await getAccessToken();
      const response = await request(sails.hooks.http.app)
        .post('/ideas')
        .send({})
        .set('X-Access-Token', token)
        .expect(400);
      response.body.should.have.property('code', 'E_MISSING_OR_INVALID_PARAMS');
    });
    it('should return 201: create an idea', async () => {
      const {token} = await getAccessToken();
      const newRecord = ideaProvider.getRecord();
      const response = await request(sails.hooks.http.app)
        .post('/ideas')
        .send(newRecord)
        .set('X-Access-Token', token)
        .expect(201);
      response.body.should.have.property('content', newRecord.content);
    });
  });
  describe('#update [PUT /ideas/:id]', () => {
    it('should return 400: missing params', async () => {
      const {token} = await getAccessToken();
      const newRecord = ideaProvider.getRecord();
      const record = await createRecord(token, { ...newRecord });
      const response = await request(sails.hooks.http.app)
        .put(`/ideas/${record.id}`)
        .send({})
        .set('X-Access-Token', token)
        .expect(400);
      response.body.should.have.property('code', 'E_MISSING_OR_INVALID_PARAMS');
    });
    it('should return 404: not found', async () => {
      const {token} = await getAccessToken();
      const newRecord = ideaProvider.getRecord();
      await createRecord(token, { ...newRecord });
      await request(sails.hooks.http.app)
        .put(`/ideas/invalid`)
        .send(newRecord)
        .set('X-Access-Token', token)
        .expect(404);
    });
    it('should return 404: trying to update another users idea', async () => {
      const { token: userOneToken} = await getAccessToken();
      const { token: userTwoToken} = await getAccessToken();
      const newRecord = ideaProvider.getRecord();
      await createRecord(userOneToken, { ...newRecord });
      const recordTwo = await createRecord(userTwoToken, { ...newRecord });
      const updatedRecord = _.omit({ ...newRecord, content: 'New Content' }, ['user']);

      await request(sails.hooks.http.app)
        .put(`/ideas/${recordTwo.id}`)
        .send(updatedRecord)
        .set('X-Access-Token', userOneToken)
        .expect(404);
    });
    it('should return 200: updated idea', async () => {
      const {token} = await getAccessToken();
      const newRecord = ideaProvider.getRecord();
      const record = await createRecord(token, { ...newRecord });
      const updatedRecord = _.omit({ ...newRecord, content: 'New Content' }, ['user']);
      const response = await request(sails.hooks.http.app)
        .put(`/ideas/${record.id}`)
        .send(updatedRecord)
        .set('X-Access-Token', token)
        .expect(200);
      response.body.should.have.property('content', updatedRecord.content);
    });

  });
  describe('#delete [DELETE /ideas/:id]', () => {
    it('should return 404: not found', async () => {
      const {token} = await getAccessToken();
      const newRecord = ideaProvider.getRecord();
      await createRecord(token, { ...newRecord });
      await request(sails.hooks.http.app)
        .delete(`/ideas/invalid`)
        .set('X-Access-Token', token)
        .expect(404);
    });
    it('should return 404: trying to delete another users idea', async () => {
      const { token: userOneToken } = await getAccessToken();
      const { token: userTwoToken } = await getAccessToken();
      const newRecord = ideaProvider.getRecord();
      await createRecord(userOneToken, { ...newRecord });
      const recordTwo = await createRecord(userTwoToken, { ...newRecord });
      await request(sails.hooks.http.app)
        .delete(`/ideas/${recordTwo.id}`)
        .set('X-Access-Token', userOneToken)
        .expect(404);
    });
    it('should return 204: record deleted', async () => {
      const {token} = await getAccessToken();
      const newRecord = ideaProvider.getRecord();
      const record = await createRecord(token, { ...newRecord });
      await request(sails.hooks.http.app)
        .delete(`/ideas/${record.id}`)
        .set('X-Access-Token', token)
        .expect(204);
    });
  });
  describe('#list [GET /ideas]', () => {
    it('should return 200: Ideas retrieved successfully', async () => {
      const { user, token } = await getAccessToken();
      const newIdeas = ideaProvider.getRecord({user: user.id}, 20);
      await createDbRecord('idea', newIdeas, true);

      const response = await request(sails.hooks.http.app)
          .get('/ideas')
          .set('X-Access-Token', token)
          .query({page: 1})
          .expect(200);
      response.body.length.should.eql(10);
    });
  });
});
