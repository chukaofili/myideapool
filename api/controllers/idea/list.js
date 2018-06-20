module.exports = {
  friendlyName: 'List',
  description: 'List all ideas 10 at a time.',
  inputs: {},
  exits: {
    success: {
      statusCode: 200,
      friendlyName: 'Listed Ideas',
      description: 'Listed ideas 10 at a time.',
      outputExample: [{
        'id': 1,
        'content': 'the-content',
        'impact': 8,
        'ease': 8,
        'confidence': 8,
        'average_score': 8.0,
        'user': 23,
        'createdAt': 1529485206287,
        'updatedAt': 1529485206287
      }]
    },
  },
  fn: async function (inputs, exits) {
    const perSize = 10;
    const currentPage = parseInt(this.req.query.page) || 1;
    const conditions = { user: this.req.user.id };

    try {
      const ideas = await Idea.find(conditions).paginate(currentPage-1, perSize).sort('createdAt ASC');
      return exits.success(ideas);
    } catch (err) {
      sails.log.error(err);
      return exits.error({message: 'Internal server error occurred'});
    }
  }
};
