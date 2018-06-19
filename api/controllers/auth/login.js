const passport = require('passport');
module.exports = {
  friendlyName: 'Login user',
  description: 'Log in using the provided email and password combination.',
  extendedDescription: `This action attempts to look up the user record 
    in the database with the specified email address.  Then, if such a 
    user exists, it uses bcrypt to compare the hashed password from the
    database with the provided password attempt.`,
  inputs: {
    email: {
      description: 'The email of the user to login.',
      type: 'string',
      example: 'john.doe@example.com',
      isEmail: true,
      required: true
    },
    password: {
      description: 'The password of the user to login.',
      example: 'abcD123EJD',
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      statusCode: 201,
      description: 'The users jwt access token & refresh token.',
      outputExample: {
        'message': 'OK',
        'jwt': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1MjQyMTEzODUsImlkIjoiaXI5dGNhcHEx' +
          'IiwiZW1haWwiOiJlbWFpbC0xQHRlc3QuY29tIiwibmFtZSI6Im5hbWUtMSJ9.X5Fj-EJDMuYKId_HH_INJN3UXGX' +
          '3wCcfkoXZycvAAIV0RwmQJ_QiaDpbZvzqYnjg30bu1eO6d3MCBbF0QKzv5eFHF0V7fFWJhyd7bBen_my81biZiNj' +
          '1UVGvKgxOi3BS2prjBOCTBoPJFr8bYxmrqgF3hyflIE8SMFj-e3hfF7VGWlrFxWFsZlvzgFBWNsGKmrrQNWvkEum' +
          'KPkBLMOa__19JwoWVfBIp5B_uEctKaSgCeSlghjgvHSXmMYq06sh_zzLZfPZZQ0dbqaehfalG6US4nKo7JIiix7-' +
          'VYp92b2TFahaTWO3LyngusKztQfjsKrOACniMwyMqr1fdV_tSsRi-jEDEtjxrbLLMge7yW9xOarQ618OPgWe1hG1' +
          'KwM_WhgsZMuPTkl_5wxTKH9wPygy6WHxV-UqDczaFqF87uI_M2IFPr_QGpRaQQyNxSeQYxyGw0IrCR2doo0OoLiD' +
          'XUZBNku-RWI9s9H5Eqm9YIg33P6mXtN39kz5Sim6Jg_x5tZ22PTm-Mu6bdtIZBogQflZiBJt1eji_hH8nJDFuh3Z' +
          'xMCon4yeTL7m8ZWuf8-_Z5zfSltk_ePIqWt3c4GnMU9kd5sgjrJCuLwof00HTXFFjYLBmPpWtNfvQ6_gOjws-MKQ' +
          'kGH35Vail5-nvujfI0itzKWc36h3qUPOQG8p0jsw',
        'refresh_token': '6c0e3c51a51b8df21da34d63eadfcf6d9b54fe2a7acd88bc135ead0eb6e1969a4e7faf7' +
          '5c14b8b6e787b6cc4722afd9465eb',
      },
    },
    invalid: {
      responseType: 'badRequest',
      description: 'The provided name, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },
    unauthorized: {
      statusCode: 401,
      description: 'Error loggin user in',
    }
  },
  fn: async function (inputs, exits) {
    passport.authenticate('local', async (err, user, info) => {
      if (err) {return exits.unauthorized(err);}
      if (!user) {return exits.unauthorized(info);}

      const jwt = await sails.helpers.jwt.issueToken({ id: user.id });
      return exits.success({ message: 'OK', jwt});
    })(this.req, this.res);
  }
};
