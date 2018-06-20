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
      type: 'string',
      friendlyName: 'JWT Token Signing Secret',
      description: 'Token Signing Secret.',
      example: 'SECRET',
      defaultsTo: secret
    },
    audience: {
      type: 'string',
      friendlyName: 'JWT Audience',
      description: 'Token audience',
      example: 'example.com',
      defaultsTo: audience
    },
    issuer: {
      type: 'string',
      friendlyName: 'JWT Issuer',
      description: 'Token issuer',
      example: 'https://example.com',
      defaultsTo: issuer
    },
  },
  exits: {
    success: {
      friendlyName: 'Decoded payload',
      description: 'Decoded valid token response',
      outputExample: {
        'id': 1,
        'email': 'adiarudi@li.bm',
        'name': 'Carl Powell',
        'avatar_url': 'https://www.gravatar.com/avatar/1ec1436e38a95a78fc17dec435ed2450?s=80&d=identicon&rating=g',
        'createdAt': 1529482204194,
        'updatedAt': 1529482204194,
      }
    },
    invalid: {
      friendlyName: 'Invalid token',
      description: 'Invalid token or no authentication present.',
    }
  },
  fn: async (inputs, exits) => {
    const { req } = inputs;
    const tokenBuffer = new Buffer(secret, 'base64');
    if (req.headers['x-access-token']) {
      const token = req.headers['x-access-token'];
      try {
        const decoded = jwt.verify(token, tokenBuffer, { audience, issuer});
        const findToken = await Token.findOne({user: decoded.id, uuid: decoded.jti});
        if (!findToken) { return exits.invalid('Invalid token'); }
        const findUser = await User.findOne(decoded.id);
        if (!findUser) {return exits.invalid('Invalid token');}
        req.user = findUser;
        req.tokenUuid = decoded.jti;
        return exits.success(findUser);
      } catch (err) {
        sails.log.warn(err.message);
        if (err.name === 'TokenExpiredError') {
          const decoded = jwt.decode(token);
          await Token.destroy({ user: decoded.id, uuid: decoded.jti });
        }
        return exits.invalid('Invalid token');
      }
    }
    return exits.invalid('Invalid token');
  }
};
