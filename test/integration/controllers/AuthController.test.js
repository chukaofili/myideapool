const userProvider = require('../../fixtures/user');
const thisModel = 'user';

describe('AuthController', () => {
  const getAccessToken = async () => {
    const newUser = userProvider.getRecord();
    const response = await request(sails.hooks.http.app)
      .post('/users')
      .send(newUser)
      .expect(201);
    const user = await sails.models['user'].findOne({ email: newUser.email });
    return { user, token: response.body.jwt };
  };

  const createRecord = async (thisNewRecord) => {
    return await sails.models[thisModel].create(thisNewRecord);
  };

  const clearDb = async () => {
    return await sails.models[thisModel].destroy({});
  };

  afterEach(clearDb);

  describe('#login() [POST /access-tokens]', () => {
    it('should return 400: Bad request (Missing credentials)', async () => {
      const response = await request(sails.hooks.http.app)
        .post('/access-tokens')
        .send({})
        .expect(400);
      response.body.should.have.property('code', 'E_MISSING_OR_INVALID_PARAMS');
    });
    it('should return 401: Unauthorized: Email account not found', async () => {
      const userLogin = _.omit(userProvider.getRecord(), ['name']);
      const response = await request(sails.hooks.http.app)
        .post('/access-tokens')
        .send(userLogin)
        .expect(401);
      response.body.should.have.property('message', 'Email account not found.');
    });
    it('should return 201: Generate token (Login OK)', async () => {
      const newUser = userProvider.getRecord();
      await createRecord({...newUser});
      const userLogin = _.omit(newUser, ['name']);
      const response = await request(sails.hooks.http.app)
        .post('/access-tokens')
        .send(userLogin)
        .expect(201);
      response.body.should.have.property('jwt');
    });
    it('should return 204: Destory token (Logout OK)', async () => {
      const { token } = await getAccessToken();
      await request(sails.hooks.http.app)
        .delete('/access-tokens')
        .set('X-Access-Token', token)
        .expect(204);
    });
  });
});
