module.exports = {
  friendlyName: 'User signup',
  description: 'Signup user with email, phone & password.',
  inputs: {
    email: {
      type: 'string',
      friendlyName: 'User email.',
      description: 'The email of the user to sign up.',
      example: 'john.doe@example.com',
      isEmail: true,
      required: true
    },
    name: {
      type: 'string',
      friendlyName: 'User name.',
      description: 'The fullname of the user to sign up.',
      example: 'John Doe',
      required: true
    },
    password: {
      type: 'string',
      friendlyName: 'User password.',
      description: 'The password of the user to sign up.',
      example: 'abcD123EJD',
      required: true
    }
  },
  exits: {
    success: {
      statusCode: 201,
      friendlyName: 'JWT token',
      description: 'JWT token return after user signup',
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
      },
    },
    invalid: {
      responseType: 'badRequest',
      description: 'The provided name, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },
    duplicateUser: {
      statusCode: 409,
      description: 'The provided email address is already in use or registered',
    }
  },
  fn: async (inputs, exits) => {
    const user = await User.create(inputs)
      .intercept({ name: 'UsageError' }, (err) => { return { invalid: err }; })
      .intercept({ code: 'E_UNIQUE' }, (err) => { return { duplicateUser: err }; })
      .fetch();
    const { uuid, token } = await sails.helpers.jwt.issueToken({ id: user.id });
    await Token.create({
      user: user.id,
      uuid,
      token
    }).intercept({ name: 'UsageError' }, (err) => {
      sails.log.error(err);
      return { error: err };
    });
    return exits.success({ 'message': 'OK', 'jwt': token, 'refresh_token': uuid });
  }
};
