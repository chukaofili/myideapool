const jwt = require('jsonwebtoken');
const secret = sails.config.jwt.secret;
const audience = sails.config.jwt.audience;
const issuer = sails.config.jwt.issuer;

module.exports = {
  friendlyName: 'Verify JWT',
  description: 'Verify a JWT token.',
  inputs: {
    req: {
      type: 'ref',
      friendlyName: 'Request',
      description: 'A reference to the request object (req).',
      required: true
    },
    secret: {
      friendlyName: 'JWT Token Signing Secret',
      description: 'Token Signing Secret.',
      example: 'SECRET',
      type: 'string',
      defaultsTo: secret
    },
    audience: {
      friendlyName: 'JWT Audience',
      description: 'Token audience',
      example: 'example.com',
      type: 'string',
      defaultsTo: audience
    },
    issuer: {
      friendlyName: 'JWT Issuer',
      description: 'Token issuer',
      example: 'https://example.com',
      type: 'string',
      defaultsTo: issuer
    },
  },
  exits: {
    success: {
      description: 'Decoded valid token response'
    },
    invalid: {
      description: 'Invalid token or no authentication present.',
    }
  },
  fn: async (inputs, exits) => {
    const { req } = inputs;
    const tokenBuffer = new Buffer(secret, 'base64');
    if (req.headers['x-access-token']) {
      const token = req.headers['x-access-token'];
      try {
        const decoded = jwt.verify(token, tokenBuffer);
        const foundUser = await User.findOne(decoded.id);
        if (!foundUser) {return exits.invalid('Invalid token');}
        req.user = foundUser;
        return exits.success(foundUser);
      } catch (err) {
        return exits.invalid(err.message);
      }
    }
    return exits.invalid('Invalid token');
  }
};
