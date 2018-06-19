module.exports = {


  friendlyName: 'Login',


  description: 'Login auth.',


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
    duplicateUser: {
      statusCode: 409,
      description: 'The provided email address is already in use or registered',
    }
  },


  fn: async function (inputs, exits) {
    // passport.authenticate('local', { session: false }, function (err, user, info) {
    //   const doLogin = async () => {
    //     /* istanbul ignore if */
    //     if (err) return { status: 401, message: 'Login unsuccessful' };
    //     if (!user) return { status: 401, message: info.message };
    //     let token;
    //     if (_.has(req.headers, 'x-mobile')) {
    //       if (_.has(req.headers, 'x-mobile-id')) {
    //         const criteria = {
    //           deviceUuid: req.headers['x-mobile-id'],
    //           organization: user.organization,
    //           isDeleted: false
    //         };
    //         const device = await Device.findOne(criteria);
    //         if (!device) return { status: 401, message: 'Device not found. Please provision device' };
    //         await Device.update(criteria, { user: user.id });
    //         token = JwtService.issue({ id: user.id, organization: user.organization });
    //       } else {
    //         return { status: 401, message: 'Device UUID not set' };
    //       }
    //     } else {
    //       const remember = _.has(req.body, 'remember') && req.body['remember'] === true;
    //       exp = remember ? expRememberMe : exp;
    //       token = JwtService.issue({ id: user.id, organization: user.organization }, exp);
    //     }
    //     const _token = await Token.create({
    //       user: user.id,
    //       organization: user.organization,
    //       uuid: token.uuid,
    //       token: token.token
    //     });
    //     if (!_token) return { status: 401, message: 'Login unsuccessful. Unable to create token' };
    //     return { status: 200, message: 'Login successful', data: { user: user, token: token.token } }
    //   };

    //   return doLogin()
    //     .then(result => ResponseService.json(result.status, res, result.message, result.data))
    //     .catch(err => ResponseService.json(500, res, 'Unknown Error'));
    // })(req, res);

    return exits.success();

  }


};
