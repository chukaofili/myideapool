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
      type: 'ref',
      friendlyName: 'JWT Payload',
      description: 'Payload to sign into jwt token.',
      example: {
        id: 1,
      },
      required: true
    },
    secret: {
      type: 'string',
      friendlyName: 'JWT Token Signing Secret',
      description: 'Token Signing Secret.',
      example: 'SECRET',
      defaultsTo: secret
    },
    expiresIn: {
      type: 'string',
      friendlyName: 'JWT Expiry',
      description: 'Token expiry datetime.',
      example: '7d',
      defaultsTo: '7d'
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
    jwtid: {
      type: 'string',
      friendlyName: 'JWT jwtid',
      description: 'Token jwtid',
      example: '9633bce3-8a1a-45ce-84a5-a4c2664d0ba9',
      defaultsTo: uuid.v4()
    },
    subject: {
      type: 'string',
      friendlyName: 'JWT subject',
      description: 'Token subject',
      example: 'jwt-auth-token',
      defaultsTo: 'jwt-auth-token'
    },
  },
  exits: {
    success: {
      friendlyName: 'JWT Token',
      description: 'Signed jwt token payload.',
      outputExample: {
        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1MjQyMTEzODUsImlkIjoiaXI5dGNhcHEx' +
          'IiwiZW1haWwiOiJlbWFpbC0xQHRlc3QuY29tIiwibmFtZSI6Im5hbWUtMSJ9.X5Fj-EJDMuYKId_HH_INJN3UXGX' +
          '3wCcfkoXZycvAAIV0RwmQJ_QiaDpbZvzqYnjg30bu1eO6d3MCBbF0QKzv5eFHF0V7fFWJhyd7bBen_my81biZiNj' +
          '1UVGvKgxOi3BS2prjBOCTBoPJFr8bYxmrqgF3hyflIE8SMFj-e3hfF7VGWlrFxWFsZlvzgFBWNsGKmrrQNWvkEum' +
          'KPkBLMOa__19JwoWVfBIp5B_uEctKaSgCeSlghjgvHSXmMYq06sh_zzLZfPZZQ0dbqaehfalG6US4nKo7JIiix7-' +
          'VYp92b2TFahaTWO3LyngusKztQfjsKrOACniMwyMqr1fdV_tSsRi-jEDEtjxrbLLMge7yW9xOarQ618OPgWe1hG1' +
          'KwM_WhgsZMuPTkl_5wxTKH9wPygy6WHxV-UqDczaFqF87uI_M2IFPr_QGpRaQQyNxSeQYxyGw0IrCR2doo0OoLiD' +
          'XUZBNku-RWI9s9H5Eqm9YIg33P6mXtN39kz5Sim6Jg_x5tZ22PTm-Mu6bdtIZBogQflZiBJt1eji_hH8nJDFuh3Z' +
          'xMCon4yeTL7m8ZWuf8-_Z5zfSltk_ePIqWt3c4GnMU9kd5sgjrJCuLwof00HTXFFjYLBmPpWtNfvQ6_gOjws-MKQ' +
          'kGH35Vail5-nvujfI0itzKWc36h3qUPOQG8p0jsw',
      },
    },
  },
  fn: async function (inputs, exits) {
    const { payload, secret, ...opts } = inputs;
    const tokenBuffer = new Buffer(secret, 'base64');
    const token = jwt.sign(payload, tokenBuffer, opts);
    return exits.success(token);
  }
};

