module.exports = {
  friendlyName: 'Logout',
  description: 'Delete token and logout auth.',
  inputs: {},
  exits: {
    success: {
      statusCode: 204
    }
  },
  fn: async function (inputs, exits) {
    const { user, tokenUuid } = this.req;
    try {
      await Token.destroy({ user: user.id, uuid: tokenUuid });
    } catch (error) {
      sails.log.error(error);
    }
    return exits.success();
  }
};
