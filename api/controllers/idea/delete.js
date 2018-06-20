module.exports = {
  friendlyName: 'Delete Idea.',
  description: 'Delete an idea.',
  inputs: {},
  exits: {
    success: {
      statusCode: 204,
      friendlyName: 'Deleted idea',
      description: 'Deleted idea.',
    },
    notfound: {
      statusCode: 404,
      description: 'Idea not found.',
    },
    internalError: {
      statusCode: 500,
      description: 'Internal server error occurred.',
    },
  },
  fn: async function (inputs, exits) {
    const { id } = this.req.params;
    const idea = await Idea.destroy({ id, user: this.req.user.id })
      .intercept({ code: 'E_INVALID_CRITERIA' }, () => { return { notfound: { message: 'Record not found' } }; })
      .intercept({ name: 'UsageError' }, (err) => {
        sails.log.error(err);
        return { internalError: { message: 'Internal server error occurred' } };
      })
      .fetch();

    if (!idea.length) {
      return exits.notfound({ message: 'Record not found' });
    }
    return exits.success();
  }
};
