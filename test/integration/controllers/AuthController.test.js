const userProvider = require('../../fixtures/user');
const thisModel = 'user';

describe('AuthController', () => {
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
    it('should return 401: Unaithorized: Email account not found', async () => {
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
  });
});
