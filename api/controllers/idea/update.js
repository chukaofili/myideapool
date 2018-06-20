const _ = require('lodash');
module.exports = {
  friendlyName: 'Update Idea.',
  description: 'Update an idea.',
  inputs: {
    content: {
      friendlyName: 'Idea content.',
      description: 'The main content idea to update.',
      type: 'string',
      example: 'Create electro stimulant light bulbs',
      required: true
    },
    impact: {
      type: 'number',
      friendlyName: 'Idea impact.',
      description: 'The impact of the idea to create.',
      example: 2,
      min: 1,
      max: 10,
      required: true,
    },
    ease: {
      type: 'number',
      friendlyName: 'Idea ease.',
      description: 'The ease of the idea to create.',
      example: 2,
      min: 1,
      max: 10,
      required: true,
    },
    confidence: {
      type: 'number',
      friendlyName: 'Idea confidence.',
      description: 'The confidence of the idea to create.',
      example: 2,
      min: 1,
      max: 10,
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      friendlyName: 'Updated idea',
      description: 'Updated idea.',
      outputExample: {
        'id': 1,
        'content': 'the-content',
        'impact': 8,
        'ease': 8,
        'confidence': 8,
        'average_score': 8.0,
        'user': 23,
        'createdAt': 1529485206287,
        'updatedAt': 1529485209287
      }
    },
    invalid: {
      statusCode: 400,
      description: 'Invalid request.',
    },
    notfound: {
      statusCode: 404,
      description: 'Idea not found.',
    }
  },
  fn: async function (inputs, exits) {
    const { impact, ease, confidence } = inputs;
    inputs.average_score = _.mean([impact, ease, confidence]).toFixed(2);

    const { id } = this.req.params;
    const idea = await Idea.update({ id, user: this.req.user.id})
      .set(inputs)
      .intercept({ code: 'E_INVALID_CRITERIA' }, () => { return { notfound: { message: 'Record not found' } } })
      .intercept({ name: 'UsageError' }, (err) => { return { invalid: err } })
      .fetch();

    if (!idea.length) {
      return exits.notfound({ message: 'Record not found' });
    }
    return exits.success(idea[0]);
  }
};
