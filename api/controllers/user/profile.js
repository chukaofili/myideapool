module.exports = {
  friendlyName: 'Profile',
  description: 'Profile user.',
  inputs: {},
  exits: {
    success: {
      description: 'User profile.'
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
