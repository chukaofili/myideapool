module.exports = {
  friendlyName: 'Profile',
  description: 'Profile user.',
  inputs: {},
  exits: {
    success: {
      friendlyName: 'User profile',
      description: 'Complete user profile information.',
      outputExample: {
        'id': 1,
        'email': 'gerdar@ecuguboc.it',
        'name': 'Nannie Daniels',
        'avatar_url': 'https://www.gravatar.com/avatar/8f58f74f67f81eed0857c38110d67b16?s=80&d=identicon&rating=g',
        'createdAt': 1529482138427,
        'updatedAt': 1529482138427,
      }
    },
    invalid: {
      description: 'Invalid user.',
    }
  },
  fn: async function (inputs, exits) {
    const { user } = this.req;
    user['avatar_url'] = sails.helpers.gravatar.getAvatarUrl(user.email);
    return exits.success(user);
  }
};
