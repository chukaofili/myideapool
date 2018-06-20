const userProvider = require('../../fixtures/user');
const thisModel = 'user';

describe('UserController', () => {
  const getAccessToken = async () => {
    const newUser = userProvider.getRecord();
    const response = await request(sails.hooks.http.app)
      .post('/users')
      .send(newUser)
      .expect(201);
    return { user: newUser, token: response.body.jwt };
  };

  const clearDb = async () => {
    return await sails.models[thisModel].destroy({});
  };

  afterEach(clearDb);

  describe('#signup [POST /users]', () => {
    it('should return 201: signup user', async () => {
      const newUser = userProvider.getRecord();
      const response = await request(sails.hooks.http.app)
        .post('/users')
        .send(newUser)
        .expect(201);
      response.body.should.have.property('jwt');
    });
    it('should return 400: validation error, missing params', async () => {
      const newUser = userProvider.getRecord({email: 'ok'});
      const response = await request(sails.hooks.http.app)
        .post('/users')
        .send(newUser)
        .expect(400);
      response.body.should.have.property('code', 'E_MISSING_OR_INVALID_PARAMS');
    });
    it('should return 409: duplicate user signup', async () => {
      const newUser = userProvider.getRecord();
      await sails.models[thisModel].create({ ...newUser });
      const response = await request(sails.hooks.http.app)
        .post('/users')
        .send(newUser)
        .expect(409);
      response.body.should.have.property('code', 'E_UNIQUE');
      response.body.should.have.property('attrNames').that.includes('email');
    });
  });

  describe('#profile [GET /me]', () => {
    it('should return 200: user profile', async () => {
      const {token } = await getAccessToken();
      const response = await request(sails.hooks.http.app)
        .get('/me')
        .set('X-Access-Token', token)
        .expect(200);
      response.body.should.have.property('email');
    });
  });
});
