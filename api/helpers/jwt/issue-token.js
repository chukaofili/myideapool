const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const secret = sails.config.jwt.secret;
const audience = sails.config.jwt.audience;
const issuer = sails.config.jwt.issuer;

module.exports = {
  friendlyName: 'Issue jwt token',
  description: 'Sign and issue jwt token',
  inputs: {
    payload: {
      friendlyName: 'JWT Payload',
      description: 'Payload to sign into jwt token.',
      type: 'ref',
      example: {
        id: 1,
      },
      required: true
    },
    secret: {
      friendlyName: 'JWT Token Signing Secret',
      description: 'Token Signing Secret.',
      example: 'SECRET',
      type: 'string',
      defaultsTo: secret
    },
    expiresIn: {
      friendlyName: 'JWT Expiry',
      description: 'Token expiry datetime.',
      example: '7d',
      type: 'string',
      defaultsTo: '7d'
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
    jwtid: {
      friendlyName: 'JWT jwtid',
      description: 'Token jwtid',
      example: '9633bce3-8a1a-45ce-84a5-a4c2664d0ba9',
      type: 'string',
      defaultsTo: uuid.v4()
    },
    subject: {
      friendlyName: 'JWT subject',
      description: 'Token subject',
      example: 'jwt-auth-token',
      type: 'string',
      defaultsTo: 'jwt-auth-token'
    },
  },
  exits: {
    success: {
      outputFriendlyName: 'JWT Token',
      outputDescription: 'Sign jwt token payload.',
    },
  },
  fn: async function (inputs, exits) {
    const { payload, secret, ...opts } = inputs;
    const tokenBuffer = new Buffer(secret, 'base64');
    const token = jwt.sign(payload, tokenBuffer, opts);
    return exits.success(token);
  }
};

